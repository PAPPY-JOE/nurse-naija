import uvicorn
from fastapi import FastAPI, HTTPException
import firebase_admin
from firebase_admin import db, credentials, initialize_app
from models import Contact_Form

# Create FastAPI instance
app = FastAPI()

origins = [
    "http://localhost:3000",
    "https"
]

# Initialize Firebase Admin SDK
cred = credentials.Certificate('./credentials.json')
firebase_admin.initialize_app(cred, { 
    "databaseURL": "https://nurse-naija-default-rtdb.firebaseio.com"
})

# Get db
@app.get("/")
async def get_db():
    return db.reference("/").get()

# Create operation
@app.post("/contact_form")
async def create_contact_form(contact_form: Contact_Form):
    new_form_ref = db.reference('contact_form').push()
    new_form_ref.set(contact_form.model_dump())
    return {"id": new_form_ref.key, **contact_form.model_dump()}

# # Read operation (single)
# @app.get("/contact_form/{contact_form_id}")
# async def fetch_contact_form(contact_form_id: str):
#     contact_form_ref = db.reference('contact_form').child(contact_form_id)
#     contact_form = contact_form_ref.get()
#     if contact_form:
#         return {"id": contact_form_id, **contact_form}
#     else:
#         raise HTTPException(status_code=404, detail="Contact Form not found")

# # Update operation 
# @app.put("/contact_form/{contact_form_id}")
# async def update_contact_form(contact_form_id: str, contact_form: Contact_Form):
#     contact_form_ref = db.reference('contact_form').child(contact_form_id)
#     if contact_form_ref.get():
#         contact_form_ref.set(contact_form.model_dump())
#         return {"id": contact_form_id, **contact_form.model_dump()}
#     else:
#         raise HTTPException(status_code=404, detail="Contact Form not found")

# Delete operation 
@app.delete("/contact_form/{contact_form_id}")
async def delete_contact_form(contact_form_id: str):
    contact_form_ref = db.reference('contact_form').child(contact_form_id)
    if contact_form_ref.get():
        contact_form_ref.delete()
        return {"message": "contact Form deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Contact Form not found")
