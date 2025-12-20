def save_triage_result(payload: dict) -> str:
    """
    Persists triage results to Firebase in production.

    Abstracted here to avoid credential exposure.
    """
    return "mock_firebase_id"
