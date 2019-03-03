import Vector from "../vector"
import { fromEvent, Observable, Subscription, interval, from } from "rxjs"
import { Key } from "ts-keycode-enum"
import Character from "./character"
import { throttle, timeout, take } from "rxjs/operators"
import { Bullet } from "./bullet"

import { typeText, hideTextbox, Buttons } from "../textbox"
import { questions, Question } from "../question"
import fade from "../fading"
import { html, render } from "lit-html";
import { sceneTransition } from "../scenes";
import { audioFade } from "../audio-fade";

declare function require<T>(file: string): T

let light: HTMLAudioElement | null = new Audio("../../../res/music/light.mp3")
let dark: HTMLAudioElement | null = new Audio("../../../res/music/dark.mp3")
light.volume = 0
dark.volume = 0
light.loop = true
dark.loop = true

let voice = new Audio("../../../res/music/voice.mp3")
voice.loop = true

// greetings the characters can say
const greetings = [
    "Hello!",
    "Howdy!",
    "¡Hola!",
    "G'day!",
    "Good evening!",
    "Hi bro!"
]

// reactions of the characters (e.g. questions they ask after the greeting)
const reactions = [
    "What do you want from me?",
    "Is that you, Detective? Wanna ask me something?",
    "Why are you here?",
    "You want something from me, don't you?"
]

//main player class
class Player {
    //paths to images
    paths: {
        [ley: string]: string
    } = {
            front: "../../../res/textures/front.png",
            left: "../../../res/textures/left.png",
            right: "../../../res/textures/right.png",
            back: "../../../res/textures/back.png"
        }

    //actual images
    textures: {
        front?: HTMLImageElement
        back?: HTMLImageElement
        left?: HTMLImageElement
        right?: HTMLImageElement
        [key: string]: HTMLImageElement
    } = {

        }
    //keep track of direction
    direction = new Vector(0, 0)

    //multiplied with the direction and delta to get the speed
    speedMultiplier = 0.3

    //remeber events
    subscriptions: Array<Subscription> = []

    //bullets per second
    bps: number = 3

    //remember if the mouse is or isnt pressed
    pressed = false

    //stores all bullets
    bullets: Array<Bullet> = []

    //remember last poition
    lastPosition = new Vector()

    //keep track of the time
    night = false

    //used to show the night time
    coverElement = document.getElementById("night")

    //time stamps
    lastTransition = performance.now()
    dayLength = 30000

    //effects
    cameraOffset = 0
    cameraStack = 0

    //remember last texture
    lastTexture: HTMLImageElement

    //x means normal and y vampire
    killed = new Vector()

    //number of days
    days = 0
    maxNumberOfDays = 8

    //audio
    fadeTime = 1000

    //only call gameOver once
    forceEnded = false

    //should a human die during the night?
    toKill = false

    //takes position ans size as arguments
    constructor(public position: Vector = new Vector(0, 0),
        public size: Vector = new Vector(100, 100),
        public enviromentSize: number) {

        this.lastTransition = performance.now()

        this.bindEvents()

        //setup shooting loop
        interval(1000 / this.bps).subscribe(e => {
            if (this.pressed) this.shoot(
                this.lastPosition
            )
        })

        //just for testing 
        fromEvent(document, "keydown").subscribe((e: KeyboardEvent) => {
            if (e.which == Key.Q)
                this.toggleTime()
            else if (e.which == Key.E)
                this.gameOver()
        })

        //load paths
        for (let i in this.paths) {
            this.textures[i] = new Image(100, 100)
            this.textures[i].src = this.paths[i]
        }

        //play music
        audioFade(light, 3000, 30, 0, 1)
    }

    removeEvents() {
        //cancel all subscriptions
        this.subscriptions.forEach((val) => val.unsubscribe())
        this.subscriptions = []

        //disable shooting
        this.pressed = false

        //reset direction
        this.direction = new Vector()
    }

    toggleTime() {
        //increase reactions
        this.days++

        if (this.days >= this.maxNumberOfDays) {
            this.gameOver()
            this.removeEvents()
            return false
        }

        //toggle time
        this.night = !this.night

        if (this.night) {
            audioFade(dark, this.fadeTime, 30, 0, 1)
            audioFade(light, this.fadeTime, 30, 1, 0)

            this.toKill = true
        }
        else {
            audioFade(dark, this.fadeTime, 30, 1, 0)
            audioFade(light, this.fadeTime, 30, 0, 1)
        }

        //change the display of the cover element
        if (this.night) this.coverElement.style.display = "block"
        else interval(2000).pipe(
            take(1)
        ).subscribe(
            e => this.coverElement.style.display = "none"
        )
        fade(this.coverElement, 1000, this.night, 20, this.night ? 0.5 : 0, this.night ? 0 : 0.5)
    }

