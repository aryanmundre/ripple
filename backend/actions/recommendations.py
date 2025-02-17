import math
import random
from django.utils import timezone
from .models import Action, UserAction

def get_recommendations(user, trending_counts, w_completed=0.5, w_liked=0.3, w_trend=0.1, w_recent=0.1, top_n=10):
    """
    Generate personalized action recommendations for a user.
    Falls back to trending/popular actions if the user has insufficient data.
    """
    completed_pref = {}
    liked_pref = {}
    recent_pref = {}

    # Aggregate completed actions.
    completed_interactions = UserAction.objects.filter(user=user, interaction_type=UserAction.COMPLETE)
    for interaction in completed_interactions:
        action = interaction.action
        # Add category
        cat = action.category
        completed_pref[cat] = completed_pref.get(cat, 0) + 1
        org = action.organization
        completed_pref[org] = completed_pref.get(org, 0) + 1
        completed_pref[action.action_type] = completed_pref.get(action.action_type, 0) + 1
        
    # Aggregate liked actions.
    liked_interactions = UserAction.objects.filter(user=user, interaction_type=UserAction.LIKE)
    for interaction in liked_interactions:
        action = interaction.action
        cat = action.category
        liked_pref[cat] = liked_pref.get(cat, 0) + 1
        org = action.organization
        liked_pref[org] = liked_pref.get(org, 0) + 1
        liked_pref[action.action_type] = liked_pref.get(action.action_type, 0) + 1
        recent_pref[cat] = recent_pref.get(cat, 0) + 1  # Track recent likes separately

    # If no interaction data, use fallback recommendations
    if not completed_pref and not liked_pref:
        return get_fallback_recommendations(top_n)
    
    # Compute the norms for the two vectors.
    def dict_norm(d):
        return math.sqrt(sum(v ** 2 for v in d.values()))

    norm_completed = dict_norm(completed_pref)
    norm_liked = dict_norm(liked_pref)
    norm_recent = dict_norm(recent_pref)

   # Get the user's onboarding preferences if they have no history
    if not completed_pref and not liked_pref:
        onboarding_prefs = user.profile.preferences  # Assume profile stores initial preferences
        completed_pref = {category: 1 for category in onboarding_prefs}

    # Filter for actions the user has not interacted with
    interacted_ids = UserAction.objects.filter(user=user).values_list('action_id', flat=True)
    candidate_actions = Action.objects.exclude(id__in=interacted_ids)

    scored_actions = []

    # Determine the maximum trending count to normalize the trend score.
    if trending_counts:
        max_trend = max(trending_counts.values())
    else:
        max_trend = 1


    for action in candidate_actions:
        features = [action.category, action.organization, action.action_type]
        candidate_norm = math.sqrt(len(features))
        
        # Compute cosine similarities
        dot_completed = sum(completed_pref.get(f, 0) for f in features)
        dot_liked = sum(liked_pref.get(f, 0) for f in features)
        dot_recent = sum(recent_pref.get(f, 0) for f in features)

        cosine_completed = dot_completed / (norm_completed * candidate_norm) if norm_completed > 0 else 0
        cosine_liked = dot_liked / (norm_liked * candidate_norm) if norm_liked > 0 else 0
        cosine_recent = dot_recent / (norm_recent * candidate_norm) if norm_recent > 0 else 0

        # Normalize trend score
        trend_score = trending_counts.get(action.category, 0) / max_trend

        # Compute final score with a balance between past & recent behavior
        final_score = (
            w_completed * cosine_completed +
            w_liked * cosine_liked +
            w_recent * cosine_recent +
            w_trend * trend_score
        )

        scored_actions.append((action, final_score))

    # Sort by highest score
    scored_actions.sort(key=lambda tup: tup[1], reverse=True)
    recommended_actions = [action for action, score in scored_actions]

    # Diversify 20% of recommendations with exploration-based suggestions
    num_exploration = max(1, len(recommended_actions) // 5)
    all_categories = set(Action.objects.values_list('category', flat=True))
    engaged_categories = set(completed_pref.keys())
    unexplored_categories = list(all_categories - engaged_categories)

    if unexplored_categories:
        random_exploration = Action.objects.filter(category__in=random.sample(unexplored_categories, min(len(unexplored_categories), num_exploration)))
        recommended_actions = recommended_actions[:-num_exploration] + list(random_exploration)

    # If no good recommendations, use fallback
    if not recommended_actions:
        return get_fallback_recommendations(top_n)
    
    return recommended_actions[:top_n]

def get_fallback_recommendations(top_n=10):
    """
    Returns fallback recommendations (trending or most popular actions).
    """
    trending_actions = Action.objects.filter(
        category__in=TrendingLog.objects.values_list('name', flat=True)
    ).order_by("-created_at")[:top_n]

    if trending_actions:
        return list(trending_actions)

    # If no trending actions, return most recently created actions
    return list(Action.objects.all().order_by("-created_at")[:top_n])
