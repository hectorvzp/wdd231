function rand(min, max) {
  min *= 1000;
  max *= 1000;
  return Math.floor(Math.random() * (max - min) + min);
}

function esperaAi(msg, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(msg);
    }, time);
  });
}
async function executa() {
  try {
    const fase1 = await esperaAi("Fase 1", rand(1, 3));
    console.log(fase1);
    const fase2 = await esperaAi("Fase 2", rand(1, 3));
    console.log(fase2);
    const fase3 = await esperaAi("Fase 3", rand(1, 3));
    console.log(fase3);
    console.log("Terminamos na fase:", fase3);
  } catch (e) {
    console.log(e);
  }
}

executa();
