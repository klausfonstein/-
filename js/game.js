const numDivs = 36;
const maxHits = 10;

let hits = 0;
let num = 1;
let firstHitTime = 0;



function round() {

  const divSelector = randomDivId();
  
  $(divSelector).addClass("target");
  $(divSelector).text(num);
  // FIXME: тут надо определять при первом клике firstHitTime
  if (hits === maxHits) {
    endGame();
  }
  firstHitTime = getTimestamp();

}



function endGame() {
  $(".row").detach();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {

    hits = hits + 1;
    num = num + 1;
    $(event.target).text("");
    $(event.target).removeClass("target");



    round();
    
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {

    location.reload();
  });
}

$(document).ready(init);
