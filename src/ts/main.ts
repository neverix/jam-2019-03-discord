import { sceneTransition, addOnSceneTransition, getScene } from "./scenes"
import { start } from "./game"

sceneTransition("menu")
addOnSceneTransition("game", () => {
    start(getScene("game"))
    setTimeout(() => sceneTransition("menu"), 10000)
})

// @ts-ignore black magic
window.sceneTransition = sceneTransition