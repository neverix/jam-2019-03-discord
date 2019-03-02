import { html, render } from "lit-html"
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js'

// delay between typed characters
const typerDelay = 50

// the text currently being typed
let sourceText = ""
// the letter currently being typed
let currentLetter = 0
// the text in the textbox
let textboxText = ""
// id of the typer interval
let typerId: number
// type of the buttons
type Buttons = { text: string, onClick: () => void }[]

// the textbox container
let textboxDiv = document.getElementById("textbox-div")

// hides the textbox and hides it
function hideTextbox() {
    textboxDiv.style.display = "none"
}
hideTextbox()

const okButton = { text: "OK", onClick: () => hideTextbox() }

//start typing some text
function typeText(
    text: string,
    buttons: Buttons = [okButton]) {
    // clear the text
    textboxText = ''
    // reset the current letter
    currentLetter = 0
    // show textbox
    textboxDiv.style.display = "block"
    // set the target text
    sourceText = text
    // remove the typer if it exists
    if (typerId)
        clearInterval(typerId)
    // create a new typer
    typerId = setInterval(() => typer(buttons), typerDelay)
}

// the typer types text to the textbox
function typer(buttons: Buttons) {
    // check if the entire text has been written
    if (currentLetter >= sourceText.length) {
        // stop the typer
        clearInterval(typerId)
    } else {
        // copy the current letter from the source to the textbox
        let char = sourceText[currentLetter]
        textboxText += char
        // move the current letter
        currentLetter++
        // render the text
        renderText(textboxText, buttons)
    }
}

// renders the current text to the textbox
function renderText(textSoFar: string, buttons: Buttons) {
    render(

        html`
                <!-- the actual text -->
                <p>
                    ${unsafeHTML(textSoFar.split("\n").join("<br>"))}
                </p>
                <!-- buttons -->
                <!-- check if the text is completed -->
                ${textSoFar.length < sourceText.length ? "" : buttons.map(button => html`
                    <!-- create a button if it is -->
                    <a class=textbox-button href=# @click=${button.onClick}>
                        <!-- display the button text -->
                        ${button.text}
                    </a>`)
                }
            `
        , textboxDiv)
}

export { typeText, hideTextbox }