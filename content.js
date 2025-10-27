let popup;

const onClick = (e) => {
    if (popup && !popup.contains(e.target)) {
        popup.remove();
    }
}

const createPopUp = () => {
    const popup = document.createElement("div");
    popup.className = "meu-popup";
    popup.textContent = "Salvar";
    return popup;
}

document.addEventListener("mouseup", (e) => {
    const selection = window.getSelection().toString().trim();

    if (selection.length === 0) return;

    popup?.remove();

    popup = createPopUp();

    const rect = window.getSelection()
        .getRangeAt(0)
        .getBoundingClientRect();

    popup.style.top = `${window.scrollY + rect.top - 40}px`;
    popup.style.left = `${window.scrollX + rect.left}px`;

    popup.addEventListener("click", async () => {
        const res = await chrome.storage.local.get("resultados");
        const lista = res.resultados || [];

        lista.push(texto);
        await chrome.storage.local.set({ resultados: lista });

        console.log('Salvando...', selection);
        
        popup.remove();
    })

    document.body.appendChild(popup);

    setTimeout(() => document.addEventListener("click", onClick, { once: true }), 100);
});
