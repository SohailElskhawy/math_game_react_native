const generateAdditionQuestion = (score: number) => {
    // Smoother progression: every 500 points increases difficulty
    const level = Math.floor(score / 500);
    
    let min: number;
    let max: number;
    let allowCarryOver = false;
    
    if (level === 0) {
        // 0-499: Single digit, no carry
        min = 1;
        max = 9;
    } else if (level === 1) {
        // 500-999: Single digit with carry
        min = 5;
        max = 9;
        allowCarryOver = true;
    } else if (level === 2) {
        // 1000-1499: Mix of single and double digit
        min = 5;
        max = 25;
    } else if (level === 3) {
        // 1500-1999: Double digit
        min = 10;
        max = 50;
    } else if (level === 4) {
        // 2000-2499: Larger double digit
        min = 25;
        max = 75;
    } else {
        // 2500+: Large numbers
        min = 50;
        max = 99;
    }
    
    let num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    let num2 = Math.floor(Math.random() * (max - min + 1)) + min;
    
    // For early levels, sometimes force carry-over for variety
    if (level === 1 && allowCarryOver && Math.random() < 0.7) {
        // Ensure the ones place adds up to > 10
        const ones1 = num1 % 10;
        const ones2 = num2 % 10;
        if (ones1 + ones2 <= 10) {
            num2 = Math.floor(num2 / 10) * 10 + (11 - ones1);
        }
    }
    
    const question = `${num1} + ${num2}`;
    const answer = num1 + num2;
    const choices = generateSmartChoices(answer, 'addition');
    
    return { question, answer, choices };
};

const generateSubtractionQuestion = (score: number) => {
    const level = Math.floor(score / 500);
    
    let min: number;
    let max: number;
    
    if (level === 0) {
        min = 1;
        max = 10;
    } else if (level === 1) {
        min = 5;
        max = 20;
    } else if (level === 2) {
        min = 10;
        max = 35;
    } else if (level === 3) {
        min = 15;
        max = 60;
    } else if (level === 4) {
        min = 30;
        max = 80;
    } else {
        min = 50;
        max = 99;
    }
    
    let num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    let num2 = Math.floor(Math.random() * (max - min + 1)) + min;
    
    // Ensure num1 >= num2 for positive results
    if (num2 > num1) {
        [num1, num2] = [num2, num1];
    }
    
    // Sometimes add borrowing complexity for higher levels
    if (level >= 2 && Math.random() < 0.4) {
        // Force borrowing by making ones digit of minuend smaller
        const ones1 = num1 % 10;
        const ones2 = num2 % 10;
        if (ones1 >= ones2) {
            num2 = Math.floor(num2 / 10) * 10 + Math.min(9, ones1 + Math.floor(Math.random() * 3) + 1);
            if (num2 > num1) {
                num1 += 10;
            }
        }
    }
    
    const question = `${num1} - ${num2}`;
    const answer = num1 - num2;
    const choices = generateSmartChoices(answer, 'subtraction');
    
    return { question, answer, choices };
};

const generateMultiplicationQuestion = (score: number) => {
    const level = Math.floor(score / 400); // Slightly faster progression
    
    let num1: number;
    let num2: number;
    
    if (level === 0) {
        // 0-399: Times tables 1-5
        num1 = Math.floor(Math.random() * 5) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
    } else if (level === 1) {
        // 400-799: Times tables 1-10
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
    } else if (level === 2) {
        // 800-1199: Mix of easy and medium
        if (Math.random() < 0.7) {
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 12) + 1;
        } else {
            num1 = Math.floor(Math.random() * 8) + 11;
            num2 = Math.floor(Math.random() * 5) + 1;
        }
    } else if (level === 3) {
        // 1200-1599: Times tables up to 12
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
    } else {
        // 1600+: Larger numbers
        if (Math.random() < 0.6) {
            num1 = Math.floor(Math.random() * 15) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
        } else {
            num1 = Math.floor(Math.random() * 9) + 11;
            num2 = Math.floor(Math.random() * 9) + 11;
        }
    }
    
    const question = `${num1} × ${num2}`;
    const answer = num1 * num2;
    const choices = generateSmartChoices(answer, 'multiplication');
    
    return { question, answer, choices };
};

