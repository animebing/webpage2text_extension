function copy2clipboard() {
    let text = document.body.innerText;
    text = text.replace(/ +/g, " ");
    text = text.replace(/\t+/g, "\n");
    text = text.replace(/\n /g, "\n");
    text = text.replace(/\n+/g, "\n");
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
        .then(() => {
            alert("Copied to clipboard");
        })
        .catch((err) => {
            console.error('Error copying text: ', err);
        });
    }
    else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        // Select the text in the textarea
        textarea.select();
        // Execute the "copy" command
        document.execCommand("copy");
        // Remove the temporary textarea
        document.body.removeChild(textarea);
        alert("Copied to clipboard");
    }
}

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target : {tabId : tab.id},
        func : copy2clipboard,
    });
});
