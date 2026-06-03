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

        let successMessage = "Application submitted successfully";

        if (result.body) {
            const body = JSON.parse(result.body);
            successMessage = body.message;
        }

        message.style.color = "green";
        message.innerText = successMessage;

        document.getElementById("applicationForm").reset();

    } catch (error) {
        console.error(error);
        message.style.color = "red";
        message.innerText = "Error submitting application";
    }
});
