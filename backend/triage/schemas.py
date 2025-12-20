from pydantic import BaseModel
from typing import List, Optional

class TriageResponse(BaseModel):
    triage_level: str
    detected_symptoms: List[str]
    risk_score: float
    immediate_patient_steps: List[str]
    provider_actions: List[str]
    language: Optional[str]
    notes: str

    metadata: dict
