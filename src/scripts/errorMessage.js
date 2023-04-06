export const errorMessage = items => {
  let errors = []

  Object.keys(items.$params).forEach(key => {
    if (items.$dirty && !items[key]) {
      switch (key) {
        case 'required':
          errors.push('Обязательное поле')
          break
        case 'maxLength':
          errors.push('Максимальная длина ' + items.$params[key]?.max)
          break
        default: break
      }
    }
  })
  return errors
}