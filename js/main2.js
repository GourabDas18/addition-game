let bar = null;
let cloud = null;
let audioElement = null;
let coinElement = null;
let pufferElement = null;
let fullScreenElement = null;
let newCoin = [];
let pufferfish=[]
let gameEnd = false;
let nextStageLoading = false;
let gameScreenListFlower = [];
let gameScreen = null;
let endButton = null;
let logo = null;
let currentGameScreenFlower = 0;
let congrats = null;
let wrongSelect = false;
let gameoverMusic = null;
var fishClassList = [];
var weego = new Audio('./speech/wee-go.mp3');
let playwego=true;
//logo load
let logoImg = new Image();
logoImg.src = "./btn/logo.png";
logoImg.onload = () => {
    logo = logoImg;
}

// START SCREEN LOAD

// let img = new Image();
// img.src = "./BG.jpg";
// img.onload = () => {
//     gameScreen = img;
// }

// END SCREEN LOAD
let img2 = new Image();
img2.src = "./btn/game_end_1.png";
img2.onload = () => {
    endButton = img2;
}



let clear = 0;
//QUESTION 
const ques = [
    {
        'head': 'How many party hats are left?',
        'body': {
            type: "ice",
            total: [10, 5]
        },
        // 'body': [
        //     '🍦 🍦 🍦 🍦 🍦 🍦 🍦 + 7',
        //     '🍦 🍦 🍦 🍦 🍦 + 5'
        // ],
        'subBody': ['= ?']
    },
    {
        'head': 'How many candies are left?',
        'body': {
            type: "cake",
            total: [9, 6]
        },

        'subBody': ['= ?']
    },
    {
        'head': 'How many apples are left?',
        'body': {
            type: "grape",
            total: [11, 5]
        },

        'subBody': ['= ?']
    }
]
//QUESTION AUDIO
const audioQuestion = ['./speech/How many ice creams .mp3', './speech/How many cakes are t.mp3', './speech/How many graphes are.mp3']
const ans = [5, 3, 6]
const fishNo = [[11, 10, 8, 12], [16, 18, 11, 13], [25, 21, 23, 22]]
const allLoad = setInterval(() => {
    //fishImageList.length==120 &&
    if ( fishImageList.length == 120 && stage && barImgList.length == 60 && cloud && coinImg && audioImg && gameScreenList.length == 90 &&  logo && congratsImgList.length == 77 && board && board2 && ice && cake && grape && pufferImg) {
        clearInterval(allLoad);

        //play button add
        const btn = document.createElement('button')
        btn.onclick = () => {
            bg_music1.play();
            bg_music2.play()
            document.querySelector('button').style.display = 'none';
            congrats = new Congrats(congratsImgList);
            start = true;
            clicked = true;
            setTimeout(() => {
                new Audio("./speech/How many ice creams .mp3").play()
            }, 500);
            setTimeout(() => { clicked = false }, 6000)
        }
        document.body.appendChild(btn)

        bar = new BAR(barImgList, canvas.width * 0.93, canvas.height * 0.35);
        audioElement = new AUDIO(audioImg, canvas.width * 0.02, canvas.height * 0.02, true);
        
        fullScreenElement = new FullScreen(screenImg, canvas.width * 0.08, canvas.height * 0.02, true);
        coinElement = new COIN(coinImg, canvas.width * 0.9, canvas.height * 0.02);  
        pufferElement = new PUFFER(pufferImg, canvas.width * 0.9, canvas.height * 0.1);  
        animation();
    }
}, 1000)


//CLOUD CLASS AND IMAGE LOAD

class Cloud {
    constructor(img, x, y, w, h, text) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text
    }

    draw() {
        if (this.y < 0) this.y += 2;
        ctx.drawImage(this.img, this.x, this.y, canvas.width, canvas.height);
        ctx.font = "40px Arial";
        if (ques[clear]) {
            newCoin.length == 0 && !nextStageLoading && ctx.fillText(this.text, clear == 0 ? this.x + 380 : this.x + 400, this.y + 55)
           
            
        }
    }
}

