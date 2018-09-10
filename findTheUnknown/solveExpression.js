function solveExpression(exp) {

    const posOrNegNumber = /-?[0-9\?]*/;
    const answer = exp.split('=')[1];
    const operand1 = exp.match(posOrNegNumber)[0];
    const operator = exp[operand1.length];
    const operand2 = exp.slice(operand1.length + 1, exp.indexOf('='));
    const expression = [operand1, operator, operand2, answer];

    const allQuestionMarks = /\?/g;
    for(let test = 0; test <= 9; test++) {
    // don't test zero if zero would be the first (but not only) digit of any of the numbers
        if(test === 0 && expression.some(str => str[0] === '?' && str.length > 1)) continue;
        // don't test a number that is already used in the expression
        if(expression.some (str => str.includes(test))) continue;
        let testExp = expression.map(str => str.replace(allQuestionMarks, test.toString()))
                                .map(str => isNaN(parseInt(str)) ? str : parseInt(str));
        if(isCorrect(testExp)) return test;
    }
    return -1;

    function isCorrect(expression) {
        switch(expression[1]) {
            case'+':
                return expression[0] + expression[2] === expression[3];
            case'-':
                return expression[0] - expression[2] === expression[3];
            case'*':
                return expression[0] * expression[2] === expression[3];
        }
    }
}