import os
from flask import Flask, render_template, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)

# SMTP Configuration
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
ADMIN_EMAIL = "jddtp.5@gmail.com"
ADMIN_PASSWORD = "bssy ihaz ltid grpq"

def send_contact_emails(user_name, user_email, user_message):
    try:
        # Create SMTP session
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(ADMIN_EMAIL, ADMIN_PASSWORD)

        # 1. Email to the user (Thank You Message)
        msg_user = MIMEMultipart()
        msg_user['From'] = f"SoleX Footwear <{ADMIN_EMAIL}>"
        msg_user['To'] = user_email
        msg_user['Subject'] = f"Thank you for contacting SoleX, {user_name}!"
        
        body_user = f"""Hi {user_name},

Thank you for reaching out to SoleX Premium Footwear Shop!

We have successfully received your inquiry and our team is already reviewing it. We will get back to you as soon as possible.

Here are the details you submitted:
- Name: {user_name}
- Email: {user_email}
- Message: {user_message}

Have a wonderful day!

Best regards,
The SoleX Team
https://solexfootwear.com
"""
        msg_user.attach(MIMEText(body_user, 'plain'))
        server.sendmail(ADMIN_EMAIL, user_email, msg_user.as_string())

        # 2. Email to the admin (Submission Details)
        msg_admin = MIMEMultipart()
        msg_admin['From'] = f"SoleX Contact Form <{ADMIN_EMAIL}>"
        msg_admin['To'] = ADMIN_EMAIL
        msg_admin['Subject'] = f"New Contact Submission: {user_name}"
        
        body_admin = f"""Hello Admin,

You have received a new message through the SoleX contact form.

User Details:
- Name: {user_name}
- Email: {user_email}

User Message:
----------------------------------------
{user_message}
----------------------------------------

Please follow up with the user at your earliest convenience.
"""
        msg_admin.attach(MIMEText(body_admin, 'plain'))
        server.sendmail(ADMIN_EMAIL, ADMIN_EMAIL, msg_admin.as_string())

        server.quit()
        return True, "Emails sent successfully."
    except Exception as e:
        print(f"SMTP Error: {str(e)}")
        return False, str(e)

# Route for landing page
@app.route("/")
def home():
    return render_template("index.html")

# Route for Contact Form API
@app.route("/api/contact", methods=["POST"])
def contact():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "No data provided."}), 400
            
        name = data.get("name", "").strip()
        email = data.get("email", "").strip()
        message = data.get("message", "").strip()
        
        if not name or not email or not message:
            return jsonify({"status": "error", "message": "All fields are required."}), 400
            
        # Send emails
        success, err_msg = send_contact_emails(name, email, message)
        if success:
            return jsonify({"status": "success", "message": "Thank you! Your message has been sent successfully."})
        else:
            return jsonify({"status": "error", "message": f"Failed to send email. Error: {err_msg}"}), 500
            
    except Exception as e:
        return jsonify({"status": "error", "message": f"An unexpected error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    # Run on port 5000 in debug mode
    app.run(host="127.0.0.1", port=5000, debug=True)
