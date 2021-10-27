let cartas = [
    {
      nome: "Bulbassauro",
      imagem:
        "http://pm1.narvii.com/6209/56d57c37f505dc164cc429865dce90926020a1a3_00.jpg",
      atributos: {
        Attack: 7,
        Defense: 8,
        Magic: 6
      }
    },
    {
      nome: "Darth Vader",
      imagem:
        "https://i0.wp.com/sociedadejedi.com.br/wp-content/uploads/2020/01/darth-vader-.jpg",
      atributos: {
        Attack: 9,
        Defense: 8,
        Magic: 2
      }
    },
    {
      nome: "Shiryu de Dragão",
      imagem: "https://s.aficionados.com.br/imagens/shiryu.jpg",
      atributos: {
        Attack: 5,
        Defense: 9,
        Magic: 7
      }
    },
    {
      nome: "Goku",
      imagem:
        "https://img.elo7.com.br/product/zoom/32D6985/quadro-decorativo-desenho-dragon-ball-z-goku-salas-quadro-desenho-dragon-ball.jpg",
      atributos: {
        Attack: 8,
        Defense: 6,
        Magic: 8
      }
    },
    {
      nome: "Naruto",
      imagem:
        "https://img.elo7.com.br/product/original/19B3B92/painel-1x0-70-naruto-personalizado.jpg",
      atributos: {
        Attack: 6,
        Defense: 7,
        Magic: 7
      }
    },
    {
      nome: "Kenshin Himura",
      imagem:
        "https://assets.mycast.io/actor_images/actor-kenshin-himura-232263_large.jpg",
      atributos: {
        Attack: 9,
        Defense: 8,
        Magic: 0
      }
    },
    {
      nome: "Harry Potter",
      imagem:
        "https://sm.ign.com/ign_br/screenshot/default/harry-potter-hbo-max_q8yn.jpg",
      atributos: {
        Attack: 4,
        Defense: 6,
        Magic: 10
      }
    },
    {
      nome: "Monkey D. Luffy",
      imagem: "https://cdn.myanimelist.net/images/characters/9/310307.jpg",
      atributos: {
        Attack: 8,
        Defense: 7,
        Magic: 6
      }
    }
  ];

  let cartaMaquina;
  let cartaJogador;
  let cartasMaquina = [];
  let cartasJogador = [];
  let turno;
  let imgCartaMaquina;
  let imgCartaJogador;
  let divResultado = document.getElementById("resultado");
  
  function selTurno() {
    if (turno == 0) {
      document.getElementById("btnJogar").disabled = false;
      document.getElementById("mqnJogar").disabled = true;
    } else {
      document.getElementById("mqnJogar").disabled = false;
      document.getElementById("btnJogar").disabled = true;
    }
  }
  
  function sortearCarta() {
    while (cartas.length > 0) {
      cartaMaquina = cartas[parseInt(Math.random() * cartas.length)];
      cartasMaquina.push(cartaMaquina);
      cartas.splice(cartas.indexOf(cartaMaquina), 1);
      cartaJogador = cartas[parseInt(Math.random() * cartas.length)];
      cartasJogador.push(cartaJogador);
      cartas.splice(cartas.indexOf(cartaJogador), 1);
    }
    exibirCartaJogador();
    turno = parseInt(Math.random() * 2);
    document.getElementById("btnSortear").disabled = true;
    selTurno();
  }
  
  function obtemAtributoJogador() {
    let radioAtributos = document.getElementsByName("atributos");
    for (let i = 0; i < radioAtributos.length; i++) {
      if (radioAtributos[i].checked == true) {
        return (atributoSelecionado = radioAtributos[i].value);
      }
    }
  }
  
  function obtemAtributoMaquina() {
    let max = -Infinity;
    let maxIndex;
    for (let i = 0; i < Object.keys(cartasMaquina[0].atributos).length; i++) {
      if (Object.values(cartasMaquina[0].atributos)[i] > max) {
        max = Object.values(cartasMaquina[0].atributos)[i];
        maxIndex = Object.values(cartasMaquina[0].atributos).indexOf(max);
      }
    }
    return (atributoSelecionado = Object.keys(cartasMaquina[0].atributos)[
      maxIndex
    ]);
  }
  
  function compararCartas() {
    let valorCartaJogador = cartasJogador[0].atributos[atributoSelecionado];
    let valorCartaMaquina = cartasMaquina[0].atributos[atributoSelecionado];
    let htmlResultado = "";
    if (valorCartaJogador > valorCartaMaquina) {
      htmlResultado =
        "<p class='resultado-final'>You won the round!" +
        "<br>" +
        "Attribute was " +
        atributoSelecionado +
        "</p>";
      cartasJogador.push(cartasJogador[0], cartasMaquina[0]);
      cartasJogador.shift();
      cartasMaquina.shift();
      turno = 0;
      endgame();
    } else if (valorCartaJogador < valorCartaMaquina) {
      htmlResultado =
        "<p class='resultado-final'>You lost the round!" +
        "<br>" +
        "Attribute was " +
        atributoSelecionado +
        "</p>";
      cartasMaquina.push(cartasJogador[0], cartasMaquina[0]);
      cartasJogador.shift();
      cartasMaquina.shift();
      turno = 1;
      endgame();
    } else if (valorCartaJogador == valorCartaMaquina) {
      htmlResultado =
        "<p class='resultado-final'>It's a tie!" +
        "<br>" +
        "Attribute was " +
        atributoSelecionado +
        "</p>";
      ("</p>");
      cartasJogador.push(cartasJogador[0]);
      cartasJogador.shift();
      cartasMaquina.push(cartasMaquina[0]);
      cartasMaquina.shift();
    }
    divResultado.innerHTML = htmlResultado;
  }
  
  function jogar() {
    let atributoSelecionado = obtemAtributoJogador();
    exibirCartaMaquina();
    compararCartas();
    endgame();
    document.getElementById("btnJogar").disabled = true;
    document.getElementById("mqnJogar").disabled = true;
    document.getElementById("proxRod").disabled = false;
  }
  
  function vezMaquina() {
    let atributoSelecionado = obtemAtributoMaquina();
    exibirCartaMaquina();
    compararCartas();
    endgame();
    document.getElementById("btnJogar").disabled = true;
    document.getElementById("mqnJogar").disabled = true;
    document.getElementById("proxRod").disabled = false;
  }
  
  function exibirCartaJogador() {
    imgCartaJogador = document.getElementById("carta-jogador");
    imgCartaJogador.style.backgroundImage = `url(${cartasJogador[0].imagem})`;
    const moldura =
      '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
    const tagHTML = "<div id ='opcoes' class = 'carta-status'>";
    let opcoesTexto = "";
    for (let atributo in cartasJogador[0].atributos) {
      opcoesTexto +=
        "<input type='radio' name= 'atributos' checked= 'true' value='" +
        atributo +
        "'>" +
        " " +
        atributo +
        " " +
        cartasJogador[0].atributos[atributo] +
        "<br>";
      let nome = `<p class = "carta-subtitle"> ${cartasJogador[0].nome}</p> `;
      imgCartaJogador.innerHTML =
        moldura + nome + tagHTML + opcoesTexto + "</div>";
    }
  }
  
  function exibirCartaMaquina() {
    imgCartaMaquina = document.getElementById("carta-maquina");
    imgCartaMaquina.style.backgroundImage = `url(${cartasMaquina[0].imagem})`;
    const moldura =
      '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
    const tagHTML = "<div id ='opcoes' class = 'carta-status'>";
    let opcoesTexto = "";
    for (let atributo in cartasMaquina[0].atributos) {
      opcoesTexto +=
        "<p type='text' name= 'atributos' checked= 'true' value=''>" +
        atributo +
        " " +
        cartasMaquina[0].atributos[atributo] +
        " </p>";
      let nome = `<p class = "carta-subtitle"> ${cartasMaquina[0].nome}</p> `;
      imgCartaMaquina.innerHTML =
        moldura + nome + tagHTML + opcoesTexto + "</div>";
    }
  }
  
  function proxRodada() {
    exibirCartaJogador();
    imgCartaMaquina.style.backgroundImage = "";
    imgCartaMaquina.innerHTML =
      '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
    document.getElementById("proxRod").disabled = true;
    selTurno();
  }
  
  function endgame() {
    if (cartasJogador.length == 0) {
      document.getElementById("jogarNovamente").innerHMTL =
        "<button type='button' id='jogarNovamente' onclick='document.location.reload(true);' 'console.clear();'>Jogar Novamente</button>";
      htmlResultado =
        "<p class='resultado-final'>Your cards are gone!" +
        "<br>" +
        "You lost the game! </p>";
      divResultado.innerHTML = htmlResultado;
      document.getElementById("btnJogar").remove();
      document.getElementById("mqnJogar").remove();
      document.getElementById("proxRod").remove();
    } else if (cartasMaquina.length == 0) {
      document.getElementById("jogarNovamente").innerHMTL =
        "<button type='button' id='jogarNovamente' onclick='document.location.reload(true)'; 'console.clear()';>Jogar Novamente </button>";
      htmlResultado =
        "<p class='resultado-final'>Machine's cards are gone!" +
        "<br>" +
        "You won the game! </p>";
      divResultado.innerHTML = htmlResultado;
      document.getElementById("btnJogar").remove();
      document.getElementById("mqnJogar").remove();
      document.getElementById("proxRod").remove();
    }
  }
  
  Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
  };
  NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (let i = this.length - 1; i >= 0; i--) {
      if (this[i] && this[i].parentElement) {
        this[i].parentElement.removeChild(this[i]);
      }
    }
  };
  
