import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import firebase_admin
from firebase_admin import db, credentials
from models import Contact_Form
from datetime import datetime

# ---------------------------
# App Initialization
# ---------------------------

app = FastAPI(
    title="NurseNaija Backend",
    description="Reference backend for NurseNaija – Multilingual AI Triage Assistant",
    version="1.0.0"
)

origins = [
    "http://localhost:3000",
    "https://nursenaija.netlify.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# Firebase Initialization
# ---------------------------
"""
NOTE:
Firebase credentials are required only for production deployments.
For competition review, this demonstrates persistence logic
without exposing secrets.
"""

try:
    cred = credentials.Certificate("./credentials.json")
    firebase_admin.initialize_app(
        cred,
        {"databaseURL": "https://nurse-naija-default-rtdb.firebaseio.com"}
    )
except ValueError:
    # Prevent crash if already initialized or credentials not present
    pass


# ---------------------------
# Health Check
# ---------------------------

@app.get("/")
async def health_check():
    return {
        "status": "NurseNaija backend running",
        "mode": "reference-implementation",
    }


# ---------------------------
# Contact Form Endpoints
# ---------------------------

@app.post("/contact_form")
async def create_contact_form(contact_form: Contact_Form):
    new_form_ref = db.reference("contact_form").push()
    new_form_ref.set(contact_form.model_dump())

    return {
        "id": new_form_ref.key,
        **contact_form.model_dump()
    }


@app.delete("/contact_form/{contact_form_id}")
async def delete_contact_form(contact_form_id: str):
    contact_form_ref = db.reference("contact_form").child(contact_form_id)

    if contact_form_ref.get():
        contact_form_ref.delete()
        return {"message": "Contact form deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Contact form not found")


# ---------------------------
# Triage (ABSTRACTED)
# ---------------------------

@app.post("/api/triage")
async def run_triage(
    symptoms: str,
    responder_mode: str = "community",
    language: str = "unknown"
):
    """
    Abstracted triage endpoint.

    In production, this route:
    - Transcribes multilingual speech (offline)
    - Translates to English if needed
    - Performs safety-bounded reasoning using N-ATLaS
    - Returns non-diagnostic triage guidance

    Sensitive inference logic is intentionally abstracted.
    """

    if responder_mode not in ["community", "healthcare"]:
        raise HTTPException(
            status_code=400,
            detail="Invalid responder mode"
        )

    # Mock / representative output
    return {
        "assessment_summary": "Urgent Care Needed",
        "based_on": "patient-reported symptoms",
        "recorded_symptoms": symptoms.split(","),
        "risk_score": 0.6,
        "what_to_tell_patient": [
            "Rest in a safe place",
            "Drink fluids if possible"
        ],
        "responder_guidance": (
            ["Monitor condition and escalate to clinic"]
            if responder_mode == "community"
            else ["Assess vital signs", "Determine referral need"]
        ),
        "metadata": {
            "model": "NCAIR1/N-ATLaS",
            "offline": True,
            "timestamp": datetime.utcnow().isoformat(),
        },
    }


# ---------------------------
# Entrypoint
# ---------------------------

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
