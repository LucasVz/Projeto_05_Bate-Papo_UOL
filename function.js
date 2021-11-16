let SeuNome;
function receberPromessa(){
  const promessa = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
  promessa.then(imprimirMensagem);
}

function imprimirMensagem(resposta){
  const mensagens = resposta.data;
  const horaMensagem = document.querySelector(".mensagens");
  horaMensagem.innerHTML =" "

  for(let i = 0; i < (mensagens.length); i++ ){
    if(mensagens[i].type === "message"){
      horaMensagem.innerHTML += `
      <div class="mensagem mensagem-texto">
        <p class="tempo"> ${mensagens[i].time} </p>

        <p class="mensagem-de"> ${mensagens[i].from} </p>

        <p>para</p>

        <p class="mensagem-para"> ${mensagens[i].to}: </p>

        <p class="texto"> ${mensagens[i].text} </p>

      </div>
      `;
    }

    if(mensagens[i].type === "status"){
      horaMensagem.innerHTML += `
      <div class="mensagem mensagem-status">
      <p class="tempo"> ${mensagens[i].time} </p>

      <p class="mensagem-de"> ${mensagens[i].from} </p>

      <p class="texto"> ${mensagens[i].text} </p>

    </div>
    `;
    }

    if(mensagens[i].type === "private_message" && mensagens[i].to === SeuNome){
      horaMensagem.innerHTML += `
    <div class="mensagem mensagem-privada">
      <p class="tempo"> ${mensagens[i].time} </p>

      <p class="mensagem-de"> ${mensagens[i].from} </p>

      <p>reservadamente para</p>

      <p class="mensagem-para"> ${mensagens[i].to}: </p>

      <p class="texto"> ${mensagens[i].text} </p>

    </div>
    `;
    }
  }

  const rolarMensagem = document.querySelector(".mensagem:last-child");
  rolarMensagem.scrollIntoView();
}

  function cadastrarUsuario(){
    SeuNome = prompt("Digite seu nome");
    const promise = axios.post(
      "https://mock-api.driven.com.br/api/v4/uol/participants",
      {
        name: SeuNome
      }
    );
    promise.then(quandoSucesso);
    promise.catch(quandoErro);
  }

  function manterConexao(){
    const promise = axios.post(
      "https://mock-api.driven.com.br/api/v4/uol/status",
      {
        name: SeuNome
      }
    );
  }

  function quandoErro(resposta){
    alert("esse nome já está em uso, escolha outro nome")
    cadastrarUsuario();
  }

  function quandoSucesso(resposta){
  }
  
function enviarMensagem(){
  const input = document.querySelector(".digitar-mensagem")
  const dadosMensagem = {
    from: SeuNome,
    to: "todos",
    text: input.value,
    type: "message"
  }
  const promessa = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", dadosMensagem);
  promessa.then(mensagemEnviada);
  promessa.catch(mensagemErro);
  input.value = "";
}

function mensagemEnviada(resposta){

}

function mensagemErro(resposta){
  window.location.reload();
}

cadastrarUsuario();
receberPromessa();
setInterval(receberPromessa, 3000);
setInterval(manterConexao, 5000);
