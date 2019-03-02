import { sceneTransition, addOnSceneTransition, getScene } from "./scenes"
import { start } from "./game"
import { typeText, hideTextbox } from "./textbox"

sceneTransition("menu")
addOnSceneTransition("game", () => {
    start(getScene("game"))
    // setTimeout(() => sceneTransition("menu"), 6000)
})

// add the sceneTransition() function to the window object so that it's accessible to outside scripts
// @ts-ignore black magic
window.sceneTransition = sceneTransition

addOnSceneTransition("intro", () => {
    typeText(`Hi`, [
        {
            text: "OK",
            onClick: () => {
                sceneTransition("game")
                hideTextbox()
            }
        }
    ])
})