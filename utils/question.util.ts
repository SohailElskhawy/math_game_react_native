const generateAdditionQuestion = (score: number) => {
    let min: number;
    let max: number;

    if (score < 1000) {
        min = 0;
        max = 10;
    } else if (score < 2000) {
        min = 10;
        max = 30;
    } else if (score < 3000) {
        min = 30;
        max = 50;
    } else {
        min = 50;
        max = 99;
    }

    const num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    const num2 = Math.floor(Math.random() * (max - min + 1)) + min;

    const question = `${num1} + ${num2}`
    const answer = num1 + num2;
    const choices = generateChoices(answer)

    return { question, answer, choices }
}

const generateSubtractionQuestion = (score: number) => {
    let min: number;
    let max: number;

    if (score < 1000) {
        min = 0;
        max = 10;
    } else if (score < 2000) {
        min = 10;
        max = 30;
    } else if (score < 3000) {
        min = 30;
        max = 50;
    } else {
        min = 50;
        max = 99;
    }

    let num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    let num2 = Math.floor(Math.random() * (max - min + 1)) + min;
    
    if (num2 > num1) {
        [num1, num2] = [num2, num1];
    }
    
    const question = `${num1} - ${num2}`;
    const answer = num1 - num2;
    const choices = generateChoices(answer)

    return { question, answer, choices }
}

const generateMultiplicationQuestion = (score: number) => {
    let min: number;
    let max: number;

    if (score < 2000) {
        min = 1;
        max = 10;
    } else {
        min = 1;
        max = 20;
    }

    const num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    const num2 = Math.floor(Math.random() * (max - min + 1)) + min;

    const question = `${num1} x ${num2}`
    const answer = num1 * num2;
    const choices = generateChoices(answer)

    return { question, answer, choices }
}

const generateDivisionQuestion = (score: number) => {
    let min: number;
    let max: number;

    if (score < 2000) {
        min = 1;
        max = 10;
    } else {
        min = 1;
        max = 20;
    }

    const divisor = Math.floor(Math.random() * (max - min + 1)) + min;
    const quotient = Math.floor(Math.random() * (max - min + 1)) + min;
    const dividend = divisor * quotient;

    const question = `${dividend} ÷ ${divisor}`;
    const answer = quotient;
    const choices = generateChoices(answer);

    return { question, answer, choices };
}

const generateRandomQuestions = (score: number): { question: string; answer: number; choices: number[] } | undefined => {
    const modes = ['addition', 'subtraction', 'multiplication', 'division'];
    const randomMode = modes[Math.floor(Math.random() * modes.length)];
    return generateQuestion(randomMode, score);
}

const generateChoices = (answer: number) => {
    const choices: number[] = [answer];
    while (choices.length < 4) {
        const offset = Math.floor(Math.random() * 10) - 5;
        const wrongAnswer = Math.max(0, answer + offset);
        if (!choices.includes(wrongAnswer)) {
            choices.push(wrongAnswer);
        }
    }


    for (let i = choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [choices[i], choices[j]] = [choices[j], choices[i]];
    }

    return choices
}

export const generateQuestion = (gameMode: string, score: number) => {
    switch (gameMode) {
        case "addition":
            return generateAdditionQuestion(score);
        case "subtraction":
            return generateSubtractionQuestion(score);
        case "multiplication":
            return generateMultiplicationQuestion(score);
        case "division":
            return generateDivisionQuestion(score);
        case "random":
            return generateRandomQuestions(score);
        default:
            break;
    }
}
