import { sceneTransition, addOnSceneTransition, getScene } from "./scenes"
import { start } from "./game"
import { typeText, hideTextbox } from "./textbox"
import { fromEvent, interval } from "rxjs"
import { take, throttle, withLatestFrom } from "rxjs/operators"
import { openFullscreen, closeFullscreen } from "./fullscreen";

//keep trak of the size of the screen
let fullScreen = false
fromEvent(document.getElementById("full-screen-button"),"click").pipe(
    throttle(e => interval(300))
).subscribe(async (e) => {
    //toggle fulls creen
    fullScreen = !fullScreen

    //to log the result
    let result;

    //do the correct action
    if (fullScreen)
        result = await openFullscreen()
    else 
        result = await closeFullscreen()

    //log it
    console.log(result);
})

//set up the first button
fromEvent(document.getElementById("play"), "click").pipe(
    take(1)
).subscribe((_e) => sceneTransition("intro"))

addOnSceneTransition("game", () => {
    start(getScene("game"))
})

addOnSceneTransition("intro", () => {
    typeText(`yoyoyoyo gangsta`, [
        {
            text: "OK",
            onClick: () => {
                sceneTransition("game")
                hideTextbox()
            }
        }
    ])
})

// go to menu in the beginning
sceneTransition("menu")

//play music
fromEvent(document, "mousemove").pipe(
    take(1)
).subscribe((e) => {
    const music = new Audio("../../res/music/main_menu.mp3")
    music.loop = true
    music.play()
})