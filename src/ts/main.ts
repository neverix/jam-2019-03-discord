import { sceneTransition, addOnSceneTransition, getScene } from "./scenes"
import { start } from "./game"
import { typeText, hideTextbox } from "./textbox"
import { fromEvent } from "rxjs"
import { take } from "rxjs/operators"

//set up the first button
fromEvent(document.getElementById("play"), "click").pipe(
    take(1)
).subscribe((e) => sceneTransition("intro"))

addOnSceneTransition("game", () => {
    start(getScene("game"))
})

// add the sceneTransition() function to the window object so that it's accessible to outside scripts
// @ts-ignore black magic
window.sceneTransition = sceneTransition

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