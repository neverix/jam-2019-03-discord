import { sceneTransition, addOnSceneTransition, getScene } from "./scenes"
import { start } from "./game"
import { typeText, hideTextbox } from "./textbox"
import { fromEvent } from "rxjs"
import { take } from "rxjs/operators"

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
fromEvent(document,"mousemove").pipe(
    take(1)
).subscribe((e) => {
    const music = new Audio("../../res/music/main_menu.mp3")
    music.play()
})