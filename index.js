const inputs = Array.from(document.querySelectorAll('input'))
const wrap = document.querySelector('.wrap')
const numpad = document.querySelector('.numpad')

const onFocus = { id: 'cm', index: 0, value: '' }
const logic = { cm: { 1: 0.393701, 2: 0.0328084 }, inch: { 0: 2.54, 2: 0.0833333 }, foot: { 1: 12, 0: 30.48 } }
const calc = e => { for (const [key, operand] of Object.entries(logic[e.id])) inputs[key].value = +(e.value * operand).toFixed(3) }

const validate = e => {
  inputs[onFocus.index].focus()
  const inp = e.target.textContent
  const val = inputs[onFocus.index].value

  if (val === "0" && inp !== "." && inp !== "<") {
    inputs[onFocus.index].value = inp
  } else if (inp === '<') {
    inputs[onFocus.index].value = +val.slice(0, -1)
  } else if (inp === '.' && val.includes('.') || inp === '.' && val.length === 0) {
    return
  } else {
    inputs[onFocus.index].value += inp
  }

  onFocus.value = inputs[onFocus.index].value
  calc(onFocus)
}

inputs.forEach((el, i) => el.addEventListener('click', e => {
  e.stopPropagation()
  numpad.classList.remove('hidden')
  wrap.classList.add('moveUp')
  onFocus.id = e.target.id;
  onFocus.index = i
}))

const clearAll = () => { for (const input of inputs) input.value = '0' }

const numbersArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '<']
for (const val of numbersArr) numpad.innerHTML += `<p class="default-bg" onclick="validate(event)">${val}</p>`

const numbers = Array.from(document.querySelectorAll('.default-bg'));

numbers.forEach(el => el.addEventListener('touchstart', e => {
  e.target.classList.add('touch-bg')
  e.target.classList.remove('default-bg')
}))

numbers.forEach(el => el.addEventListener('touchend', e => {
  e.target.classList.remove('touch-bg')
  e.target.classList.add('default-bg')
}))

numpad.addEventListener('click', e => e.stopPropagation())

document.body.addEventListener('click', () => {
  numpad.classList.add('hidden')
  wrap.classList.remove('moveUp')
})

document.querySelector('.clear').addEventListener('touchstart', e => {
  e.target.classList.add('touch-bg')
})

document.querySelector('.clear').addEventListener('touchend', e => {
  e.target.classList.remove('touch-bg')
})