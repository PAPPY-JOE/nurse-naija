class NAtlasClient:
    """
    Abstracted N-ATLaS inference client.

    In production, this wraps the NCAIR1/N-ATLaS model.
    """

    def infer(self, payload: dict) -> dict:
        # Representative response
        return {
            "triage_level": "URGENT",
            "detected_symptoms": payload.get("symptoms", [])[:3],
            "risk_score": 0.6,
            "immediate_patient_steps": [
                "Rest and avoid strenuous activity",
                "Seek urgent medical evaluation"
            ],
            "provider_actions": [
                "Assess vital signs",
                "Determine need for referral"
            ],
            "language": payload.get("language", "unknown"),
            "notes": "Possible acute illness",
        }
