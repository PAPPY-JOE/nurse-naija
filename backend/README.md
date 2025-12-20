# NurseNaija Backend (Reference Implementation)

This repository contains the backend reference implementation for **NurseNaija** — a multilingual, offline-first AI triage assistant designed for Nigerian community and primary healthcare settings.

---

## Overview

The backend is built using **FastAPI** and demonstrates:

- Secure API design
- Firebase-based data persistence
- A safety-bounded AI triage flow
- Clear separation between infrastructure and AI reasoning

This implementation aligns with the system demonstrated in the demo video submitted for the Awarri Developer Challenge.

---

## Triage Endpoint

The `/api/triage` endpoint represents the NurseNaija triage pipeline.

In production, this pipeline includes:
1. Offline speech-to-text in Nigerian languages
2. Translation to English where required
3. Safety-constrained reasoning using **NCAIR1/N-ATLaS**
4. Non-diagnostic triage guidance for responders

---

## Note on Abstraction

This backend is a **security-aware reference implementation**.

Sensitive components such as:
- medical prompt templates
- model weights
- inference pipelines
- credentials and environment secrets

are intentionally abstracted to prevent misuse and to align with responsible AI deployment in healthcare contexts.

The structure, flow, and safety guarantees reflect the production system demonstrated in the demo video.

---

## Tech Stack

- FastAPI
- Firebase Realtime Database
- Python 3.x

---

## Disclaimer

NurseNaija does **not** diagnose or prescribe.
It provides triage guidance only and is intended to support, not replace, trained healthcare professionals.
