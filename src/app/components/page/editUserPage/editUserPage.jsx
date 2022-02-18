import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { validator } from '../../../utils/validator'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import BackHistoryButton from '../../common/backButton'
import { useProfession } from '../../../hooks/useProfession'
import { useQualities } from '../../../hooks/useQualities'
import { useAuth } from '../../../hooks/useAuth'

const EditUserPage = () => {
  const history = useHistory()

  const { professions } = useProfession()
  const { isLoading: qualitiesLoad, qualities, getQualities } = useQualities()
  const { currentUser, upDateUser } = useAuth()

  const qualitiesList = qualities.map((q) => ({ label: q.name, value: q._id }))
  const professionList = professions.map((p) => ({
    name: p.name,
    value: p._id
  }))
  const transformQuality = (userQuality) => {
    if (!qualitiesLoad) {
      const quality = userQuality.map((id) => getQualities(id))
      return quality.map((q) => ({ label: q.name, value: q._id }))
    }
  }
  const [data, setData] = useState({
    ...currentUser,
    name: currentUser.name,
    email: currentUser.email,
    profession: currentUser.profession,
    sex: currentUser.sex,
    qualities: transformQuality(currentUser.qualities)
  })

  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const newData = { ...data, qualities: data.qualities.map((q) => q.value) }
    upDateUser(newData)
    history.push(`/users/${data._id}`)
    console.log(newData)
  }

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен некорректно'
      }
    },
    name: {
      isRequired: {
        message: 'Введите ваше имя'
      },
      min: {
        message: 'Имя должно состоять минимум из 3 символов',
        value: 3
      }
    }
  }
  useEffect(() => validate(), [data])
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0
  return (
    <div className="container mt-5">
      <BackHistoryButton />
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Имя"
              name="name"
              value={data.name}
              onChange={handleChange}
              error={errors.name}
            />
            <TextField
              label="Электронная почта"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
            <SelectField
              label="Выбери свою профессию"
              defaultOption="Choose..."
              options={professionList}
              name="profession"
              onChange={handleChange}
              value={data.profession}
              error={errors.profession}
            />
            <RadioField
              options={[
                { name: 'Male', value: 'male' },
                { name: 'Female', value: 'female' },
                { name: 'Other', value: 'other' }
              ]}
              value={data.sex}
              name="sex"
              onChange={handleChange}
              label="Выберите ваш пол"
            />
            <MultiSelectField
              defaultValue={data.qualities}
              options={qualitiesList}
              onChange={handleChange}
              name="qualities"
              label="Выберите ваши качества"
            />
            <button
              type="submit"
              disabled={!isValid}
              className="btn btn-primary w-100 mx-auto"
            >
              Обновить
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditUserPage
