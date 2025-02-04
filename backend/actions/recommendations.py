import math
from django.utils import timezone
from .models import Action, UserAction

def get_recommendations(user, trending_counts, w_completed=0.5, w_liked=0.3, w_trend=0.2,top_n=10):

    completed_pref = {}
    liked_pref = {}

    # Aggregate completed actions.
    completed_interactions = UserAction.objects.filter(user=user, interaction_type=UserAction.COMPLETE)
    for interaction in completed_interactions:
        action = interaction.action
        # Add category
        cat = action.category
        completed_pref[cat] = completed_pref.get(cat, 0) + 1
        org = action.organization
        completed_pref[org] = completed_pref.get(org, 0) + 1
        
    # Aggregate liked actions.
    liked_interactions = UserAction.objects.filter(user=user, interaction_type=UserAction.LIKE)
    for interaction in liked_interactions:
        action = interaction.action
        cat = action.category
        liked_pref[cat] = liked_pref.get(cat, 0) + 1
        org = action.organization
        completed_pref[org] = completed_pref.get(org, 0) + 1
    
    # Compute the norms for the two vectors.
    def dict_norm(d):
        return math.sqrt(sum(v ** 2 for v in d.values()))

    norm_completed = dict_norm(completed_pref)
    norm_liked = dict_norm(liked_pref)

    # Filter for actions that the user has not interacted with 
    interacted_ids = UserAction.objects.filter(user=user).values_list('action_id', flat=True)
    candidate_actions = Action.objects.exclude(id__in=interacted_ids)

    scored_actions = []

    # Determine the maximum trending count to normalize the trend score.
    if trending_counts:
        max_trend = max(trending_counts.values())
    else:
        max_trend = 1


    for action in candidate_actions:
        features = []
        cat = action.category
        features.append(cat)
        features.append(action.organization)

        # Calculate values for cosine similarities
        candidate_norm = math.sqrt(len(features))
        
        # Dot products:
        dot_completed = 0
        for feature in features:
            dot_completed += completed_pref.get(feature, 0)

        dot_liked = 0
        for feature in features:
            dot_liked += liked_pref.get(feature, 0)


        # Compute cosine similarity for each profile.
        if norm_completed > 0:
            cosine_completed = dot_completed / (norm_completed * candidate_norm)
        else:
            cosine_completed = 0

        if norm_liked > 0:
            cosine_liked = dot_liked / (norm_liked * candidate_norm)
        else:
            cosine_liked = 0


        
        # Normalize by the max trending count to get a value between 0 and 1.
        trend_raw = trending_counts.get(cat, 0)
        trend_score = trend_raw / max_trend

        # combine scores to get total 
        final_score = w_completed * cosine_completed + w_liked * cosine_liked + w_trend * trend_score

        scored_actions.append((action, final_score))

    # sort the values by highest values 
    scored_actions.sort(key=lambda tup: tup[1], reverse=True)
    recommended_actions = [action for action, score in scored_actions[:top_n]]
    return recommended_actions
