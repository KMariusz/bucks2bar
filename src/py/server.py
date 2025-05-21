from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import base64
import smtplib
from email.message import EmailMessage
import os

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files from 'src'
app.mount("/", StaticFiles(directory="src", html=True), name="static")

class EmailRequest(BaseModel):
    email: str
    image: str

@app.post("/send-chart-email")
async def send_chart_email(data: EmailRequest):
    email = data.email
    image = data.image
    if not email or not image:
        raise HTTPException(status_code=400, detail="Missing email or image")
    print(f"Sending chart to {email}")

    # Remove data URL prefix
    base64_data = image.replace("data:image/png;base64,", "")

    # Prepare email
    msg = EmailMessage()
    msg["Subject"] = "Your Bucks2Bar Chart"
    msg["From"] = "your.email@gmail.com"
    msg["To"] = email
    msg.set_content("Attached is your chart from Bucks2Bar.")

    # Attach image
    img_bytes = base64.b64decode(base64_data)
    msg.add_attachment(img_bytes, maintype="image", subtype="png", filename="chart.png")

    # Send email (configure your SMTP server here)
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login("your.email@gmail.com", "your_app_password")
            smtp.send_message(msg)
        return {}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Failed to send email")

# To run: uvicorn server:app --reload --port 3000

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="127.0.0.1", port=3000, reload=True)