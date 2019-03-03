import Vector from "../vector"
import { fromEvent, Observable, Subscription } from "rxjs"
import { Key } from "ts-keycode-enum"
import Character from "./character"
import { typeText, hideTextbox, Buttons } from "../textbox"
import { questions, Question } from "../question";

// greetings the characters can say
const greetings = [
    "Hello!",
    "Howdy!",
    "¡Hola!",
    "G'day!",
    "Good evening!"
]

// reactions of the characters (e.g. questions they ask after the greeting)
const reactions = [
    "What do you want from me?",
    "Is that you, Detective? Wanna ask me something?",
    "Why are you here?"
]

//main player class
class Player {
    //keep track of direction
    direction = new Vector(0, 0)

    //multiplied with the direction and delta to get the speed
    speedMultiplier = 0.3

    events: Array<Observable<Event>> = []
    subscriptions: Array<Subscription> = []

    //takes position ans size as arguments
    constructor(public position: Vector = new Vector(0, 0),
        public size: Vector = new Vector(100, 100),
        public enviromentSize: number) {

        this.bindEvents()
    }

    //call in constructor and after dialog
    bindEvents() {
        //set up events
        const keydown = fromEvent(document, "keydown")
        const keydownSubscrption = keydown.subscribe((e: KeyboardEvent) => {
            if (e.which == Key.A || e.which == Key.LeftArrow) this.direction.x = -1
            else if (e.which == Key.D || e.which == Key.RightArrow) this.direction.x = 1
            else if (e.which == Key.W || e.which == Key.UpArrow) this.direction.y = -1
            else if (e.which == Key.S || e.which == Key.DownArrow) this.direction.y = 1
        })
        const keyup = fromEvent(document, "keyup")
        const keyupsubscription = keyup.subscribe((e: KeyboardEvent) => {
            if ((e.which == Key.A || e.which == Key.LeftArrow) && this.direction.x == -1) this.direction.x = 0
            else if ((e.which == Key.D || e.which == Key.RightArrow) && this.direction.x == 1) this.direction.x = 0
            else if ((e.which == Key.W || e.which == Key.UpArrow) && this.direction.y == -1) this.direction.y = 0
            else if ((e.which == Key.S || e.which == Key.DownArrow) && this.direction.y == 1) this.direction.y = 0
        })

        //save events and subscriptions
        this.events.push(keyup, keydown)
        this.subscriptions.push(keydownSubscrption, keyupsubscription)
    }

    //delta passed from mainloops update
    update(delta: number) {
        //moves the player
        this.position = this.position.add(this.direction.mul(delta * this.speedMultiplier))

        //keep the object in the world
        if (this.position.x < -this.enviromentSize) this.position.x = -this.enviromentSize
        else if (this.position.x + this.size.x > this.enviromentSize) this.position.x = this.enviromentSize - this.size.x
        if (this.position.y < -this.enviromentSize) this.position.y = -this.enviromentSize
        else if (this.position.y + this.size.y > this.enviromentSize) this.position.y = this.enviromentSize - this.size.y
    }
    //draws
    draw(ctx: CanvasRenderingContext2D) {
        //placeholder for art
        //also , do u know any way to make spread operator (...) work in ts?
        ctx.fillStyle = "orange"
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y)
    }
    // used by characters to notify the player that a collision occured
    notifyCharacterCollision(character: Character, collision: Vector) {
        //cancel all subscriptions
        this.subscriptions.forEach((val) => val.unsubscribe())
        this.subscriptions = []
        this.events = []

        //reset direction
        this.direction = new Vector()

        // "push" the player out of the character
        this.position = this.position.add(collision)

        //TODO: display textbox and call bindEvents after finishing
        // i prefer the short form :)
        const { floor, random } = Math

        // pick a random greeting and a reaction
        const greeting = greetings[floor(random() * greetings.length)]
        const reaction = reactions[floor(random() * reactions.length)]
        // concatenate them to get a full greeting
        const fullGreeting = `${greeting}\n${reaction}`

        // the "leave" button
        const leave = () => {
            hideTextbox()
            this.bindEvents()
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

        // greet the detective
        typeText(fullGreeting, getButtons())
    }
}

export { Player }