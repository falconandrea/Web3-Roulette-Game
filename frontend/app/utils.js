const redValues = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]
const blackValues = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35]
const evenValues = [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36]
const oddValues = [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35]

/**
 * Function that determines if the user has won
 */
const wonOrLost = (userChoice, resultNumber) => {
  const { type, value } = userChoice;
  switch (type) {
    case 'betNumber':
      return value === resultNumber;
    case 'betEvenOdd':
      if (value === 1) {
        return evenValues.includes(resultNumber);
      } else if (value === 0) {
        return oddValues.includes(resultNumber);
      }
      break;
    case 'betOneThird':
      if (value === 1) {
        return resultNumber <= 12;
      } else if (value === 2) {
        return resultNumber >= 13 && resultNumber <= 24;
      } else if (value === 3) {
        return resultNumber >= 25;
      }
      break;
    case 'betHalf':
      if (value === 1) {
        return resultNumber <= 18;
      } else if (value === 2) {
        return resultNumber >= 19;
      }
      break;
    case 'betColor':
      if (value === 1) {
        return blackValues.includes(resultNumber);
      } else if (value === 0) {
        return redValues.includes(resultNumber);
      }
      break;
    default:
      return false;
  }
  return false;
}

/**
 * Function that creates an object with the info to call the contract,
 * based on the choice made by the user on the table
 */
const createBetObject = (selected) => {
  let betObject = {}
  if(selected) {
    if(selected === 'EVEN' || selected === 'ODD') {
      betObject = {
        type: 'betEvenOdd',
        value: selected === 'EVEN' ? 1 : 0,
        moltiplicator: 2,
      }
    }
    else if(selected === '1st 12' || selected === '2nd 12' || selected === '3rd 12') {
      betObject = {
        type: 'betOneThird',
        value: selected === '1st 12' ? 1 : (selected === '2nd 12' ? 2 : 3),
        moltiplicator: 3,
      }
    }
    else if(selected === '1-18' || selected === '19-36') {
      betObject = {
        type: 'betHalf',
        value: selected === '1-18' ? 1 : 2,
        moltiplicator: 2,
      }
    }
    else if(selected === 'Black' || selected === 'Red') {
      betObject = {
        type: 'betColor',
        value: selected === 'Black' ? 1 : 0,
        moltiplicator: 2,
      }
    }
    else {
      betObject = {
        type: 'betNumber',
        value: parseInt(selected),
        moltiplicator: 35,
      }
    }
  }
  return betObject
}


export { redValues, blackValues, evenValues, oddValues, createBetObject, wonOrLost }
