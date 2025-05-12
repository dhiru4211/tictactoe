let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#rst-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;//player X , player Y

//this is how we made the vector of vectors
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        }
        else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();

}

const checkWinner = () => {
    let cnt = 0;
    for (pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 != "") 
        {
            if (pos1 === pos2 && pos2 === pos3) 
            {
                console.log("Hurray!!! You are the Winner", pos1);
                showWinner(pos1);
                return;
            }
        }

        //check for the all boxes are filled and the no winner is come up
        let isDraw = true;
        boxes.forEach((box) => {
            if (box.innerText === "") 
            {
                isDraw = false;
            }
        });

        if (isDraw) {
            msg.innerText = "Game is Drawn!";
            msgContainer.classList.remove("hide");
            disableBoxes();
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);