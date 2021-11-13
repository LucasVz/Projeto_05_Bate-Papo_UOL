const promessa = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
promessa.then(imprimirMensagem);

function ReceberMensagens(mensagens){
  console.log(mensagens.data);
}

function imprimirMensagem(resposta){
  const mensagens = resposta.data;
  const horaMensagem = document.querySelector(".mensagens");
  for(let i = 0; i < (mensagens.length); i++ ){
    horaMensagem.innerHTML += `
    <div class="mensagen">
      ${mensagens[i].time} ${mensagens[i].from} ${mensagens[i].to} ${mensagens[i].text}
    </div>
    `;
  }





  //const ultimaMensagem = mensagens[0];
  //horaMensagem.innerHTML = ultimaMensagem.time;
  console.log( mensagens);
}
