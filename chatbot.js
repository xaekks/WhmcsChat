document.addEventListener("DOMContentLoaded", function () {
    const chatIcon = document.createElement("div");
    chatIcon.id = "chatIcon";
    chatIcon.innerHTML = "💬"; // Chat bubble icon
    document.body.appendChild(chatIcon);

    const chatBox = document.createElement("div");
    chatBox.id = "chatBox";
    chatBox.innerHTML = `
        <div id="chatHeader">KissuHost AI Bot</div>
        <div id="chatMessages"></div>
        <input type="text" id="chatInput" placeholder="Type a message..." />
        <button id="chatSend">Send</button>
    `;
    document.body.appendChild(chatBox);

    chatIcon.addEventListener("click", function () {
        chatBox.classList.toggle("active");
    });

    document.getElementById("chatSend").addEventListener("click", function () {
        sendMessage();
    });

    document.getElementById("chatInput").addEventListener("keypress", function (e) {
        if (e.key === "Enter") sendMessage();
    });

    function sendMessage() {
        const userMessage = document.getElementById("chatInput").value.trim();
        if (!userMessage) return;

        // Display user message
        const messagesDiv = document.getElementById("chatMessages");
        messagesDiv.innerHTML += `<div class="userMessage">${userMessage}</div>`;

        // Send request to backend
        fetch("chatbot.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: "message=" + encodeURIComponent(userMessage)
        })
        .then(response => response.json())
        .then(data => {
            messagesDiv.innerHTML += `<div class="botMessage">${data.response}</div>`;
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        });

        document.getElementById("chatInput").value = "";
    }
});
