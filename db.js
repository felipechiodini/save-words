export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("RelatorioDB", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("resultados")) {
        db.createObjectStore("resultados", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
}

export async function salvarResultado(texto) {
  const db = await openDB();
  const tx = db.transaction("resultados", "readwrite");
  const store = tx.objectStore("resultados");
  const data = {
    texto,
    criadoEm: new Date().toISOString()
  };
  store.add(data);
  return tx.complete;
}

export async function listarResultados() {
  const db = await openDB();
  const tx = db.transaction("resultados", "readonly");
  const store = tx.objectStore("resultados");

  return new Promise((resolve) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
  });
}

export async function limparResultados() {
  const db = await openDB();
  const tx = db.transaction("resultados", "readwrite");
  tx.objectStore("resultados").clear();
  return tx.complete;
}
