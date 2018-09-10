function validateBattlefield(field) {
    const fleet = [];
    for(let row = 0; row < 10; row++) {
        for(let column = 0; column < 10; column++) {
            if(field[row][column] === 1) {
                if(!isInFleet(row, column, fleet)) {
                    let ship = findWholeShip (row, column, field);
                    if(isTouchingAnother(ship, field)) return false;
                    fleet.push(ship);
                }
            }
        }
    }
    return isValidFleet(fleet);
}

function findWholeShip(row, column, field) {
    const ship = [];
    let isVertical = field[row + 1][column] === 1;

    for(let value = field[row][column]; value === 1; value = field[row][column]) {
        ship.push([row, column]);
        if(isVertical) row++; else column++;
    }
    return ship;
}

function isInFleet(row, column, fleet) {
    for(const ship of fleet) {
        for(const cell of ship) {
            if(cell[0] === row && cell[1] === column) return true;
        }
    }
    return false;
}

// a valid fleet contains 10 ships of specific lengths
function isValidFleet(fleet) {
    const targetFleetSize = 10;
    const targetFleetLengths = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
    if(fleet.length != targetFleetSize) return false;

    fleet.sort(function(a, b) {
        return a.length - b.length;
    });

    for(let i = 0; i < targetFleetSize; i++) {
        if(targetFleetLengths[i] != fleet[i].length) return false;
    }
    return true;
}

function isTouchingAnother(ship, field) {
    const shipLength = ship.length;
    let filledCellCount = 0;

    const minRow = Math.max(ship[0][0] - 1, 0);
    const maxRow = Math.min(ship[shipLength - 1][0] + 1, 9);
    const minColumn = Math.max(ship[0][1] - 1, 0);
    const maxColumn = Math.min(ship[shipLength - 1][1] + 1, 9);

    for(let x = minRow; x <= maxRow; x++) {
        for(let y = minColumn; y <= maxColumn; y++) {
            if(field[x][y] === 1) filledCellCount ++;
        }
    }
    return filledCellCount !== shipLength;
}