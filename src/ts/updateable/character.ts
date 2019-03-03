import Vector from "../vector"
import { getRandomName } from "../randomizer";
import { Player } from "./player"
import { rectCollision } from "../collision";
import { QuestionAnswer, questions } from "../question";

export default class Character {
    // position of the character
    position: Vector
    // name. you can modify the vowels and consonants to make it sound differently
    name: string
    //used to generate the name length
    randomFactor: number = 6
    // is this character a vampire?
    isVampire: boolean
    // answers to questions
    questionAnswers: { [question: string]: QuestionAnswer } = {}

    constructor(worldSize: number, public size: Vector, private player: Player) {
        //i like to have the short form
        const { floor, random } = Math

        // position the character randomly
        this.position = new Vector(
            -worldSize + size.x + random() * (worldSize - size.x) * 2,
            -worldSize + size.y + random() * (worldSize - size.y) * 2)

        // generate name
        this.name = getRandomName(
            "euioa".split(''),
            "typsdfgklzcvbnm".split(''),
            5 + floor(random() * this.randomFactor) - this.randomFactor / 2)

        // generate "vampirity"
        this.isVampire = random() < 0.5

        // generate answers to the questions
        const answers: QuestionAnswer[] = questions.map(question => {
            const answerSet = this.isVampire ? question.vampireAnswers : question.humanAnswers
            const answer = answerSet[floor(random() * answerSet.length)]
            return {
                question: question.name,
                answer,
                isVampireAnswer: this.isVampire
            }
        })
        // assign the answers
        for (let answer of answers) {
            this.questionAnswers[answer.question] = answer
        }
    }

    // update the character's state
    update(delta: number) {
        // check for collision with a player
        const collision = rectCollision(this.position, this.player.position, this.size, this.player.size)
        if (collision) {
            this.player.notifyCharacterCollision(this, collision)
        }
    }

    // draw the character
    draw(ctx: CanvasRenderingContext2D) {
        // placeholder art
        ctx.fillStyle = "red"
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y)

        //display name
        ctx.fillStyle = "black"
        ctx.font = "Impact"
        ctx.textAlign = "center"
        ctx.fillText(this.name, this.position.x + this.size.x / 2, this.position.y - this.size.y / 3, this.size.x)
    }
}