import React, { useEffect, useState } from 'react'
import TextField from '../textField'
import { validator } from '../utils/validator'

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }
  useEffect(() => {
    validate()
  }, [data])
  const validateConfig = {
    email: {
      isRequired: { message: 'Электронная почта обязательна для заполенения' },
      isEmail: { message: 'Введите корректно электронную почту' }
    },
    password: {
      isRequired: { message: 'Пароль обязателен для заполенения' },
      isCapitalSymbol: {
        message: 'Пароль должен содержать одну заглавную букву'
      },
      isContainDigit: { message: 'Пароль должен содержать одно число' },
      min: { message: 'Пароль должен содержать менее 8 символов', value: 8 }
    }
  }
  const validate = () => {
    const errors = validator(data, validateConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0
  const handeSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log(data)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-5">Login</h3>
          <form onSubmit={handeSubmit}>
            <TextField
              label="Почтовый адрес"
              name="email"
              type="email"
              value={data.email}
              handleChange={handleChange}
              error={errors.email}
            />
            <TextField
              label="Пароль"
              name="password"
              type="password"
              value={data.password}
              handleChange={handleChange}
              error={errors.password}
            />
            <button
              type="submit"
              disabled={!isValid}
              className="btn btn-primary w-100"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login
