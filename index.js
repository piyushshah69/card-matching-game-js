const container = document.getElementById('container')
const cardNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]


let firstClick = true
let clickedImgNum;
let numberOfSolved = 0;

const shuffle = () => {
    cardNumbers.sort(() => Math.random() - 0.5);
}; 


const start = () => {
    shuffle();
    for (i = 0; i < cardNumbers.length; i++){
        const newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'card')
        newDiv.dataset.cardId = cardNumbers[i];
        newDiv.innerHTML = `<img src ="images/${cardNumbers[i]}.jpeg">`
        container.append(newDiv);
    }
    handleClick()
}

const handleClick = () => {
    const imageDivs = container.querySelectorAll('.card');
    imageDivs.forEach(element => {
        element.addEventListener('click', () => {
            if (firstClick) {
                clickedImgNum = element.dataset.cardId;
                element.firstChild.style.opacity = 1
                firstClick = false
                element.style.pointerEvents = 'none'
                return;
            } else {
                if (clickedImgNum == element.dataset.cardId) {
                    element.firstChild.style.opacity = 1
                    setTimeout(() => {
                        numberOfSolved++;
                        firstClick = true
                        clickedImgNum = new Number;
                    }, 0)
                    setTimeout(() => {
                        if (numberOfSolved == cardNumbers.length / 2) {
                            reset()
                        }
                    }, 500)
                } else {
                    element.firstChild.style.opacity = 1
                    container.style.pointerEvents = 'none'
                    setTimeout(() => {
                        imageDivs.forEach(element => {
                            if (clickedImgNum == element.dataset.cardId) {
                                element.firstChild.style.opacity = 0;
                                element.style.pointerEvents = 'auto'
                            } else null;
                        })
                        element.firstChild.style.opacity = 0
                        firstClick = true;
                        clickedImgNum = new Number
                        container.style.pointerEvents = 'auto'
                    }, 1000)
                }
            }
        })
    });
}

const reset = () => {
    alert("Congratulations, you've succesfully completed the game");
    alert("Restart with the new one");
    container.innerHTML = '';
    firstClick = true;
    clickedImgNum = new Number;
    numberOfSolved = 0;
    start();
}

start()

