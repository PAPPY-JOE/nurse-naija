from fastapi import FastAPI, HTTPException
import firebase_admin
from firebase_admin import db, credentials, initialize_app
from models import User

# Create FastAPI instance
app = FastAPI()

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
@app.post("/users")
async def create(user: User):
    new_user_ref = db.reference('users').push()
    new_user_ref.set(user.model_dump())
    return {"id": new_user_ref.key, **user.model_dump()}

# Read operation (single)
@app.get("/users/{user_id}")
async def fetch_user(user_id: str):
    user_ref = db.reference('users').child(user_id)
    user = user_ref.get()
    if user:
        return {"id": user_id, **user}
    else:
        raise HTTPException(status_code=404, detail="User not found")

# Update operation 
@app.put("/users/{user_id}")
async def update_user(user_id: str, user: User):
    user_ref = db.reference('users').child(user_id)
    if user_ref.get():
        user_ref.set(user.model_dump())
        return {"id": user_id, **user.model_dump()}
    else:
        raise HTTPException(status_code=404, detail="User not found")

# Delete operation 
@app.delete("/users/{user_id}")
async def delete_user(user_id: str):
    user_ref = db.reference('users').child(user_id)
    if user_ref.get():
        user_ref.delete()
        return {"message": "User deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="User not found")
