import json
import boto3
import uuid
from datetime import datetime, timezone

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("JobApplications")

def lambda_handler(event, context):
    try:
        print("EVENT:", json.dumps(event))

        if "body" in event:
            body = json.loads(event["body"]) if isinstance(event["body"], str) else event["body"]
        else:
            body = event

        print("BODY:", json.dumps(body))

        required_fields = [
            "fullName",
            "email",
            "phoneNumber",
            "qualification",
            "experience",
            "skills",
            "coverLetter"
        ]

        for field in required_fields:
            if field not in body or not str(body[field]).strip():
                return create_response(
                    400,
                    {"message": f"{field} is required"}
                )

        application_id = str(uuid.uuid4())

        item = {
            "applicationId": application_id,
            "fullName": str(body["fullName"]),
            "email": str(body["email"]),
            "phoneNumber": str(body["phoneNumber"]),
            "qualification": str(body["qualification"]),
            "experience": str(body["experience"]),
            "skills": str(body["skills"]),
            "coverLetter": str(body["coverLetter"]),
            "appliedDate": datetime.now(timezone.utc).isoformat()
        }

        table.put_item(Item=item)

        return create_response(
            200,
            {
                "message": "Application submitted successfully",
                "applicationId": application_id
            }
        )

    except Exception as e:
        print("ERROR:", str(e))
        return create_response(
            500,
            {"message": "Error processing application"}
        )


def create_response(status_code, body):
    return {
        "statusCode": status_code,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST"
        },
        "body": json.dumps(body)
    }
