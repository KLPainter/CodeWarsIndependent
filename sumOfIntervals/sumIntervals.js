function sumIntervals(intervals){

    const filteredIntervals = [];
  
    for(let i = 0; i < intervals.length; i++) {
        let pairHandled = false;

        for(let j = i + 1; j < intervals.length; j++) {

            // if x of current interval is in next interval, expand y of next interval
            if(intervals[i][0] >= intervals[j][0] && intervals[i][0] <= intervals[j][1]) {
                pairHandled = true;
                if(intervals[i][1] >= intervals[j][1]) {
                    intervals[j][1] = intervals[i][1];
                    break;
                }
            }

            // if y of current interval is in next interval, expand x of next interval
            if(intervals[i][1] >= intervals[j][0] && intervals[i][1] <= intervals[j][1]) {
                pairHandled = true;
                if(intervals[i][0] <= intervals[j][0]) {
                    intervals[j][0] = intervals[i][0];
                    break;
                }
            }

            // if current interval encompasses next interval, expand x and y of next interval
            if(intervals[i][0] <= intervals[j][0] && intervals[i][1] >= intervals[j][1]) {
                pairHandled = true;
                intervals[j] = intervals[i];
                break;
            }
        }

        if(pairHandled === false) {
            filteredIntervals.push(intervals[i]);
        }
    
    }

    return filteredIntervals.reduce(function(accumulator, currentValue) {
        return accumulator + (Math.abs(currentValue[1] - currentValue[0]));
    }, 0);
}

// console.log (sumIntervals ([[1, 20], [10, 20], [1, 6], [16, 19], [5, 11]]));


/*
describe('sumIntervals', function(){
  it('should return the correct sum for non overlapping intervals', function(){
    var test1 = [[1,5]];
    var test2 = [[1,5],[6,10]];
    Test.assertEquals(sumIntervals(test1), 4);
    Test.assertEquals(sumIntervals(test2), 8);
  });
  
  it('should return the correct sum for overlapping intervals', function(){
    var test1 = [[1,5],[1,5]];
    var test2 = [[1,4],[7, 10],[3, 5]];
    Test.assertEquals(sumIntervals(test1), 4);
    Test.assertEquals(sumIntervals(test2), 7);
  });
});
*/