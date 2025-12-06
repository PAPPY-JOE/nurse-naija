from pydantic import BaseModel
from datetime import datetime
# from typing import Optional

# Get the current date and time as a datetime object
current_datetime = datetime.now()

class Contact_Form(BaseModel):
    name: str
    email: str
    message: str
    replied: bool = False
    time: str = current_datetime
    # message: Optional[str] = None
