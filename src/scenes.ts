// the current scene
let currentScene: string
// things to do on scene transition
let onSceneTransition: { [scene: string]: () => void } = {}

// scene element
type SceneElement = HTMLDivElement

// add action on transition
function addOnSceneTransition(sceneTo: string, action: () => void) {
    onSceneTransition[sceneTo] = action
}

// switch to scene
function sceneTransition(sceneTo: string) {
    currentScene = sceneTo
    Array.from(document.getElementsByClassName("scene")).forEach(scene => {
        (scene as SceneElement).style.display = scene.id == currentScene ? "block" : "none"
    })
    let sceneTransitionFunction = onSceneTransition[sceneTo]
    if (sceneTransitionFunction) sceneTransitionFunction()
}

// get scene by name
function getScene(sceneName: string): SceneElement {
    let result: SceneElement
    Array.from(document.getElementsByClassName("scene")).forEach(scene => {
        if (scene.id == sceneName) {
            result = scene as SceneElement
        }
    })
    if (result) {
        return result
    } else {
        throw new Error(`Scene not found: ${sceneName}`)
    }
}

export { addOnSceneTransition, sceneTransition, getScene }