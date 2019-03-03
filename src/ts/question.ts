interface Question {
    name: string
    question: string
    answerPrefix: string
    answerPostfix: string
    humanAnswers: string[]
    vampireAnswers: string[]
}

interface QuestionAnswer {
    question: string
    answer: string
    isVampireAnswer: boolean
}

// all questions that can be asked
const questions: Question[] = [
    {
        name: "age",
        question: "How old are you?",
        answerPrefix: "I'm ",
        answerPostfix: " years old.",
        humanAnswers: [
            "10",
            "35",
            "23",
            "49",
            "67",
            "38",
            "27"
        ],
        vampireAnswers: [
            "666",
            "231",
            "420",
            "169",
            "398",
            "339",
            "938"
        ]
    },
    {
        name: "place",
        question: "Where do you live?",
        answerPrefix: "I live in ",
        answerPostfix: ".",
        humanAnswers: [
            "a flat",
            "a house",
            "the streets",
            "a hotel"
        ],
        vampireAnswers: [
            "a castle",
            "a dark dungeon"
        ]
    },
    {
        name: "food",
        question: "What is your favourite food?",
        answerPrefix: "I like eating ",
        answerPostfix: ".",
        humanAnswers: [
            "apples",
            "oranges",
            "chicken",
            "beef",
            "pork",
            "hamburegers",
            "pizza"
        ],
        vampireAnswers: [
            "human blood"
        ]
    },
    {
        name: "color",
        question: "What is your favourite color?",
        answerPrefix: "My favourite color is ",
        answerPostfix: ".",
        humanAnswers: [
            "orange",
            "blue",
            "green",
            "white",
            "pink",
            "cyan",
            "magenta",
            "yellow",
            "red"
        ],
        vampireAnswers: [
            "dark, dark red",
            "black! The blackest of black"
        ]
    }
]

export { Question, QuestionAnswer, questions }