function createReport(namesAndCounts){

    const separateNameAndCount = /^(.+)\s+(\d+)$/;
  
    // a map that will iterate alphabetically by bird name
    let birdsMap = new Map();
    birdsMap[Symbol.iterator] = function* () {
        yield* [...this.entries()].sort();
    };

    for(let index in namesAndCounts) {

        let bird = new Object;
        let parsed = separateNameAndCount.exec(namesAndCounts[index]);  // returns first (only) match
        bird.name = parsed[1].trim().toUpperCase();
        bird.count = +parsed[2];
        if(bird.name === 'LABRADOR DUCK') { return ['Disqualified data'];}
        convertBirdName(bird);

        if(birdsMap.has(bird.name)) {
            birdsMap.set (bird.name, birdsMap.get(bird.name) + bird.count);
        } else {
            birdsMap.set (bird.name, bird.count);
        }

    }

    let results = [];
    for(let [key, value] of birdsMap) {
        results.push(key);
        results.push(value);
    }
    return results;

}

function convertBirdName(bird) {
    const splitNameIntoWords = /([\w']+)[$\s|-]*/g;  //words separated by whitespace or hyphens
    const birdWords = bird.name.match(splitNameIntoWords); // returns all matches
    switch(birdWords.length) {
        case 1:
            bird.name = birdWords[0].substring(0, 6);
            break;
        case 2:
            bird.name = birdWords[0].substring(0, 3)
                + birdWords[1].substring(0, 3);
            break;
        case 3:
            bird.name = birdWords[0].substring(0, 2)
                + birdWords[1].substring(0, 2)
                + birdWords[2].substring(0, 2);
            break;
        case 4:
            bird.name = birdWords[0].substring(0, 1)
                + birdWords[1].substring(0, 1)
                + birdWords[2].substring(0, 2)
                + birdWords[3].substring(0, 2);
            break;
    }
}