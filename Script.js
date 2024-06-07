
function makecards() {
    var multiplecards = "";
    for (i = 0; i < 8; i++) {
        multiplecards +=  `<div class="newscard"></div>`;
    }

    document.querySelector(".newsContent").innerHTML = multiplecards;
}

makecards();