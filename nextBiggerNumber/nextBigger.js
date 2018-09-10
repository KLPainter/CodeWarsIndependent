function nextBigger(n){
    let numbers = n.toString().split('');
    for(let index = numbers.length - 1; index >= 1; index--) {
        if(numbers[index] > numbers[index - 1]) {
            const indexFirstDecreasing = index - 1;
            const possibleValuesToMove = numbers.slice(indexFirstDecreasing)
                .filter(num => num > numbers[indexFirstDecreasing]);
            const valueToMove = Math.min (...possibleValuesToMove);
            const indexValueToMove = numbers.indexOf(valueToMove.toString(), indexFirstDecreasing);
            numbers.splice(indexValueToMove, 1);
            return parseInt(numbers.slice(0, indexFirstDecreasing)
                .concat(valueToMove,
                    numbers.slice(indexFirstDecreasing, numbers.length)
                        .sort())
                .join(''));
        }
    }
    return -1;
}