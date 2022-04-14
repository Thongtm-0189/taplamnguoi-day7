const audioKill = new Audio ("bokudan.mp3")
const gameover = new Audio ("game-over_vbLTv8N.mp3")
const gametheme = new Audio ("jeopardy-theme-lowq.mp3")
const gamewin = new Audio ("congratulations-you-won.mp3")

const content = document.getElementById("content")

const main = document.getElementById("main")

const get_point = document.getElementById("con")

const gameStart_btn = document.getElementById("gamestart-btn") 
var width  
var height 

setInterval(()=>{
    width = content.clientWidth
    height = content.clientHeight
},100)

console.log(width)
/* count item */
let count = 0
/* count point */
let point = 100
//<ion-icon name="bug"></ion-icon>

/* click to start game */
gameStart_btn.addEventListener('click',startGame)

function startGame()
    {   gametheme.loop = true
        gametheme.play()
        const loopMain = setInterval(gameStart,400)
        gameStart_btn.style.display = "none"
        /* loop game */
        function gameStart(){
            /* randdom position of duck */
            const newDiv = document.createElement("div")
            newDiv.classList.add("sub")
            newDiv.innerHTML = "<ion-icon name='bug'></ion-icon>"

            content.appendChild(newDiv)
            if(count>=0){
                document.getElementsByClassName("sub")[count].style.top = Math.floor(Math.random()*(height - 25)/* + (Math.floor(Math.random()*height)) */ )+"px"
                document.getElementsByClassName("sub")[count].style.left = Math.floor(Math.random()*(width - 25) /* + (Math.floor(Math.random()*width)) */ )+"px"
            }
            count++
            console.log(count)
            /* get point to shot duck */
            newDiv.addEventListener('click',removeItem)
            function removeItem(e){
                const choice = e.target
                choice.remove()
                audioKill.play()
                const newDiv = document.createElement("div")
                newDiv.classList.add("sub")
                newDiv.innerHTML = "<ion-icon name='bug'></ion-icon>"
                count--
                point-=2
                get_point.style.height = point+"%" 
            }

            /* gameover */
            if(count==30){
                count=0
                point=100
                get_point.style.height = point+"%" 
                gameover.play()
                gametheme.pause()
                /* game over */
                const endGame = document.createElement("div")
                endGame.classList.add("gameover")
                endGame.textContent="GAME OVER"
                content.appendChild(endGame)
                clearInterval(loopMain)
                document.querySelectorAll(".sub").forEach(resub => {
                    resub.remove()
                });
                /* reset button */
                const reset = document.createElement("div")
                endGame.appendChild(reset)
                reset.innerHTML = "<button id='reset'>RESET</button>"
                document.getElementById("reset").addEventListener('click',resetGame)
                function resetGame(){
                    endGame.remove()
                    startGame()
                }
            }else if(point==0){
                count=0
                point=100
                get_point.style.height = point+"%" 
                gamewin.play()
                gametheme.pause()
                /* WINNING */
                const endGame = document.createElement("div")
                endGame.classList.add("gameover")
                endGame.textContent="!!!YOU WIN!!!"
                content.appendChild(endGame)
                clearInterval(loopMain)
                document.querySelectorAll(".sub").forEach(resub => {
                    resub.remove()
                });
                /* reset button */
                const reset = document.createElement("div")
                endGame.appendChild(reset)
                reset.innerHTML = "<button id='reset'>RESET</button>"
                document.getElementById("reset").addEventListener('click',resetGame)
                function resetGame(){
                    endGame.remove()
                    startGame()
                }
            }
        }
    }