const generateDivisionQuestion = (score: number) => {
    const level = Math.floor(score / 400);
    
    let divisorMin: number;
    let divisorMax: number;
    let quotientMin: number;
    let quotientMax: number;
    
    if (level === 0) {
        // 0-399: Simple division
        divisorMin = 2;
        divisorMax = 5;
        quotientMin = 1;
        quotientMax = 10;
    } else if (level === 1) {
        // 400-799: Standard times tables
        divisorMin = 2;
        divisorMax = 10;
        quotientMin = 1;
        quotientMax = 10;
    } else if (level === 2) {
        // 800-1199: Slightly harder
        divisorMin = 2;
        divisorMax = 12;
        quotientMin = 1;
        quotientMax = 12;
    } else if (level === 3) {
        // 1200-1599: Mixed difficulty
        divisorMin = 3;
        divisorMax = 15;
        quotientMin = 2;
        quotientMax = 15;
    } else {
        // 1600+: Challenging
        divisorMin = 4;
        divisorMax = 20;
        quotientMin = 3;
        quotientMax = 20;
    }
    
    const divisor = Math.floor(Math.random() * (divisorMax - divisorMin + 1)) + divisorMin;
    const quotient = Math.floor(Math.random() * (quotientMax - quotientMin + 1)) + quotientMin;
    const dividend = divisor * quotient;
    
    const question = `${dividend} ÷ ${divisor}`;
    const answer = quotient;
    const choices = generateSmartChoices(answer, 'division');
    
    return { question, answer, choices };
};

