/* eslint-disable no-console */
const info = (...message) => {
  console.log(message)
}

const error = (...message) => {
  console.error(message)
}

export default { info, error }
