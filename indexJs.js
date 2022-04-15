// 전역변수

//클릭된 카드
var ClickedCard = [];

//클릭 횟수
var Clickcount = 0;

//남은 횟수
var Clickremain = 15;

//버튼 클릭
var countBtn = 0;


var cards = [
    "images/card1.png", "images/card2.png", "images/card3.png", "images/card4.png",
    "images/card5.png", "images/card6.png", "images/card7.png", "images/card8.png",
    "images/card9.png", "images/card10.png", "images/card11.png", "images/card12.png",
    "images/card13.png", "images/card14.png", "images/card15.png", "images/card16_h.png"
];

var Clonecards = cards.slice();

var Acards = [];

var cardsClick = true;
var Check = true;


function random() {
    Acards = [];
    Clonecards = cards.slice();
    for (var i = 0; 0 < Clonecards.length; i++) {
        Acards = Acards.concat(Clonecards.splice(Math.floor(Math.random() * Clonecards.length), 1));
    }

}

function cardSetting(row, col) {
    for (var i = 0; i < row * col; i++) {
        Clonecards = cards;
        var main = document.getElementById("leftContent");
        var fix = document.getElementById("fix");

        var card = document.createElement('div');
        card.className = 'card';

        var cardInner = document.createElement('div');
        cardInner.className = 'card-inner';

        var cardFront = document.createElement('div');
        cardFront.className = 'card-front';

        var cardBack = document.createElement('div');

        if (Acards[i] == "images/card16_h.png") {
            cardBack.className = 'card-back1';
            cardBack.style.backgroundImage = 'url(' + Acards[i] + ')';
            cardBack.style.backgroundRepeat = 'no-repeat';
            cardBack.style.backgroundSize = 'cover';
        } else {
            cardBack.className = 'card-back';
            cardBack.style.backgroundImage = 'url(' + Acards[i] + ')';
            cardBack.style.backgroundRepeat = 'no-repeat';
            cardBack.style.backgroundSize = 'cover';
        }

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        fix.appendChild(card);
        main.appendChild(fix);

        cardsClick = true;
        (function (c) {
            c.addEventListener('click', function () {
                if (!ClickedCard.includes(c) && cardsClick) {
                    c.classList.toggle('flipped');
                    Clickcount++;
                    Clickremain -= 1;
                    ClickedCard.push(c);
                    var printResult = document.getElementById("result");
                    message = "클릭횟수" + Clickcount + "&nbsp;&nbsp;" + "남은 횟수" + Clickremain;
                    printResult.innerHTML += message;
                    // 방법 1
                    for (var j = 0; j < ClickedCard.length; j++) {
                        if (ClickedCard[j].querySelector('.card-back1')) {
                            Clickcard = 1;
                            
                        } else {
                            Clickcard = 0;

                        }
                    }
                    if (Clickcard == 0) {
                        message = '&nbsp;' + "실패" + '<br>';
                        printResult.innerHTML += message;
                    }

                    if (Clickcount == 15) {
                        if (Clickcard == 1) {
                            cardsClick = false;
                            message = "성공";
                            printResult.innerHTML = message;
                            document.querySelectorAll('.card-back').forEach(function (cardBack, index) {
                                setTimeout(function () {
                                    cardBack.style.backgroundImage = 'url(' + "images/card16_h.png" + ')';
                                }, 1000 + 100 * index);
                            });
                            document.querySelectorAll('.card').forEach(function (card, index) {
                                cardsClick = false;
                                setTimeout(function () {
                                    card.classList.add('flipped');
                                }, 1000 + 100 * index);
                            });
                        } else {
                            cardsClick = false;
                            message = "실패하셨습니다 다시 도전해주세요";
                            printResult.innerHTML = message;
                        }
                    } else if (Clickcount < 16 && Clickcard == 1) {
                        cardsClick = false;
                        message = "성공";
                        printResult.innerHTML = message;
                        document.querySelectorAll('.card-back').forEach(function (cardBack, index) {
                            setTimeout(function () {
                                cardBack.style.backgroundImage = 'url(' + "images/card16_h.png" + ')';
                            }, 1000 + 100 * index);
                        });
                        document.querySelectorAll('.card').forEach(function (card, index) {
                            setTimeout(function () {
                                card.classList.add('flipped');
                            }, 1000 + 100 * index);
                        });
                    }
                }
            });
        })(card);
    }

}

function cardShuffle() {
    countBtn++;
    var printResult = document.getElementById("result");
    var message;
    //방법 1
    if(countBtn == 1){
        message = "게임을 시작하겠습니다. 위에 기재된 규칙에 따라 시작하십시오" + '<br>';
    }
    else if (countBtn > 1) {
        document.querySelector('#fix').innerHTML = '';
        Clickcount = 0;
        ClickedCard = [];
        Clickremain = 15;
        message = "하트 위치를 변경하였습니다." + '<br>' + '<br>';
    }
    random();
    cardSetting(4, 4);
    printResult.innerHTML = message;
}