    //call in constructor and after dialog
    bindEvents() {
        //set up events
        const keydown = fromEvent(document, "keydown").subscribe((e: KeyboardEvent) => {
            if (e.which == Key.A || e.which == Key.LeftArrow) this.direction.x = -1
            else if (e.which == Key.D || e.which == Key.RightArrow) this.direction.x = 1
            else if (e.which == Key.W || e.which == Key.UpArrow) this.direction.y = -1
            else if (e.which == Key.S || e.which == Key.DownArrow) this.direction.y = 1
        })
        const keyup = fromEvent(document, "keyup").subscribe((e: KeyboardEvent) => {
            if ((e.which == Key.A || e.which == Key.LeftArrow) && this.direction.x == -1) this.direction.x = 0
            else if ((e.which == Key.D || e.which == Key.RightArrow) && this.direction.x == 1) this.direction.x = 0
            else if ((e.which == Key.W || e.which == Key.UpArrow) && this.direction.y == -1) this.direction.y = 0
            else if ((e.which == Key.S || e.which == Key.DownArrow) && this.direction.y == 1) this.direction.y = 0
        })
        const mousedown = fromEvent(document, "mousedown").subscribe((e: MouseEvent) => {
            this.lastPosition = (new Vector(e.clientX, e.clientY))
                .sub(new Vector(window.innerWidth / 2, window.innerHeight / 2))
            this.pressed = true
        })
        const mouseup = fromEvent(document, "mouseup").subscribe(e => {
            this.pressed = false
        })
        const mousemove = fromEvent(document, "mousemove").subscribe((e: MouseEvent) => {
            this.lastPosition = (new Vector(e.clientX, e.clientY))
                .sub(new Vector(window.innerWidth / 2, window.innerHeight / 2))
        })

        //save subscriptions
        this.subscriptions.push(keydown, keyup, mousedown, mousemove, mouseup)
    }

    //shoots
    shoot(delta: Vector) {
        if (!this.night) return
        this.bullets.push(new Bullet(this.position.add(this.size.div(2)), delta.norm(), this.enviromentSize))

        //paly sfx
        const sfx = new Audio("../../../res/music/gun.mp3")
        sfx.play()

        //add effects
        this.cameraOffset = 10
        this.cameraStack++;
        setTimeout(() => {
            if (--this.cameraStack == 0)
                this.cameraOffset = 0
        }, 300)
    }

