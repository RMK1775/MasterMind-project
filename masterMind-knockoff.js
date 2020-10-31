function getCheckedColor(checkboxname){
    const checkboxes = document.querySelectorAll(`[name=${checkboxname}]`)
    return [...checkboxes].filter(cb => cb.checked)[0].dataset.color;
}


(function () {

console.log("To begin, you can either start the game with 6 colors or select 'hard mode' first and then start the game for 12 colors " +"\n" +
        "The goal is to determine the sequence that is generated by using process of elimination." + "\n" +
        "Input your four guesses into the provided text box and assert them against the hidden code " + "\n" +
        "You will be given one of 3 responses after each assert, 0 red, 0 white => no colors are in the sequence " + "\n" +
        "'x' red response means that 'x' many colors are correct and in the correct spot in the sequence( no particular order tho) " + "\n" +
        "'x' white response means that 'x' many colors are correct but in the wrong spot in the sequence (no particular order as well) " + "\n" +
        "use the provided notes box as needed to keep track of your options you have eliminated, you have 10 guesses to solve the code!");

    const colorKey = [
        "blue",
        "yellow",
        "orange",
        "green",
        "pink",
        "brown"
    ];
    const hardColorKey = colorKey.concat[
        "olive",
        "purple",
        "grey",
        "lime",
        "cyan",
        "tan"
    ];

    let sequence = [];
    let hardMode = document.getElementById("increaseDiff");
    let hard = false;
    let isHard = document.getElementById("isHardMode");
    hardMode.addEventListener("click", function () {
        hard = true;
        hardMode.style.color = "#14bdeb";
        hardMode.style.background = "black";
        isHard.innerText = "Enabled";
        hardMode.disabled = true;
    });

    let won = false;
    let newGame = document.getElementById("newGame");
    let done = document.getElementById("done");
    let gameWon = document.getElementById("winner");
    let count = 0;
    //answer key
    let answer1 = document.getElementById("key1");
    let answer2 = document.getElementById("key2");
    let answer3 = document.getElementById("key3");
    let answer4 = document.getElementById("key4");
    //assert buttons
    let assert = document.getElementById("submit");
    let guess1 = document.getElementById("colorInput1");
    let guess2 = document.getElementById("colorInput2");
    let guess3 = document.getElementById("colorInput3");
    let guess4 = document.getElementById("colorInput4");
    // class selects
    let yourGuesses = document.getElementsByClassName("yourColor");
    let colorInputFields = document.getElementsByClassName("colorGuess");
    let redResponses = document.getElementsByClassName("outputRed");
    for(let i = 0; i < redResponses.length; i++){
        redResponses[i].style.color = "red";
    }
    let whiteResponses = document.getElementsByClassName("outputWhite");
    for(let i = 0; i < whiteResponses.length; i++){
        whiteResponses[i].style.color = "white";
    }
    //your inputs
    let firstC = document.getElementsByClassName("c1");
    let secondC = document.getElementsByClassName("c2");
    let thirdC = document.getElementsByClassName("c3");
    let fourthC = document.getElementsByClassName("c4");
    //response
    let begin = document.getElementById("start");
    let response1 = document.getElementById("one");
    let response1W = document.getElementById("oneWhite");
    let response2 = document.getElementById("two");
    let response2W = document.getElementById("twoWhite");
    let response3 = document.getElementById("three");
    let response3W = document.getElementById("threeWhite");
    let response4 = document.getElementById("four");
    let response4W = document.getElementById("fourWhite");
    let response5 = document.getElementById("five");
    let response5W = document.getElementById("fiveWhite");
    let response6 = document.getElementById("six");
    let response6W = document.getElementById("sixWhite");
    let response7 = document.getElementById("seven");
    let response7W = document.getElementById("sevenWhite");
    let response8 = document.getElementById("eight");
    let response8W = document.getElementById("eightWhite");
    let response9 = document.getElementById("nine");
    let response9W = document.getElementById("nineWhite");
    let response10 = document.getElementById("ten");
    let response10W = document.getElementById("tenWhite");
    let restart = document.getElementById("link");
    let newText = document.getElementById("textCycle1");
    let gameText = document.getElementById("textCycle2");
    let restartCount = 0;

    const reloadGame = function(restartCount){
        if(restartCount % 2 === 0){
            newText.style.color = "#ff2e00";
            gameText.style.color = "#fffaff";
        } else {
            newText.style.color = "#fffaff";
            gameText.style.color = "#ff2e00";
        }
        textRestart();
        for(let i = 0; i < colorInputFields.length; i++){
            colorInputFields[i].style.background = "#171717";
            colorInputFields[i].disabled = false;
        }
    }
    const textRestart = function(){
        hard = false;
        sequence = [];
        hardMode.disabled = false;
        newGame.disabled = false;
        gameWon.innerText = "";
        isHard.innerText = "";
        answer1.innerHTML = "--";
        answer2.innerHTML = "--";
        answer3.innerHTML = "--";
        answer4.innerHTML = "--";
        begin.innerText = "";
        hardMode.style.color = "#fffafb";
        hardMode.style.background = "#4d473d";
        newGame.style.color = "#fffafb";
        newGame.style.background = "#4d473d";
        for(let i = 0; i < redResponses.length; i++){
            redResponses[i].innerText = "";
        }
        for(let i = 0; i < whiteResponses.length; i++){
            whiteResponses[i].innerText = "";
        }
        for(let i = 0; i < yourGuesses.length; i++){
            yourGuesses[i].innerText = "..";
            yourGuesses[i].style.color = "#797b84";
        }
    }
    restart.addEventListener("click", function(){
        count = 0;
        reloadGame(restartCount);
        restartCount++;
    });

    newGame.addEventListener("click", function () {
        newGame.style.color = "#14bdeb";
        newGame.style.background = "#000000";
        if (hard) {
            for(let i = 0; i < 4; i++){
                let hardKey = Math.floor(Math.random() * hardColorKey.length - 1) + 1;
                sequence.push(hardColorKey[hardKey]);
            }
        } else {
            for(let i = 0; i < 4; i++){
                let key = Math.floor(Math.random() * colorKey.length - 1) + 1;
                sequence.push(colorKey[key]);
            }
        }
        begin.innerText = "Sequence Generated";
        newGame.disabled = true;
        done.addEventListener("click", function () {
            answer1.innerHTML = sequence[0];
            answer2.innerHTML = sequence[1];
            answer3.innerHTML = sequence[2];
            answer4.innerHTML = sequence[3];
            for(let i = 0; i < colorInputFields.length; i++){
                colorInputFields[i].style.background = "#000000";
                colorInputFields[i].disabled = true;
            }
        });
    });

    function reds(first, second, third, fourth, colorArr) {
        let rCRS = 0;
        if (first === colorArr[0]) {
            rCRS++;
            colorArr = colorArr.join(" ").replace(first, "").split(" ");
        }
        if (second === colorArr[1]) {
            rCRS++;
            colorArr = colorArr.join(" ").replace(second, "").split(" ");
        }
        if (third === colorArr[2]) {
            rCRS++;
            colorArr = colorArr.join(" ").replace(third, "").split(" ");
        }
        if (fourth === colorArr[3]) {
            rCRS++;
            colorArr = colorArr.join(" ").replace(fourth, "").split(" ");
        }
        if(rCRS === 4){
            won = true;
        }
        return rCRS + " Red ";
    }

    function whites(first, second, third, fourth, colorArr){
        let rCWS = 0;
        let firstIsRed = false;
        let secondIsRed = false;
        let thirdIsRed = false;
        let fourthIsRed = false;
        if(first === colorArr[0]){
            colorArr = colorArr.join(" ").replace(first, "").split(" ");
            firstIsRed = true;
        }
        if(second === colorArr[1]){
            colorArr = colorArr.join(" ").replace(second, "").split(" ");
            secondIsRed = true;
        }
        if(third === colorArr[2]){
            colorArr = colorArr.join(" ").replace(third, "").split(" ");
            thirdIsRed = true;
        }
        if(fourth === colorArr[3]){
            colorArr = colorArr.join(" ").replace(fourth, "").split(" ");
            fourthIsRed = true;
        }
        if((colorArr.indexOf(first) !== -1) && !firstIsRed){
            rCWS++;
            colorArr = colorArr.join(" ").replace(first, "").split(" ");
        }
        if((colorArr.indexOf(second) !== -1) && !secondIsRed){
            rCWS++;
            colorArr = colorArr.join(" ").replace(second, "").split(" ");
        }
        if((colorArr.indexOf(third) !== -1) && !thirdIsRed){
            rCWS++;
            colorArr = colorArr.join(" ").replace(third, "").split(" ");
        }
        if(colorArr.indexOf(fourth) !== -1 && !fourthIsRed){
            rCWS++;
            colorArr = colorArr.join(" ").replace(fourth, "").split(" ");
        }
        return rCWS + "White";
    }

    assert.addEventListener("click", function(){
        onClick(count);
        count++;
    });
    function onClick(){
        let newKey = sequence;
        let first = guess1.value.toLowerCase();
        let second = guess2.value.toLowerCase();
        let third = guess3.value.toLowerCase();
        let fourth = guess4.value.toLowerCase();
        if (count === 0) {
            response1.innerText = reds(first, second, third, fourth, newKey);
            response1W.innerText = whites(first, second, third, fourth, newKey);

        } else if (count === 1) {
            response2.innerText = reds(first, second, third, fourth, newKey);
            response2W.innerText = whites(first, second, third, fourth, newKey);

        } else if (count === 2) {
            response3.innerText = reds(first, second, third, fourth, newKey);
            response3W.innerText = whites(first, second, third, fourth, newKey);

        } else if (count === 3) {
            response4.innerText = reds(first, second, third, fourth, newKey);
            response4W.innerText = whites(first, second, third, fourth, newKey);

        } else if (count === 4) {
            response5.innerText = reds(first, second, third, fourth, newKey);
            response5W.innerText = whites(first, second, third, fourth, newKey);

        } else if (count === 5) {
            response6.innerText = reds(first, second, third, fourth, newKey);
            response6W.innerText = whites(first, second, third, fourth, newKey);

        } else if (count === 6) {
            response7.innerText = reds(first, second, third, fourth, newKey);
            response7W.innerText = whites(first, second, third, fourth, newKey);

        } else if (count === 7) {
            response8.innerText = reds(first, second, third, fourth, newKey);
            response8W.innerText = whites(first, second, third, fourth, newKey);

        } else if (count === 8) {
            response9.innerText = reds(first, second, third, fourth, newKey);
            response9W.innerText = whites(first, second, third, fourth, newKey);

        } else if (count === 9) {
            response10.innerText = reds(first, second, third, fourth, newKey);
            response10W.innerText = whites(first, second, third, fourth, newKey);
        }
        if(won){
            gameWon.innerText = "Winner!";
        }
        firstC[count].innerHTML = first;
        firstC[count].style.color = guess1.value;
        secondC[count].innerHTML = second;
        secondC[count].style.color = guess2.value;
        thirdC[count].innerHTML = third;
        thirdC[count].style.color = guess3.value;
        fourthC[count].innerHTML = fourth;
        fourthC[count].style.color = guess4.value;
    }
})()