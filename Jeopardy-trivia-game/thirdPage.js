const gameDiv = document.querySelector('#game');
const scoreSpan = document.querySelector('#score');


let score =  parseInt(sessionStorage.getItem('secondScore'));


//locat storage:
//localStorage.setItem('score', '120');
const genres =[
    {
        name: 'Music',
        id:12
    },
    {
        name: 'Geography',
        id: 22
    },
    {
        name: 'Books',
        id: 10
    }
]
const levels = ['easy','medium','hard'];

function addGenre(genre){
    const column = document.createElement('div')
    column.classList.add('genreColumn');
    column.innerHTML = genre.name;
    column.style.fontSize ="20px"
    column.style.fontWeight = "bolder"
    gameDiv.append(column);
    levels.forEach(element => {
        const card = document.createElement('div');
        card.classList.add('card');
        column.append(card);
        if(element === 'easy'){
            card.innerHTML = 100;   
        }
        if(element === 'medium'){
            card.innerHTML = 200;
        }
        if(element === 'hard'){
            card.innerHTML = 300;
        }
        fetch(`https://opentdb.com/api.php?amount=1&category=${genre.id}&difficulty=${element}&type=boolean`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            card.setAttribute('data-question', data.results[0].question);
            card.setAttribute('data-answer', data.results[0].correct_answer);
            card.setAttribute('data-value', card.getInnerHTML());
        }).then(done => card.addEventListener('click', flipCard))
    })
}
genres.forEach(genre => addGenre(genre));

function flipCard(){
    // console.log('clicked');
    this.innerHTML = ' ';
    this.style.fontSize = '15px';
    const textDisplay = document.createElement('div');
    const trueButton = document.createElement('button');
    const falseButton = document.createElement('button');
    trueButton.innerHTML = 'True';
    falseButton.innerHTML = 'False';
    //styling button:
    trueButton.classList.add('true-button');
    falseButton.classList.add('false-button');

    //adding event Listerner to true and false buttons:
    trueButton.addEventListener('click', getResult);
    falseButton.addEventListener('click', getResult);

    //we are getting the current card clicked- and getting data question
    //writing in textDisplay using innerHTML
    textDisplay.innerHTML = this.getAttribute('data-question');
    //to select the current card- we are using this here
    this.append(textDisplay, trueButton, falseButton);

    //getting all the cards and puttin them in an array
    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.removeEventListener('click', flipCard))
    // sessionStorage.setItem('Thirdscore',score);
}


function getResult(){
    // if(finalResult())
    const allCards = Array.from(document.querySelectorAll('.card'));
    allCards.forEach(card => card.addEventListener('click', flipCard));

    
    // if(document.body.allCards.classList.contains('.card') === 'true')
    // { 
    const cardOfButton = this.parentElement;
    if(cardOfButton.getAttribute('data-answer') === this.innerHTML){
        console.log('Its a Match');
        score = score + parseInt(cardOfButton.getAttribute('data-value'));
        
        scoreSpan.innerHTML = score;
        cardOfButton.classList.add('correct-answer');
        sessionStorage.setItem('Thirdscore',score);
        //remove all the items from the card using while loop
        setInterval(()=>{
                while(cardOfButton.firstChild){
                    cardOfButton.removeChild(cardOfButton.lastChild)
                }
                cardOfButton.innerHTML = cardOfButton.getAttribute('data-value')
        },100)
    }
    else{
        console.log('Not a Match');
        cardOfButton.classList.add('wrong-answer');
        setInterval(()=>{
            while(cardOfButton.firstChild){
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = 0
    },100)
    }
    //-making avaialble all the other cards after clicking the this card. and 
    //removing lister for this card.
    cardOfButton.removeEventListener('click', flipCard);
    }
    

