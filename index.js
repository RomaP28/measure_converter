const inputs = Array.from(document.querySelectorAll('input'))
const wrap = document.querySelector('.wrap')
const numpad = document.querySelector('.numpad')

const inputInfo = { id: 'cm', index: 0, value: '' }
const logic = { cm: { 1: 0.393701, 2: 0.0328084 }, inch: { 0: 2.54, 2: 0.0833333 }, foot: { 1: 12, 0: 30.48 } }
const calc = e => { for (const [key, operand] of Object.entries(logic[e.id])) inputs[key].value = +(e.value * operand).toFixed(3) }

const numberClick = e => {
  const num = e.target.textContent
  inputs[inputInfo.index].focus()
  if (num === '.' && inputs[inputInfo.index].value.includes('.') || num === '.' && inputs[inputInfo.index].value.length === 0) return
  num === '<' ? inputs[inputInfo.index].value = inputs[inputInfo.index].value.slice(0, -1) : inputs[inputInfo.index].value += num
  inputInfo.value = inputs[inputInfo.index].value
  calc(inputInfo)
}

const clearAll = () => { for (const input of inputs) input.value = '' }

document.body.addEventListener('click', () => {
  numpad.classList.add('hidden')
  wrap.classList.remove('moveUp')
})

inputs.forEach((el, i) => el.addEventListener('click', e => {
  e.stopPropagation()
  numpad.classList.remove('hidden')
  wrap.classList.add('moveUp')
  inputInfo.id = e.target.id;
  inputInfo.index = i
}))

numpad.addEventListener('click', e => e.stopPropagation())

for (let i = 1; i < 10; i++) numpad.innerHTML += `<p onclick="numberClick(event)">${i}</p>`

numpad.innerHTML += `<p onclick="numberClick(event)">.</p><p onclick="numberClick(event)">0</p><p onclick="numberClick(event)"><</p>`

const buttons = Array.from(document.querySelectorAll('p'));
console.log(buttons)

buttons.forEach(el => el.addEventListener('touchstart', e => {
  e.target.classList.add('touch')
}))
buttons.forEach(el => el.addEventListener('touchend', e => {
  e.target.classList.remove('touch')
}))