const imgCloud = new Image();
imgCloud.src = './btn/cloud.png';
imgCloud.onload = () => {
    cloud = new Cloud(imgCloud, 0, -50, canvas.width, canvas.height, ques[clear].head);
}

// MAIN ANIMATION 
const animation = () => {

    setTimeout(() => {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //stage drwing
        if (stage) {
            stage.bg1 = getGameScreenLoad();
            // stage.bg3 = getGameScreenLoadFlower();
            stage.create();
        }

        if (!start) {

            ctx.beginPath()
            ctx.font = `90px Kavoon`;
            ctx.fillStyle = "white";
            ctx.fillText("Substraction Game", canvas.width * 0.28, canvas.height * 0.35)
            ctx.closePath()
            ctx.fillStyle = "black";
            if (fishClassList.length == 0) {
                allfishList.forEach(e => {
                    let fishgroup = [];
                    e.forEach(f => {
                        console.log(":add fish")
                        fishgroup.push(
                            new fish(
                                fishImageList,
                                f.x,
                                f.posx,
                                f.y,
                                f.w,
                                f.h,
                                f.text,
                                f.move,
                                f.isHovered
                            )
                        )

                    });
                    fishClassList.push(fishgroup)
                })
            }


        }


        if (start) {

            //CLOUD AND QUESTION
            cloud.draw()
            // fish ANIMATION ------
            // for (let i = 0; i < 4; i++) {
            //     if (clear < 3) {
            //         const f = allfishList[clear][i];
            //         f.text = fishNo[clear][i]
            //         if (newCoin.length == 0 && !nextStageLoading && f.x > f.posx) f.x -= canvas.width * 0.01;
            //         if (newCoin.length > 0) {
            //             f.x -= canvas.width * 0.05;
            //         }
            //         // f.imgIndex++;
            //         // if (f.imgIndex > 59) { f.imgIndex = 0 }

            //         new fish(
            //             fishImageList[f.imgIndex],
            //             f.x,
            //             f.y,
            //             f.w,
            //             f.h,
            //             f.text,
            //             f.move,
            //             f.isHovered
            //         ).update();
            //     }
            // }


            fishClassList[clear]?.forEach(e => {
             
                if (newCoin.length == 0 && !nextStageLoading && e.x >= e.posx) {
                    e.x -= canvas.width * 0.01;
                    e.cx -= canvas.width * 0.01;
                }
            
                // Move faster if there are new coins
                if (newCoin.length > 0) {
                    e.x -= canvas.width * 0.05;
                    e.cx -= canvas.width * 0.05;
                    if(playwego){
                        playwego=false;
                        setTimeout(()=>{playwego=true},3000);
                        weego.play()
                    }
                }
                e.update();
            
                // console.log("After movement:", e.x);
                // console.log( (newCoin.length == 0 && !nextStageLoading && e.x > e.posx))
            })


            bar.draw();
            audioElement.draw();
            fullScreenElement.draw();
            coinElement.draw();
            pufferElement.draw();

            //NEW COIN ANIMATION
            newCoin.forEach(each => {
                if (each.x == each.posX && each.y == each.posY) {
                    totalCoin += 5;
                    newCoin = [];
                } else {
                    each.update()
                }
            });
            pufferfish.forEach(each => {
                if (each.x == each.posX && each.y == each.posY) {
                    totalPuffer += 5;
                    pufferfish = [];
                } else {
                    each.update()
                }
            });

            // BOX ANIMATION
            if (ques[clear]) {
                newCoin.length == 0 && !nextStageLoading && new MAIN_BOX(
                    ques[clear].body,
                    clear == 2 ? canvas.width * 0.12 : canvas.width * 0.2,
                    clear > 0 ? canvas.height * 0.22 : canvas.height * 0.3,
                    clear == 2 ? canvas.width * 0.63 : canvas.width * 0.52,
                    clear > 0 ? canvas.height * 0.34 : canvas.height * 0.25,
                    board,
                    board2
                ).draw()
                newCoin.length == 0 && !nextStageLoading && new BOX(
                    ques[clear].subBody,
                    clear == 2 ? canvas.width * 0.3 + canvas.width * 0.45 : canvas.width * 0.32 + canvas.width * 0.4,
                    clear > 0 ? canvas.height * 0.172 + canvas.height * 0.15 : canvas.height * 0.26 + canvas.height * 0.1,
                    150,
                    100,
                    board,
                    board2
                ).draw()
            }


            //GAMEEND
            if (gameEnd && endButton) {
                congrats.draw()
                ctx.drawImage(endButton, canvas.width * 0.48, canvas.height * 0.72, 120, 120)
                bg_music2.pause();
                if (!gameoverMusic) {
                    gameoverMusic = new Audio('./speech/congrats.mp3');
                    gameoverMusic.play()
                }
                const rect = canvas.getBoundingClientRect(); // Mouse X position relative to canvas
                // const mouseX = ((event.clientX / window.innerWidth)* canvas.width) // Mouse X position relative to canvas
                // const mouseY = ((event.clientY / window.innerHeight)* canvas.height);  // Mouse Y position relative to canvas

                const mouseX = (Math.random() * window.innerWidth - rect.left) * (canvas.width / rect.width); // Adjust for scaling
                const mouseY = (Math.random() * window.innerHeight - rect.top) * (canvas.height / rect.height);

                // addBubble(mouseX, mouseY, bubble); // Create a bubble at mouse position
                // canCreateBubble = false; // Disable bubble creation
                // // Re-enable bubble creation after 2 seconds
                // setTimeout(() => {
                //     canCreateBubble = true;
                // }, 400);


            }

            // // Bubble load
            // bubbles.forEach((bubble, index) => {
            //     bubble.update();
            //     bubble.draw();

            //     if (bubble.isFaded()) {
            //         bubbles.splice(index, 1); // Remove faded bubbles
            //     }
            // });

        }
        ctx.drawImage(logo, canvas.width * 0.93, canvas.height * 0.88, 60, 60)
        ctx.beginPath();
        ctx.fillStyle = "#d74138"
        ctx.font = "170px Kavoon";
        wrongSelect && ctx.fillText("Wrong", canvas.width * 0.3, canvas.height * 0.5)
        ctx.fillStyle = "black"
        ctx.closePath()
        requestAnimationFrame(animation)
    }, 1000 / 32);
}

