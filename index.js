const inputFields = Array.from(document.querySelectorAll('input'))
const logic = { cm: { 1: 0.393701, 2: 0.0328084 }, inch: { 0: 2.54, 2: 0.0833333 }, foot: { 1: 12, 0: 30.48 } }
const calc = e => { for (const [key, operand] of Object.entries(logic[e.target.id])) inputFields[key].value = +(e.target.value * operand).toFixed(3) }
const clearAll = () => { for (const input of inputFields) input.value = '' }