import random

# Sample user interaction data
user_interactions = {
    "completed": {
        "Climate Change": 10,
        "Education": 5,
        "Animal Welfare": 2,
    },
    "liked": {
        "Education": 8,
        "Health": 3,
    },
    "trending_counts": {
        "Climate Change": 7,
        "Education": 5,
        "Health": 2,
        "Animal Welfare": 4,
    },
    "onboarding_prefs": ["Climate Change", "Health"],
}

# Sample actions database
actions_db = [
    {"name": "Tree Planting Drive", "category": "Climate Change", "organization": "Green Earth", "action_type": "volunteering"},
    {"name": "Math Tutoring for Kids", "category": "Education", "organization": "Teach the Future", "action_type": "volunteering"},
    {"name": "Petition for Clean Air", "category": "Climate Change", "organization": "Eco Warriors", "action_type": "petition"},
    {"name": "Donate to Medical Research", "category": "Health", "organization": "Health First", "action_type": "donation"},
    {"name": "Animal Shelter Support", "category": "Animal Welfare", "organization": "Save the Paws", "action_type": "volunteering"},
]

# Function to simulate recommendation algorithm
def test_recommendation_algorithm(user_data, actions, top_n=5):
    completed_pref = user_data["completed"]
    liked_pref = user_data["liked"]
    trending_counts = user_data["trending_counts"]

    # Compute scores for each action
    scored_actions = []
    max_trend = max(trending_counts.values()) if trending_counts else 1

    for action in actions:
        category = action["category"]
        org = action["organization"]
        action_type = action["action_type"]

        # Compute weights
        completed_score = completed_pref.get(category, 0)
        liked_score = liked_pref.get(category, 0)
        trend_score = trending_counts.get(category, 0) / max_trend

        # Weighted sum
        final_score = (0.5 * completed_score + 0.3 * liked_score + 0.2 * trend_score)
        scored_actions.append((action["name"], final_score))

    # Sort by highest score
    scored_actions.sort(key=lambda x: x[1], reverse=True)
    recommended_actions = [action[0] for action in scored_actions[:top_n]]

    # Diversify 20% of recommendations
    num_exploration = max(1, len(recommended_actions) // 5)
    all_categories = {action["category"] for action in actions}
    engaged_categories = set(completed_pref.keys()).union(set(liked_pref.keys()))
    unexplored_categories = list(all_categories - engaged_categories)

    if unexplored_categories:
        exploration_sample = random.sample(unexplored_categories, min(len(unexplored_categories), num_exploration))
        exploration_actions = [action["name"] for action in actions if action["category"] in exploration_sample]

        # Ensure we don’t go out of range
        recommended_actions = recommended_actions[: len(recommended_actions) - len(exploration_actions)] + exploration_actions

    return recommended_actions

# Run the test
test_results = test_recommendation_algorithm(user_interactions, actions_db)
print("Recommended Actions:", test_results)
