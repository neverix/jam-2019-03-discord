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
        name: "food",
        question: "What is your favorite food?",
        answerPrefix: "My favorite food is ",
        answerPostfix: " .",
        humanAnswers: [
            "the banana",
            "chocolate",
            "cake",
            "the tomato",
            "pizza"
        ],
        vampireAnswers: [
            "blood"
        ]
    },
    {
        name: "color",
        question: "What is your favorite color?",
        answerPrefix: "My favorite color is  ",
        answerPostfix: " .",
        humanAnswers: [
            "black",
            'red',
            "blue",
            "white",
            "black",
            "yellow",
            "purple",
            "orange",
            "green",
            "brown"
        ],
        vampireAnswers: [
            "black",
            "red"
        ]
    }
]

export { Question, QuestionAnswer, questions }