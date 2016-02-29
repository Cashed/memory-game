'use strict';
(function() {
  var countDown;
  var timeLoss;
  var scoreIncrementer;
  var flippedCards = [];
  var score = document.getElementsByClassName('score')[0];
  var timer = document.getElementsByClassName('timer')[0];
  var endGame = document.getElementsByClassName('game-over')[0];
  var restart = document.getElementsByTagName('button')[0];

  function dealDeck() {
    var card = document.getElementsByClassName('card');
    var pics = ['images/100.jpg', 'images/101.jpg', 'images/102.jpg', 'images/103.jpg', 'images/104.jpg', 'images/105.jpg', 'images/106.jpg', 'images/107.jpg', 'images/100.jpg', 'images/101.jpg', 'images/102.jpg', 'images/103.jpg', 'images/104.jpg', 'images/105.jpg', 'images/106.jpg', 'images/107.jpg'];

    timeLoss = 59;
    scoreIncrementer = 0;

    endGame.style.display = 'none';

    shuffle(pics);

    for (var i = 0; i < card.length; i++) {
      card[i].querySelector('.front').src = pics[i];
      card[i].querySelector('.front').style.display = 'none';
      card[i].querySelector('.back').style.display = 'inline-block';
      card[i].addEventListener('click', flip);
    }

    score.innerText = '00';

    startTimer();
  }

  function flip() {
    if (this.querySelector('.front').style.display === 'none' && flippedCards.length < 2) {
      this.querySelector('.front').style.display = 'inline-block';
      this.querySelector('.back').style.display = 'none';

      flippedCards.push(this);

      checkMatch();
    }
  }

  function checkMatch() {
    if (flippedCards.length === 2) {
      if (flippedCards[0].querySelector('.front').src === flippedCards[1].querySelector('.front').src) {
        flippedCards = [];

        score.innerText = '0' + ++scoreIncrementer;
        if (scoreIncrementer === 8) {
          finalize();
        }
      }
      else {
        setTimeout(flipBack, 1500);
      }
    }
  }

  function flipBack() {
    flippedCards[0].querySelector('.front').style.display = 'none';
    flippedCards[1].querySelector('.front').style.display = 'none';

    flippedCards[0].querySelector('.back').style.display = 'inline-block';
    flippedCards[1].querySelector('.back').style.display = 'inline-block';

    flippedCards = [];
  }

  function startTimer() {
    timer.innerText = '1:00';
    countDown = setInterval(decrementTime, 1000);
  }

  function decrementTime() {
    if (timeLoss === 0) {
      timer.innerText = '0:0' + timeLoss;
      clearInterval(countDown);
      finalize();
    }
    else if (timeLoss < 10) {
      timer.innerText = '0:0' + timeLoss;
    }
    else {
      timer.innerText = '0:' + timeLoss;
    }
    timeLoss--;
  }

  function finalize() {
    endGame.style.display = 'flex';

    clearInterval(countDown);

    if (scoreIncrementer === 8) {
      endGame.querySelector('h1').innerText = 'you win';
    }
    else {
      endGame.querySelector('h1').innerText = 'you lose';
    }
    endGame.querySelector('.final-score').innerText = 'score: ' + scoreIncrementer;
    endGame.querySelector('.time').innerText = 'time left: ' + timeLoss + ' sec.';
  }

  function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  dealDeck();

  restart.addEventListener('click', dealDeck);
})();
