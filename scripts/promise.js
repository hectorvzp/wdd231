function rand(min, max) {
  min *= 1000;
  max *= 1000;
  return Math.floor(Math.random() * (max - min) + min);
}

function espera(msg, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(msg);
    }, time);
  });
}

espera("Hola", rand(1, 3)).then((resposta) => {
  console.log(resposta);
  return espera("Hola 2", rand(1, 3)).then((resposta) => {
    console.log(resposta);
    return espera("Hola 3", rand(1, 3)).then((resposta) => {
      console.log(resposta);
    });
  });
});
