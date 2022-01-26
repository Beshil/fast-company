import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import TextField from '../common/form/textField'
import { validator } from '../utils/validator'
import api from '../api'
import SelectedField from '../common/form/selectedField'
import RadioField from '../common/form/radioField'
import MultiSelectedField from '../common/form/multiselectedField'
const EditForm = () => {
  const history = useHistory()
  const { userId } = useParams()
  const [data, setData] = useState()
  const [errors, setErrors] = useState({})
  const [professions, setProfession] = useState()
  const [qualities, setQualities] = useState({})

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data))
    api.qualities.fetchAll().then((data) => setQualities(data))
    api.users.getById(userId).then((data) => setData(data))
  }, [])

  useEffect(() => {
    validate()
  }, [data])

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const handleUserQualities = () => {
    return data.qualities.map((quality) => ({
      value: quality._id,
      label: quality.name,
      color: quality.color
    }))
  }

  const validateConfig = {
    name: {
      isRequired: {
        message: 'Поле имя обязательно для заполнения'
      }
    },
    email: {
      isRequired: { message: 'Электронная почта обязательна для заполенения' },
      isEmail: { message: 'Введите корректно электронную почту' }
    },
    profession: {
      isRequired: {
        message: 'Обязательно выбирите свою профессию'
      }
    },
    qualities: {
      isRequired: { message: 'Выбирите ваши качества' }
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
    api.users.update(userId, data)
    history.push(`/users/${userId}`)
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {data && professions ? (
            <form onSubmit={handeSubmit}>
              <TextField
                label="Имя"
                name="name"
                type="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="Почтовый адрес"
                name="email"
                type="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />

              <SelectedField
                defaultOption="Выбирите..."
                options={professions}
                name="profession"
                onChange={handleChange}
                value={data.profession.name}
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
                defaultValue={handleUserQualities}
                name="qualities"
                label="Выбирите ваши качества"
                error={errors.qualities}
              />

              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100"
              >
                Обновить
              </button>
            </form>
          ) : (
            <h4>Loading...</h4>
          )}
        </div>
      </div>
    </div>
  )
}

export default EditForm
