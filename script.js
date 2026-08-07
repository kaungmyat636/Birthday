// Default values if no URL parameters are provided
const urlParams = new URLSearchParams(window.location.search);
if (!urlParams.has('name')) {
    const nameEl = document.getElementById('name');
    const msgEl = document.getElementById('message');
    if (nameEl) nameEl.innerText = "Happy Birthday, Bbe!"; // 
    if (msgEl) msgEl.innerText = "Wishing you all the best on your special day!";
}
