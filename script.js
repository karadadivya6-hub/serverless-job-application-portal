const API_URL = "https://ahc6myioid.execute-api.ap-south-1.amazonaws.com/prod/apply";

document.getElementById("applicationForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const data = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        qualification: document.getElementById("qualification").value,
        experience: document.getElementById("experience").value,
        skills: document.getElementById("skills").value,
        coverLetter: document.getElementById("coverLetter").value
    };

    const message = document.getElementById("message");

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        const body = JSON.parse(result.body);

        if (response.ok) {
            message.style.color = "green";
            message.innerText = body.message;
            document.getElementById("applicationForm").reset();
        } else {
            message.style.color = "red";
            message.innerText = body.message || "Application failed";
        }

    } catch (error) {
        console.error(error);
        message.style.color = "red";
        message.innerText = "Error submitting application";
    }
});
