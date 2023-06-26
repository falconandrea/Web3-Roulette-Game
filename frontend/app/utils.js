const redValues = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]
const blackValues = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35]
const evenValues = [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36]
const oddValues = [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35]

/**
 * Function that determines if the user has won
 */
const wonOrLost = (userChoice, resultNumber) => {
  if(userChoice.type === 'betNumber') {
    if(userChoice.value === resultNumber) return true
    else return false
  }
  else if(userChoice.type === 'betEvenOdd') {
    if(userChoice.value === 'EVEN' && evenValues.includes(resultNumber)) return true
    else if(userChoice.value === 'ODD' && oddValues.includes(resultNumber)) return true
    else return false
  }
  else if(userChoice.type === 'betOneThird') {
    if(userChoice.value === '1st 12' && resultNumber <= 12) return true
    else if(userChoice.value === '2nd 12' && (resultNumber >= 13 || resultNumber <= 24)) return true
    else if(userChoice.value === '3rd 12' && resultNumber >= 25) return true
    else return false
  }
  else if(userChoice.type === 'betHalf') {
    if(userChoice.value === '1-18' && resultNumber <= 18) return true
    else if(userChoice.value === '19-36' && resultNumber >= 19) return true
    else return false
  }
  else if(userChoice.type === 'betColor') {
    if(userChoice.value === 'Black' && blackValues.includes(resultNumber)) return true
    else if(userChoice.value === 'Red' && redValues.includes(resultNumber)) return true
    else return false
  }
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
