
// ussing default operator in variable
let score = JSON.parse(localStorage.getItem('score'))  || {
    wins: 0,
    looses: 0,
    ties: 0
    };

// if(score=== null)
//  if(!score){
//     score = {
//         wins: 0,
//         looses: 0,
//         ties: 0
//     };
// }



updateScore();

document.querySelector('.rock-button').addEventListener('click', ()=> {
    playGame('rock');
});
document.querySelector('.paper-button').addEventListener('click', ()=> {
    playGame('paper');
});
document.querySelector('.scissors-button').addEventListener('click', ()=> {
    playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors');
    }
});

function playGame(playerMove){
    const computerMove = display();
    let result = '';
     
    if(playerMove === 'rock'){
        if(computerMove === 'rock'){
        result = 'Tie';
        }else if (computerMove === 'paper') {
            result = 'You Loose';
        }else if (computerMove ==='scissors') {
            result = 'You win';
        }
    
    
    }else if (playerMove === 'paper') {
        if(computerMove === 'rock'){
            result = 'You Loose';
        }else if (computerMove === 'paper') {
            result = 'Tie';
        }else if (computerMove ==='scissors') {
            result = 'You win';
        }
    }else if (playerMove === 'scissors') {
        if(computerMove === 'rock'){
            result = 'You Loose';
        }else if (computerMove === 'paper') {
            result = 'You win';
        }else if (computerMove ==='scissors') {
            result = 'Tie';
        }     

    }



    if(result === 'You win') {
        score.wins += 1;
    }else if( result === 'You Loose') {
        score.looses += 1;
    }else if( result === 'Tie') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScore();

    document.querySelector('.result').innerHTML = result;

    document.querySelector('.moves').innerHTML = `
        You Picked <img src="${getIcon(playerMove)}" class="move-icon">.
        Computer Picked <img src="${getIcon(computerMove)}" class="move-icon">
    `;
    
}


function updateScore(){
    document.querySelector('.score').innerHTML = `Wins: ${score.wins},Looses: ${score.looses},Ties:${score.ties}`;
}




function display() {
const randomNumber  = Math.random();
let computerMove = '';
    if (randomNumber >=0 && randomNumber < 1/3){
        computerMove = 'rock';
    }else if (randomNumber >=1/3 && randomNumber < 2/3) {
            computerMove = 'paper';
    }else if (randomNumber >=2/3 && randomNumber <1){
        computerMove = 'scissors';
    }
    return computerMove;
}
function getIcon(move) {
    if (move === 'rock') {
        return "https://thumb.silhouette-ac.com/t/69/69ffced83032519ca680dc3058b9ca26_t.jpeg";
    } else if (move === 'paper') {
        return "https://thumb.silhouette-ac.com/t/26/2654adfd65b6ca4a8ac25a9f727d2262_t.jpeg";
    } else {
        return "https://thumb.silhouette-ac.com/t/a7/a7c3020b4cfb4fd154c4fcfd62702df2_t.jpeg";
    }
}


let isAutoPlaying = false;
let intervalId ;

function autoPlay() {
if(!isAutoPlaying) {
   intervalId= setInterval(function() { 
        const playerMove = display();
        playGame(playerMove);

    }, 1000);
    isAutoPlaying = true;
}
else{
    clearInterval(intervalId);
    isAutoPlaying = false;
}
}