document.addEventListener('DOMContentLoaded', () => {
  
  const mazzo = [
    {
      name: 'patatine',
      img: 'img/patatine.png'
    },
    {
      name: 'cheeseburger',
      img: 'img/cheeseburger.png'
    },
    {
      name: 'gelato',
      img: 'img/gelato.png'
    },
    {
      name: 'pizza',
      img: 'img/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'img/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'img/hotdog.png'
    },
    {
      name: 'patatine',
      img: 'img/patatine.png'
    },
    {
      name: 'cheeseburger',
      img: 'img/cheeseburger.png'
    },
    {
      name: 'gelato',
      img: 'img/gelato.png'
    },
    {
      name: 'pizza',
      img: 'img/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'img/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'img/hotdog.png'
    }
  ]

    
  
  const schermo = document.querySelector('#schermo')
  const messaggi = document.querySelector('#messaggi')
  const griglia = document.querySelector('.griglia')
  const btnReset = document.querySelector('#btnReset')
  const messaggiovuoto = '&nbsp;&nbsp;&nbsp;&nbsp;'
  btnReset.addEventListener('click', avvia)
  let carteScelteArray = []
  let idCarteScelteArray = []
  let mazzoCoppieTrovateArray = []
  avvia()
     
  function avvia() {
    griglia.textContent = ''
    mazzoCoppieTrovateArray = []
    schermo.textContent = mazzoCoppieTrovateArray.length
    messaggi.innerHTML = messaggiovuoto
    start()
  }
  
  function start() {
    mazzo.sort(() => 0.5 - Math.random())
    daiLeCarte()
  }

  //Smazza le carte sul tavolo 
  function daiLeCarte() {
    for (let j = 0; j < mazzo.length; j++) {
      const tagImgCarta = document.createElement('img')
      tagImgCarta.setAttribute('src', 'img/retro.png')
      tagImgCarta.setAttribute('data-id', j)
      tagImgCarta.addEventListener('click', voltaLaCarta)
      griglia.appendChild(tagImgCarta)
    }
  }

  //Volta una carta 
  function voltaLaCarta() {
    let idCarta = this.getAttribute('data-id')
    carteScelteArray.push(mazzo[idCarta].name)
    idCarteScelteArray.push(idCarta)
    this.setAttribute('src', mazzo[idCarta].img)
    if (carteScelteArray.length === 2) {                
      setTimeout(checkCoppia, 500)
      for (let h = 0; h<griglia.childNodes.length; h++) {
        griglia.childNodes[h].removeEventListener('click', voltaLaCarta)
      }      
    }
  }
  
  //Controlla se hai scelto una coppia
  function checkCoppia() {
    const carteSulTavolo = document.querySelectorAll('img')
    const id1 = idCarteScelteArray[0]
    const id2 = idCarteScelteArray[1]
    
    for (let h = 0; h<griglia.childNodes.length; h++) {
      griglia.childNodes[h].addEventListener('click', voltaLaCarta)
    }    

    if(id1 == id2) {     
      visualizzaMessaggio('Attento, hai cliccato sulla stessa immagine. ', 1000)
      carteSulTavolo[id1].setAttribute('src', 'img/retro.png')
      carteSulTavolo[id2].setAttribute('src', 'img/retro.png')          
    }
    else if (carteScelteArray[0] === carteScelteArray[1]) {
      visualizzaMessaggio('Hai trovato una coppia !', 1000)          
      carteSulTavolo[id1].setAttribute('src', 'img/bianca.png')
      carteSulTavolo[id2].setAttribute('src', 'img/bianca.png')
      carteSulTavolo[id1].removeEventListener('click', voltaLaCarta)
      carteSulTavolo[id2].removeEventListener('click', voltaLaCarta)
      mazzoCoppieTrovateArray.push(carteScelteArray)
    } else {
      visualizzaMessaggio('Peccato, riprova !', 1000)         
      carteSulTavolo[id1].setAttribute('src', 'img/retro.png')
      carteSulTavolo[id2].setAttribute('src', 'img/retro.png')      
    }
    carteScelteArray = []
    idCarteScelteArray = []
    schermo.textContent = mazzoCoppieTrovateArray.length
    if  (mazzoCoppieTrovateArray.length === mazzo.length/2) {      
      visualizzaMessaggio('***** Bravo ! hai vinto ! *****', 5000)
    }
  }

  function visualizzaMessaggio (mess, tempo) {
    const carte = document.querySelectorAll('img')
    removeEventListener('click', voltaLaCarta)
    messaggi.innerHTML = mess
    setTimeout(() => { messaggi.innerHTML=messaggiovuoto}, tempo)
    addEventListener('click', voltaLaCarta)
  }
  
})
