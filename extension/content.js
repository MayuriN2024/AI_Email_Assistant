console.log("AI Email Assistant Content Script Loaded");

// Function to find the reply area and inject a button
function injectAIButton() {
    const containers = document.querySelectorAll('.btC'); // Gmail's button container in compose/reply

    containers.forEach(container => {
        if (container.querySelector('.ai-reply-btn')) return;

        const aiBtn = document.createElement('div');
        aiBtn.className = 'ai-reply-btn b7 b8'; // Matching some Gmail styles
        aiBtn.innerText = '✨ AI Reply';
        aiBtn.style.padding = '8px 12px';
        aiBtn.style.marginRight = '8px';
        aiBtn.style.cursor = 'pointer';
        aiBtn.style.backgroundColor = '#1a73e8';
        aiBtn.style.color = 'white';
        aiBtn.style.borderRadius = '4px';
        aiBtn.style.fontWeight = 'bold';
        aiBtn.style.display = 'inline-block';
        
        aiBtn.onclick = async () => {
             aiBtn.innerText = 'Generating...';
             const originalEmail = extractOriginalEmail();
             if (!originalEmail) {
                alert("Please open an email thread first.");
                aiBtn.innerText = '✨ AI Reply';
                return;
             }

             try {
                const response = await fetch('http://localhost:5000/generate-reply', {
                   method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify({ email: originalEmail, tone: 'professional' })
                });

                const result = await response.json();
                if (result.reply) {
                    insertReply(result.reply);
                } else {
                    alert("Reply generation failed.");
                }
             } catch(err) {
                console.error(err);
                alert("Could not connect to the backend (http://localhost:5000). Is it running?");
             } finally {
                aiBtn.innerText = '✨ AI Reply';
             }
        };

        // Insert before the send button area
        container.prepend(aiBtn);
    });
}

function extractOriginalEmail() {
    // Try to find the latest message body in the current thread
    const bodies = document.querySelectorAll('.a3s.aiL');
    if (bodies.length > 0) {
        return bodies[bodies.length - 1].innerText;
    }
    return "";
}

function insertReply(text) {
    const replyBox = document.querySelector('.Am.Al.editable.LW-avf.tS-tW') || document.querySelector('[aria-label="Message Body"]');
    if (replyBox) {
        replyBox.innerHTML = text.replace(/\n/g, '<br>');
    } else {
        alert("Compose window not found. Please click Reply first.");
    }
}

// Observe Gmail's dynamic loading
const observer = new MutationObserver((mutations) => {
    injectAIButton();
});

observer.observe(document.body, { childList: true, subtree: true });

// Initial call
injectAIButton();
