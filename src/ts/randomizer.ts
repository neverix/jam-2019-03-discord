function getRandomName(
    vowels: string[], consonants: string[], length: number, startsWithVowel = Math.random() > 0.5): string {
    // sequences that it will pick from
    const seq1 = startsWithVowel ? vowels : consonants
    const seq2 = startsWithVowel ? consonants : vowels
    // the name
    const name = []
    // generate letters
    for (let i = 0; i < length; i++) {
        // pick the sequence to choose from
        const seq = i % 2 ? seq1 : seq2
        // pick the next letter
        const nextLetter = seq[Math.floor(Math.random() * (seq.length - 1))]
        // add it to the name
        name.push(nextLetter)
    }
    // join the name so that it is a string
    return name.join('')
}

export { getRandomName }