    //delta passed from mainloops update
    update(delta: number) {
        //decide what part of the day it is
        if (this.subscriptions.length > 0 && performance.now() - this.lastTransition >= this.dayLength) {
            this.lastTransition = performance.now()
            this.toggleTime()
        }

        //moves the player
        this.position = this.position.add(this.direction.mul(delta * this.speedMultiplier))

        //keep the object in the world
        if (this.position.x < -this.enviromentSize) this.position.x = -this.enviromentSize
        else if (this.position.x + this.size.x > this.enviromentSize) this.position.x = this.enviromentSize - this.size.x
        if (this.position.y < -this.enviromentSize) this.position.y = -this.enviromentSize
        else if (this.position.y + this.size.y > this.enviromentSize) this.position.y = this.enviromentSize - this.size.y

        //update bullets
        this.bullets.forEach(val => val.update(delta))

        //remove destroyed bullets
        for (let i = 0; i < this.bullets.length; i++)
            if (this.bullets[i].destroyed)
                this.bullets.splice(i, 1)
    }
    //draws
    draw(ctx: CanvasRenderingContext2D) {
        //placeholder for art
        //also , do u know any way to make spread operator (...) work in ts?
        let texture = this.lastTexture;
        if (this.direction.y == 1) texture = this.textures.front
        else if (this.direction.y == -1) texture = this.textures.back
        else if (this.direction.x == 1) texture = this.textures.right
        else if (this.direction.x == -1) texture = this.textures.left
        else if (!texture) texture = this.textures.back

        this.lastTexture = texture

        ctx.drawImage(texture, this.position.x, this.position.y, this.size.x, this.size.y)

        //draw bullets
        this.bullets.forEach(val => val.draw(ctx))
    }
    // used by characters to notify the player that a collision occured
    notifyCharacterCollision(character: Character, collision: Vector) {
        // "push" the player out of the character
        this.position = this.position.add(collision)

        //disable talkng if its night
        if (this.night) return

        //cancel all subscriptions
        this.subscriptions.forEach((val) => val.unsubscribe())
        this.subscriptions = []

        //disable shooting
        this.pressed = false

        //reset direction
        this.direction = new Vector()

        // i prefer the short form :)
        const { floor, random } = Math

        //add sound
        voice.play()

        // pick a random greeting and a reaction
        const greeting = greetings[floor(random() * greetings.length)]
        const reaction = reactions[floor(random() * reactions.length)]
        // concatenate them to get a full greeting
        const fullGreeting = `${greeting}\n${reaction}`

        // the "leave" button
        const leave = () => {
            hideTextbox()
            this.bindEvents()

            //stop sounds
            voice.pause()
        }

        // gets buttons for the textbox
        const getButtons = () => character.getButtonsLeft(leave, onButtonClick)

        // action on button click
        const onButtonClick = (question: Question) => {
            // add the question to the answered ones
            character.answeredQuestions.add(question.name)
            // get the question answer
            const questionAnswer = character.questionAnswers[question.name]
            // type the question answer
            typeText(
                question.answerPrefix + questionAnswer.answer + question.answerPostfix,
                getButtons())
        }

        console.log(character.isVampire);


        // greet the detective
        typeText(fullGreeting, getButtons())
    }

    //check for damage
    checkBulletCollisions(objects: Array<Character>) {
        //check for ending
        if (objects.length == 0 && !this.forceEnded) {
            this.forceEnded = true
            this.gameOver()
            return;
        }
        //kill
        if (this.toKill) {
            for (let i = 0; i < objects.length; i++) {
                if (!objects[i].isVampire && this.toKill) {
                    objects.splice(i, 1)
                    this.toKill = false
                }
            }
            this.toKill = false
        }

        //iterate trought all objects and bullets
        for (let i of objects) {
            for (let j of this.bullets) {
                if (i.position.add(i.size.div(2)).sub(j.position).len <= i.size.div(2).len + j.radius) {
                    j.destroyed = true
                    objects.splice(objects.indexOf(i), 1)
                    if (i.isVampire)
                        this.killed.y++
                    else
                        this.killed.x++
                    //play sound
                    const sfx = new Audio("../../../res/music/human.wav")
                    sfx.play()

                    //add effects
                    this.cameraOffset = 10
                    this.cameraStack++;
                    setTimeout(() => {
                        if (--this.cameraStack == 0)
                            this.cameraOffset = 0
                    }, 100)
                }
            }
        }
    }

    gameOver() {
        hideTextbox()
        if (this.night) {
            audioFade(dark, 20, 2000, 1, 0).then(
                val => dark.pause()
            )
            light.pause()
        }
        else {
            audioFade(light, 20, 2000, 1, 0).then(
                val => light.pause()
            )
            dark.pause()
        }

        //audio
        const end = new Audio("../../../res/music/final.mp3")
        audioFade(end, 20, 2000, 0, 1).then(
            val => {
                setTimeout(() => {
                    audioFade(end, 20, 2000, 1, 0).then(
                        val => {
                            dark.pause()
                            const bgDark = new Audio(dark.src)
                            bgDark.volume = 0.1
                            bgDark.play()

                            light = null
                            dark = null
                        }
                    )
                }, 2000)
            }
        )

        const template = (alive: number, killed: Vector) => html`
            <div class="button">Vampires killed: ${killed.y}</div>
            <div class="button">Humans killed: ${killed.x}</div>
            <div class="button">Accuracy: ${100 * killed.y / (killed.x + killed.y)}%</div>
        `
        const parent = document.getElementById("stat-parent")
        parent.style.display = "block"
        parent.style.zIndex = `${10 ** 9}`

        document.getElementById("game-over").style.display = "block"

        sceneTransition("game-over")

        render(template(2, this.killed), parent)
        // fade(document.getElementById("game-over"), 2000, true, 20, 1, 0)
    }
}

export { Player }