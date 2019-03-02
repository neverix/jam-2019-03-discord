import fade from './fading'

// length of the fade in milliseconds
const fadeLength = 500
// length of a fading frame in milliseconds
const fadeFrameLength = 20

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
    // the last scene
    const lastScene = currentScene
    // the current scene
    currentScene = sceneTo
    Array.from(document.getElementsByClassName("scene")).forEach(s => {
        // cast to SceneElement
        const scene = s as SceneElement
        // check if it is the scene that we're currently switching to
        const isCurrentScene = scene.id == currentScene
        // check if it is the scene we're removing
        const isLastScene = scene.id == lastScene

        // move the current scene to the top
        scene.style.zIndex = isCurrentScene ? '10000' : '0'
        // hide if not last or current scene
        scene.style.display = isCurrentScene || isLastScene ? 'block' : 'none'

        // set up fade
        fade(scene, fadeLength, isCurrentScene, fadeFrameLength).then(() => {
            // hide after fade finishes if not current scene
            if (isLastScene || !isCurrentScene) {
                scene.style.display = 'none'
            }
        })

        // run the transition function if current scene
        if (isCurrentScene) {
            let sceneTransitionFunction = onSceneTransition[sceneTo]
            if (sceneTransitionFunction) sceneTransitionFunction()
        }
    })
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