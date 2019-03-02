import { html, render } from "lit-html"
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js'
import { fromEvent, Observable, Subscription } from "rxjs";
import {take} from "rxjs/operators"
import { Key } from "ts-keycode-enum";

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
    
    //write the entrie string when you press Enter
    const skipEvent = fromEvent(document, "keydown").pipe(
        take(1)
    ).subscribe((e: KeyboardEvent) => {
        if (e.which == Key.Enter) {
            //set up new events
            const subscription = setupSkippingButtonPress(buttons)

            //render the full text
            renderText(text, buttons.map(
                (val,index) => {
                    //change the first element, such as it unsubscribes on click
                    if (index == 0){
                        return {
                            text:val.text,
                            onClick: () => {
                                subscription.unsubscribe()
                                val.onClick()
                            }
                        }
                    }
                    return val
                }
            ))

            //clear the interval
            clearInterval(typerId)
        }
    })

    // create a new typer
    typerId = setInterval(() => typer(buttons, skipEvent), typerDelay)
}

//automatically run the first button
function setupSkippingButtonPress(buttons: Buttons): Subscription {
    const skipButtonPress = fromEvent(document, "keydown")
    
    //save the subscription in a variable to unsubscribe later
    const subscription = skipButtonPress.pipe(
        take(1)
    ).subscribe((e: KeyboardEvent) => {
        //run the onclick of the frst button
        if (e.which == Key.Enter) 
            buttons[0].onClick()
    })

    return subscription
}

// the typer types text to the textbox
function typer(buttons: Buttons, event: Subscription) {
    // check if the entire text has been written
    if (currentLetter >= sourceText.length) {
        //clear old event
        event.unsubscribe()
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