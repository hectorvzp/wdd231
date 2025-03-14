const ano = document.getElementById("mostrarAnoAtual");
const anoAtual = new Date();
ano.innerHTML = anoAtual.getFullYear();

const last = document.getElementById("lasti");
const oLastModif = new Date(document.lastModified);
const resultado = oLastModif.toLocaleString();
last.innerHTML = resultado;