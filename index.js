const inputCM = document.querySelector('.cm')
const inputINCH = document.querySelector('.inch')
const inputFOOT = document.querySelector('.foot')
const clear = document.querySelector('.clear')


// inputFields.forEach(e => e.addEventListener('click', (e) => {
//   e.target.value = ''
// }))
// console.log(document.querySelectorAll('input'))
// console.log(close)

clear.addEventListener('click', () => {
  inputCM.value = ''
  inputINCH.value = ''
  inputFOOT.value = ''
})

inputCM.addEventListener('input', () => {
  inputINCH.value = +(inputCM.value / 2.54).toFixed(3)
  inputFOOT.value = +(inputCM.value * 0.0328084).toFixed(3)
})

inputINCH.addEventListener('input', () => {
  inputCM.value = +(inputINCH.value * 2.54).toFixed(3)
  inputFOOT.value = +(inputINCH.value / 12).toFixed(3)
})

inputFOOT.addEventListener('input', () => {
  inputCM.value = +(inputFOOT.value / 0.0328084).toFixed(3)
  inputINCH.value = +(inputFOOT.value * 12).toFixed(3)
})