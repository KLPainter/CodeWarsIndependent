function knight(start, finish) {

    const numbers = '12345678';
    const letters = 'abcdefgh';
    const MAX = 10; // set maximum number of moves just in case

    let turnCount = 0;
    let currentTurnOptions = [start];
    let nextTurnOptions = [];

    while(turnCount <= MAX) {  // could set condition to 'while (true)' if no max is set
        if(currentTurnOptions.indexOf(finish) > -1) {
            return turnCount;
        } else {
            for(let i = 0; i < currentTurnOptions.length; i++) {
                nextTurnOptions = nextTurnOptions.concat(getOptions(currentTurnOptions[i]));
            }
            turnCount ++;
            currentTurnOptions = nextTurnOptions;
            nextTurnOptions = [];
        }
    }
    return 'solution not found in ' + MAX + ' moves';

    // return all possible single-move destinations for knight at position base
    function getOptions(base) {
        const letterIndex = letters.indexOf(base[0]);
        const numberIndex = numbers.indexOf(base[1]);
        const options = [
            letters[letterIndex + 1] + numbers[numberIndex + 2],
            letters[letterIndex + 1] + numbers[numberIndex - 2],
            letters[letterIndex + 2] + numbers[numberIndex + 1],
            letters[letterIndex + 2] + numbers[numberIndex - 1],
            letters[letterIndex - 1] + numbers[numberIndex + 2],
            letters[letterIndex - 1] + numbers[numberIndex - 2],
            letters[letterIndex - 2] + numbers[numberIndex + 1],
            letters[letterIndex - 2] + numbers[numberIndex - 1]
        ];
        return options.filter(el => el.length === 2);
    }

}

console.log (knight ('a3', 'b4'));