import React, { useEffect, useState } from 'react'

import TextField from '../common/form/textField'
import { validator } from '../utils/validator'
import api from '../api'
import SelectedField from '../common/form/selectedField'
import RadioField from '../common/form/radioField'
import MultiSelectedField from '../common/form/multiselectedField'
import CheckBoxField from '../common/form/checkBoxField'

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false
  })
  const [errors, setErrors] = useState({})
  const [professions, setProfession] = useState()
  const [qualities, setQualities] = useState({})

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data))
    api.qualities.fetchAll().then((data) => setQualities(data))
  }, [])
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
    },
    profession: {
      isRequired: {
        message: 'Обязательно выбирите свою профессию'
      }
    },
    licence: {
      isRequired: {
        message:
          'Вы не можете использовать наш сервис без подтверждение лицензионного соглашения'
      }
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
    <form onSubmit={handeSubmit}>
      <TextField
        label="Почтовый адрес"
        name="email"
        type="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        name="password"
        type="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SelectedField
        defaultOption="Выбирите..."
        options={professions}
        name="professions"
        onChange={handleChange}
        value={data.profession}
        label="Выбириту свою профессию"
        error={errors.profession}
      />
      <RadioField
        options={[
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' },
          { name: 'Other', value: 'Other' }
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
        label="Выбирите ваш пол"
      />
      <MultiSelectedField
        options={qualities}
        onChange={handleChange}
        defaultValue={data.qualities}
        name="qualities"
        label="Выбирите ваши качества"
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        error={errors.licence}
        name="licence"
      >
        Подтвердить <a> лицензионное соглашение</a>
      </CheckBoxField>
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100"
      >
        Submit
      </button>
    </form>
  )
}

export default RegisterForm