const generateSmartChoices = (answer: number, operation: string) => {
    const choices: number[] = [answer];
    
    while (choices.length < 4) {
        let wrongAnswer: number;
        
        switch (operation) {
            case 'addition':
                // Common mistakes: off by 1, 10, or carrying errors
                const additionErrors = [
                    answer + 1,
                    answer - 1,
                    answer + 10,
                    answer - 10,
                    answer + Math.floor(Math.random() * 20) - 10
                ];
                wrongAnswer = additionErrors[Math.floor(Math.random() * additionErrors.length)];
                break;
                
            case 'subtraction':
                // Common mistakes: sign errors, borrowing errors
                const subtractionErrors = [
                    answer + 1,
                    answer - 1,
                    answer + 10,
                    Math.abs(answer - Math.floor(Math.random() * 10)),
                    answer + Math.floor(Math.random() * 15) - 5
                ];
                wrongAnswer = subtractionErrors[Math.floor(Math.random() * subtractionErrors.length)];
                break;
                
            case 'multiplication':
                // Common mistakes: times table confusion, off by one factor
                const multiplicationErrors = [
                    answer + Math.floor(answer / 10), // Add one group
                    answer - Math.floor(answer / 10), // Subtract one group
                    Math.floor(answer / 2), // Half the answer
                    answer * 2, // Double the answer
                    answer + Math.floor(Math.random() * Math.max(10, answer / 5))
                ];
                wrongAnswer = multiplicationErrors[Math.floor(Math.random() * multiplicationErrors.length)];
                break;
                
            case 'division':
                // Common mistakes: multiplication instead of division, off by factor
                const divisionErrors = [
                    answer + 1,
                    answer - 1,
                    answer * 2,
                    Math.floor(answer / 2) || 1,
                    answer + Math.floor(Math.random() * 8) - 4
                ];
                wrongAnswer = divisionErrors[Math.floor(Math.random() * divisionErrors.length)];
                break;
                
            case 'equation':
                // Common algebraic mistakes
                const equationErrors = [
                    answer + 1,
                    answer - 1,
                    answer * 2, // Forgot to divide
                    Math.floor(answer / 2) || 1, // Divided instead of multiplied
                    Math.abs(answer - Math.floor(Math.random() * 10)), // Sign error
                    answer + Math.floor(Math.random() * 12) - 6
                ];
                wrongAnswer = equationErrors[Math.floor(Math.random() * equationErrors.length)];
                break;
                
            default:
                wrongAnswer = Math.max(0, answer + Math.floor(Math.random() * 10) - 5);
        }
        
        // Ensure positive and unique
        wrongAnswer = Math.max(0, wrongAnswer);
        if (!choices.includes(wrongAnswer) && wrongAnswer !== answer) {
            choices.push(wrongAnswer);
        }
    }
    
    // Shuffle the choices
    for (let i = choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    
    return choices;
};

const generateEquationQuestion = (score: number) => {
    const level = Math.floor(score / 500);
    const variables = ['x', 'y', 'z'];
    const variable = variables[Math.floor(Math.random() * variables.length)];
    
    // Choose operation type
    const operations = level < 2 ? ['addition', 'subtraction'] : ['addition', 'subtraction', 'multiplication', 'division'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let question: string;
    let answer: number;
    
    switch (operation) {
        case 'addition':
            // Forms: x + a = b, a + x = b
            const addMin = level === 0 ? 1 : level === 1 ? 5 : level === 2 ? 10 : 15;
            const addMax = level === 0 ? 10 : level === 1 ? 20 : level === 2 ? 40 : 50;
            
            answer = Math.floor(Math.random() * (addMax - addMin + 1)) + addMin;
            const addend = Math.floor(Math.random() * Math.min(answer, addMax - addMin)) + 1;
            const result = answer + addend;
            
            if (Math.random() < 0.5) {
                question = `${variable} + ${addend} = ${result}`;
            } else {
                question = `${addend} + ${variable} = ${result}`;
            }
            break;
            
        case 'subtraction':
            // Forms: x - a = b, a - x = b
            const subMin = level === 0 ? 1 : level === 1 ? 5 : level === 2 ? 10 : 20;
            const subMax = level === 0 ? 15 : level === 1 ? 25 : level === 2 ? 50 : 75;
            
            if (Math.random() < 0.7) {
                // x - a = b (more common)
                const subtrahend = Math.floor(Math.random() * (subMax - subMin + 1)) + subMin;
                const difference = Math.floor(Math.random() * subtrahend) + 1;
                answer = subtrahend + difference;
                question = `${variable} - ${subtrahend} = ${difference}`;
            } else {
                // a - x = b (reverse subtraction)
                answer = Math.floor(Math.random() * (subMax - subMin + 1)) + subMin;
                const difference = Math.floor(Math.random() * answer) + 1;
                const minuend = answer + difference;
                question = `${minuend} - ${variable} = ${difference}`;
            }
            break;
            
        case 'multiplication':
            // Forms: x × a = b, a × x = b
            const multMin = level < 3 ? 1 : 1;
            const multMax = level < 3 ? 10 : 12;
            
            const factor = Math.floor(Math.random() * (multMax - multMin + 1)) + multMin;
            answer = Math.floor(Math.random() * (multMax - multMin + 1)) + multMin;
            const product = factor * answer;
            
            if (Math.random() < 0.5) {
                question = `${variable} × ${factor} = ${product}`;
            } else {
                question = `${factor} × ${variable} = ${product}`;
            }
            break;
            
        case 'division':
            // Forms: x ÷ a = b, a ÷ x = b
            const divMin = level < 4 ? 2 : 3;
            const divMax = level < 4 ? 10 : 15;
            
            if (Math.random() < 0.8) {
                // x ÷ a = b (more common)
                const divisor = Math.floor(Math.random() * (divMax - divMin + 1)) + divMin;
                const quotient = Math.floor(Math.random() * (divMax - divMin + 1)) + divMin;
                answer = divisor * quotient;
                question = `${variable} ÷ ${divisor} = ${quotient}`;
            } else {
                // a ÷ x = b (reverse division)
                answer = Math.floor(Math.random() * (divMax - divMin + 1)) + divMin;
                const quotient = Math.floor(Math.random() * (divMax - divMin + 1)) + divMin;
                const dividend = answer * quotient;
                question = `${dividend} ÷ ${variable} = ${quotient}`;
            }
            break;
            
        default:
            answer = 1;
            question = `${variable} + 0 = 1`;
    }
    
    const choices = generateSmartChoices(answer, 'equation');
    
    return { question , answer, choices, variable };
};

const generateRandomQuestions = (score: number): { question: string; answer: number; choices: number[] } | undefined => {
    // Weight the selection based on score to introduce operations gradually
    const level = Math.floor(score / 500);
    let modes: string[] = [];
    
    if (level === 0) {
        // 0-499: Mostly addition with some subtraction
        modes = ['addition', 'addition', 'addition', 'subtraction'];
    } else if (level === 1) {
        // 500-999: Add/subtract evenly, introduce equations
        modes = ['addition', 'subtraction', 'subtraction', 'equation'];
    } else if (level === 2) {
        // 1000-1499: Introduce multiplication and more equations
        modes = ['addition', 'subtraction', 'multiplication', 'equation'];
    } else if (level === 3) {
        // 1500-1999: More multiplication and equations
        modes = ['subtraction', 'multiplication', 'equation', 'equation'];
    } else if (level === 4) {
        // 2000-2499: Introduce division, keep equations
        modes = ['multiplication', 'division', 'equation', 'equation'];
    } else {
        // 2500+: All operations equally including equations
        modes = ['addition', 'subtraction', 'multiplication', 'division', 'equation', 'equation'];
    }
    
    const randomMode = modes[Math.floor(Math.random() * modes.length)];
    return generateQuestion(randomMode, score);
};

export const generateQuestion = (gameMode: string, score: number): { question: string; answer: number; choices: number[]; variable?: string } => {
    switch (gameMode) {
        case "addition":
            return generateAdditionQuestion(score);
        case "subtraction":
            return generateSubtractionQuestion(score);
        case "multiplication":
            return generateMultiplicationQuestion(score);
        case "division":
            return generateDivisionQuestion(score);
        case "equation":
            return generateEquationQuestion(score);
        case "random":
            return generateRandomQuestions(score) || { question: "", answer: 0, choices: [] };
        default:
            return { question: "", answer: 0, choices: [] };
    }
};