"""
Prompt templates used to guide N-ATLaS behavior.

Exact prompt contents are intentionally abstracted to
prevent misuse and align with responsible medical AI practices.
"""

COMMUNITY_RESPONDER_PROMPT = """
[REDACTED]
- Simple language
- No diagnosis
- No medication
- Escalation-focused
"""

HEALTHCARE_RESPONDER_PROMPT = """
[REDACTED]
- Clinical tone
- No prescriptions
- Triage & stabilization only
"""
