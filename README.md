<p align="center">
  <img src="https://github.com/PAPPY-JOE/nurse-naija/blob/main/frontend/public/assets/logo.png" width="100" alt="NurseNaija Logo" />
</p>

<h1 align="center">NurseNaija</h1>

### Multilingual AI Triage Assistant for Community Clinics

NurseNaija is a multilingual, AI-powered **medical triage assistant** designed to improve access to basic healthcare guidance in **community clinics and low-resource settings across Nigeria**.

The system leverages **N-ATLaS (Nigeria’s national multilingual large language model)** to understand patient symptoms expressed in local languages and provide **safe, structured triage-level guidance** — without diagnosing or prescribing medication.

<p align="center">
  <img src="https://github.com/PAPPY-JOE/nurse-naija/blob/main/frontend/public/assets/demo_a.jpeg" width="350" alt="Demo A" />
  <img src="https://github.com/PAPPY-JOE/nurse-naija/blob/main/frontend/public/assets/demo_b.jpeg" width="350" alt="Demo B" />
</p>

<br>

## 1. Problem Statement

Many community clinics in Nigeria face:
- Language barriers between patients and healthcare workers  
- Shortage of trained medical personnel  
- High patient volume with limited triage capacity  

As a result, **urgent cases are often delayed**, while non-urgent cases overwhelm limited resources.

<br>

## 2. Solution: NurseNaija

NurseNaija acts as a **first-line triage assistant**, helping clinics and outreach programs:
- Understand patient symptoms in **English, Hausa, Igbo, Yoruba, and Nigerian Pidgin**
- Classify cases into **EMERGENCY, URGENT, or NON-URGENT**
- Provide **immediate, non-diagnostic next steps**
- Generate **structured triage outputs** that can integrate into clinic workflows

The system is designed to be **safe, explainable, and deployable in constrained environments**.

<br>

## 3. Core AI Technology

- **N-ATLaS (NCAIR1/N-ATLaS)** – multilingual reasoning & triage classification  
- **Nigerian-language ASR models** – speech-to-text for local languages  
- **Hybrid AI pipeline** – combining LLM reasoning with deterministic safety rules  

NurseNaija uses AI as a **decision-support tool**, not a replacement for healthcare professionals.

<br>

## 4. High-Level Architecture

1. User provides symptoms via **voice or text**
2. Language selection and detection & speech-to-text normalization
3. Hybrid triage pipeline:
   - Rule-based risk heuristics (offline-safe)
   - N-ATLaS contextual reasoning
   - Safety enforcement (no diagnosis, no prescriptions)
4. Structured triage output (JSON)
5. Optional secure logging for audit and improvement

> Detailed architecture is provided in the competition submission.

<br>

## 5. Safety & Responsible AI

Healthcare safety is central to NurseNaija’s design:
- No medical diagnosis or prescriptions
- Clear escalation instructions for emergency cases
- Guardrails against unsafe or speculative outputs
- Designed for triage, not treatment

<br>

## 6. Use Cases

- Community clinics
- Rural health outreach programs
- Telehealth triage support
- Public health hotlines
- NGO healthcare initiatives

<br>

## 7. Market & Impact Potential

NurseNaija is designed to scale across:
- Primary healthcare centers
- State-level health programs
- NGO and donor-funded interventions

Its multilingual-first approach makes it especially suitable for **underserved populations**.

<br>

## 8. Project Status

This repository contains:
- Frontend components
- Public interfaces
- Documentation and demo materials

Backend logic and model pipelines are intentionally abstracted for safety and IP protection.

<br>

## Author
Joseph Olayemi Fatoye  
AI & Robotics Engineer, Nigeria

<br>

## Awarri Developer Challenge 2025

This project was developed and submitted as part of the **[Awarri Developer Challenge 2025](http://www.awarri.com/developer-challenge-2025)**,  
using **N-ATLaS** as the core AI reasoning engine.

<br>

## License

This project is provided for demonstration and evaluation purposes only.
