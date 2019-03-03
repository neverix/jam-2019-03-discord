import { sceneTransition, addOnSceneTransition, getScene } from "./scenes"
import { start } from "./game"
import { typeText, hideTextbox } from "./textbox"
import { fromEvent, interval } from "rxjs"
import { take, throttle, withLatestFrom } from "rxjs/operators"
import { openFullscreen, closeFullscreen } from "./fullscreen";
import { Key } from "ts-keycode-enum";
import { audioFade } from "./audio-fade";

//keep trak of the size of the screen
let fullScreen = false

let voice = new Audio("../../res/music/voice.mp3")
voice.loop = true

let menuMusic: HTMLAudioElement
let introMusic = new Audio("../../res/music/intro.mp3")
introMusic.loop = true

//the icons
const fullScreenIcon = document.getElementById("fs-icon")
const fullScreenCloseIcon = document.getElementById("fs-exit-icon")

fromEvent(document.getElementById("full-screen-button"), "click").pipe(
    throttle(e => interval(300))
).subscribe(async (e) => {
    //toggle fulls creen
    fullScreen = !fullScreen

    //to log the result
    let result;

    //do the correct action and toggle the icons
    if (fullScreen) {
        result = await openFullscreen()
        fullScreenIcon.style.display = "none"
        fullScreenCloseIcon.style.display = "block"
    }
    else {
        fullScreenIcon.style.display = "block"
        fullScreenCloseIcon.style.display = "none"
        result = await closeFullscreen()
    }

    //log it
    console.log(result);
})

//change icon if toggled with esc
fromEvent(document, "fullscreenchange").subscribe(e => {
    if (!document.fullscreen && fullScreen) {
        fullScreen = false
        fullScreenIcon.style.display = "block"
        fullScreenCloseIcon.style.display = "none"
    }
})

//set up the first button
fromEvent(document.getElementById("play"), "click").pipe(
    take(1)
).subscribe((_e) => {
    sceneTransition("intro")
    voice.play()
    introMusic.play()
    introMusic.volume = 0
    audioFade(menuMusic, 30, 5000, 1, 0).then(
        val => menuMusic.pause()
    )
    setTimeout(() => {
        audioFade(introMusic, 100, 10000, 0, 1)
    }, 2000)
})

addOnSceneTransition("game", () => {
    start(getScene("game"))
})

addOnSceneTransition("intro", () => {
    typeText(`Welcome Mr.Jhonson!                                                     \n
            There is going to be a party at 6 o'clock`, [
            {
                text: "OK",
                onClick: () => {
                    typeText(`We were told that some vampires would be there                                   \n
                             Your job is to spot and kill them!`, [{
                            text: "OK",
                            onClick: () => {
                                continueConversation()
                            }
                        }])
                }
            }
        ])
})

const startGame = () => {
    sceneTransition("game")
    hideTextbox()
    voice.pause()
    audioFade(introMusic, 20, 2000, 1, 0).then(
        val => introMusic.pause()
    )
}

const continueConversation = () => {
    typeText(`There are some power issues in the area so the lights can sometimes go off...                           \n
            It happens cyclically, the visibility may be limited at times`, [{
            text: "OK",
            onClick: () => {
                typeText(`We allow you to use your automatic gun to murder the vampires (hold the right click pressed).                           \n
                    Just be careful and don't use it when the lights are on as to not atteact attention!`, [{
                        text: "OK",
                        onClick: startGame
                    }])
            }
        }])
}

// go to menu in the beginning
sceneTransition("menu")

//play music
fromEvent(document, "mousemove").pipe(
    take(1)
).subscribe((e) => {
    const music = new Audio("../../res/music/main_menu.mp3")
    music.loop = true
    music.play()

    menuMusic = music
})

fromEvent(document.getElementById("menu-button"), "click").subscribe(e => {
    window.location.reload(false);
})

fromEvent(document.getElementById("pewds"), "click").subscribe(e => {
    window.location.replace("https://www.youtube.com/user/PewDiePie?view_as=subscriber&sub_confirmation=1");
})

fromEvent(document.getElementById("github"), "click").subscribe(e => {
    window.location.replace("https://github.com/neverix/jam-2019-03-discord")
})

fromEvent(document.getElementById("end-pewds"), "click").subscribe(e => {
    window.location.replace("https://www.youtube.com/user/PewDiePie?view_as=subscriber&sub_confirmation=1");
})

fromEvent(document.getElementById("end-github"), "click").subscribe(e => {
    window.location.replace("https://github.com/neverix/jam-2019-03-discord")
})