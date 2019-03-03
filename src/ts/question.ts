interface Question {
    name: string
    question: string
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
    }
]

export { Question, QuestionAnswer, questions }