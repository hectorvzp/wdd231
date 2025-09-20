const last = document.getElementById("lasti");
if (last) {
  const oLastModif = new Date(document.lastModified);
  const resultado = oLastModif.toLocaleString();
  last.innerHTML = resultado;
}
