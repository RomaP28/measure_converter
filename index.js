const inputFields = Array.from(document.querySelectorAll('input'))
const wrap = document.querySelector('.wrap')
const numpad = document.querySelector('.numpad')
const inputEventInfo = { id: 'cm', index: 0, value: '' }
const logic = { cm: { 1: 0.393701, 2: 0.0328084 }, inch: { 0: 2.54, 2: 0.0833333 }, foot: { 1: 12, 0: 30.48 } }
const calc = e => { for (const [key, operand] of Object.entries(logic[e.id])) inputFields[key].value = +(e.value * operand).toFixed(3) }
const numberClick = e => {
  inputFields[inputEventInfo.index].value += e.target.textContent
  inputEventInfo.value = inputFields[inputEventInfo.index].value
  calc(inputEventInfo)
}
const backSpace = () => {
  inputFields[inputEventInfo.index].value = inputFields[inputEventInfo.index].value.slice(0, -1)
  inputEventInfo.value = inputFields[inputEventInfo.index].value
  calc(inputEventInfo)
}
const clearAll = () => {
  for (const input of inputFields) input.value = ''
}

document.body.addEventListener('click', () => {
  numpad.classList.add('hidden')
  wrap.classList.remove('moveUp')
})

inputFields.forEach((el, i) => el.addEventListener('focus', e => {
  e.stopPropagation()
  numpad.classList.remove('hidden')
  wrap.classList.add('moveUp')
  inputEventInfo.id = e.target.id;
  inputEventInfo.index = i
}))

inputFields.forEach(el => el.addEventListener('click', e => {
  e.stopPropagation()
  numpad.classList.remove('hidden')
  wrap.classList.add('moveUp')
  inputEventInfo.id = e.target.id;
  inputEventInfo.index = i
}))


numpad.addEventListener('click', e => {
  e.stopPropagation()
})
for (let i = 1; i < 10; i++)
  numpad.innerHTML += `<p onclick="numberClick(event)">${i}</p>`

numpad.innerHTML += `<p onclick="backSpace()"><</p><p onclick="numberClick(event)">0</p><p onclick="numberClick(event)">.</p>`