import { sceneTransition, addOnSceneTransition, getScene } from "./scenes"
import { start } from "./game"
import { typeText, hideTextbox } from "./textbox"
import { fromEvent } from "rxjs";
import { take } from "rxjs/operators";

fromEvent(document.getElementById("play"),"click").pipe(
    take(1)
).subscribe((e) => sceneTransition("intro"))

// sceneTransition("menu")
addOnSceneTransition("game", () => {
    start(getScene("game"))
    // setTimeout(() => sceneTransition("menu"), 6000)
})

// add the sceneTransition() function to the window object so that it's accessible to outside scripts
// @ts-ignore black magic
window.sceneTransition = sceneTransition

addOnSceneTransition("intro", () => {
    typeText(`Hsdfsdfffffffffffffsssssadoisnpaeprghaep9rg8dhap9sidgfapdhas'9[edgh[OEFHI[Peh'[aep9hf[s9dfhgp[i`, [
        {
            text: "OK",
            onClick: () => {
                sceneTransition("game")
                hideTextbox()
            }
        }
    ])
})