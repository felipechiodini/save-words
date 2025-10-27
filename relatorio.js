// Carrega os dados salvos
chrome.storage.local.get("resultados", (res) => {
  const listaEl = document.getElementById("lista");
  const resultados = res.resultados || [];

  if (resultados.length === 0) {
    listaEl.textContent = "Nenhum resultado salvo ainda.";
    return;
  }

  resultados.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = `${index + 1}. ${item}`;
    listaEl.appendChild(div);
  });
});

// Limpar resultados
document.getElementById("limpar").addEventListener("click", () => {
  chrome.storage.local.remove("resultados", () => {
    alert("Resultados limpos!");
    location.reload();
  });
});