//bubble creator
canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect(); 
    const mouseX = (event.clientX - rect.left) * (canvas.width / rect.width); // Adjust for scaling
        const mouseY = (event.clientY - rect.top) * (canvas.height / rect.height);
    // if (canCreateBubble && !gameEnd) {
    //     // Get mouse position relative to the canvas
    //     const rect = canvas.getBoundingClientRect(); // Mouse X position relative to canvas
    
    //     const mouseX = (event.clientX - rect.left) * (canvas.width / rect.width); // Adjust for scaling
    //     const mouseY = (event.clientY - rect.top) * (canvas.height / rect.height);

    //     addBubble(mouseX, mouseY, bubble); // Create a bubble at mouse position
    //     canCreateBubble = false; // Disable bubble creation
    //     // Re-enable bubble creation after 2 seconds
    //     setTimeout(() => {
    //         canCreateBubble = true;
    //     }, 100);
    // }

    if(!gameEnd){
        let hover = false;
        fishClassList[clear]?.forEach(e => {
            e.isHovered(mouseX,mouseY);
            if(e.hover && !hover){
                hover=true;
                
            }
        })
        if(hover){
            document.body.style.cursor="pointer"

        }else{
            document.body.style.cursor="default"

        }
    }
  
});

// Onclick on canvas
canvas.onclick = (e) => {
    const rect = canvas.getBoundingClientRect(); // Mouse X position relative to canvas
    
    const mouseX = (event.clientX - rect.left) * (canvas.width / rect.width); // Adjust for scaling
    const mouseY = (event.clientY - rect.top) * (canvas.height / rect.height);

    
    //Audio click check
    audioElement.isClicked(mouseX, mouseY);
    fullScreenElement.isClicked(mouseX, mouseY);
    // console.log(e.clientY, canvas.getBoundingClientRect().y, y, canvas.height * 0.6, canvas.height * 0.6 + 100)


    if (clicked) return;
    const x = e.clientX - canvas.getBoundingClientRect().x;
    const y = e.clientY - canvas.getBoundingClientRect().y;


    //End button click
    if (gameEnd) {
        let endBtnX = (canvas.width * 0.48 / canvas.width) * canvas.getBoundingClientRect().width;
        let endBtnW = (120 / canvas.width) * canvas.getBoundingClientRect().width;
        let endBtnY = (canvas.height * 0.72 / canvas.height) * canvas.getBoundingClientRect().height;
        let endBtnH = (120 / canvas.width) * canvas.getBoundingClientRect().width;
        if (x > endBtnX && x < endBtnX + endBtnW && y > endBtnY && y < endBtnY + endBtnH) {
            window.location.reload();
        }

    }


   


    //fish click check
    fishClassList[clear]?.forEach((each, index) => {
        // let eachX = (each.x / canvas.width) * canvas.getBoundingClientRect().width;
        // let eachW = (each.w / canvas.width) * canvas.getBoundingClientRect().width;
        // let eachY = (each.y / canvas.height) * canvas.getBoundingClientRect().height;
        // let eachH = (each.h / canvas.width) * canvas.getBoundingClientRect().width;
        // console.log(y,each.y,each.y+canvas.width*0.15)
        // if (eachX < x && eachX + eachW > x && eachY < y && eachY + eachH > y && !clicked) {
        if (each.isClicked(mouseX,mouseY) && !clicked) {
            console.log("click")
            fishClassList[clear].forEach(each => each.move = true);
            if (parseInt(each.text) == ans[clear]) {
                clicked = true;
                setTimeout(() => { clicked = false }, 10000)
                ques[clear].subBody = [`= ${ans[clear]}`];

                //You are correct audio playing
                new Audio('./speech/success.mp3').play();

                setTimeout(() => {
                    if (ques[clear + 1]) {
                        cloud.y = -200;
                        cloud.text = ques[clear + 1]?.head
                    }
                    newCoin.push(new ADD_COIN(coinImg, canvas.width * 0.9, canvas.height * 0.02));
                    
                    nextStageLoading = true;
                    // CLOUD PUSHING UP ON LEVEL COMPLETE
                    setTimeout(() => {
                        clear += 1;

                        nextStageLoading = false;
                        if (clear == 3) gameEnd = true;
                        setTimeout(() => {
                            if (audioQuestion[clear]) {
                                new Audio(audioQuestion[clear]).play()
                                setTimeout(() => { clicked = false }, 6000)
                            }
                        }, 1500)
                    }, 2500);
                }, 3000)

                bar.index += 20;

                new Audio('./speech/It is perfect.mp3').play();


            } else {
                clicked = true;
                new Audio('./speech/wrong.mp3').play();
                setTimeout(() => {
                    new Audio('./speech/It is wrong Try agai.mp3').play();
                    wrongSelect = true;
                    pufferfish.push(new ADD_PUFFER(pufferImg, canvas.width * 0.9, canvas.height * 0.1));
                    setTimeout(() => { wrongSelect = false; clicked = false }, 2800)

                    // setTimeout(() => {
                    //     new Audio(audioQuestion[clear]).play();
                    // }, 2500);
                }, 500);
            }

        }
    })

}