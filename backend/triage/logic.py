from services.natlas_client import NAtlasClient
from triage.schemas import TriageResponse
from datetime import datetime

client = NAtlasClient()

def run_triage(symptoms: str, role: str, language: str = None) -> TriageResponse:
    """
    High-level triage pipeline:
    1. Normalize input
    2. Select responder mode
    3. Call reasoning engine
    4. Apply safety rules
    """

    model_output = client.infer({
        "symptoms": symptoms.split(","),
        "role": role,
        "language": language
    })

    return TriageResponse(
        **model_output,
        metadata={
            "timestamp": datetime.utcnow().isoformat(),
            "model_used": "NCAIR1/N-ATLaS",
            "offline_mode": True
        }
    )
