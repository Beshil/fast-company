import React, { useEffect, useState } from 'react'
import { validator } from '../../../utils/validator'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import BackHistoryButton from '../../common/backButton'
import { useDispatch, useSelector } from 'react-redux'
import {
  getQualities,
  getQualitiesLoadingStatus
} from '../../../store/qualities'
import {
  getProfessions,
  getProfessionsLoadingStatus
} from '../../../store/professions'
import {
  getCurrentUserData,
  getCurrentUserId,
  updateUser
} from '../../../store/users'

const EditUserPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState()
  const currentUser = useSelector(getCurrentUserData())
  const dispatch = useDispatch()
  const currentUserId = useSelector(getCurrentUserId())
  const isSaving = useSelector((state) => state.users.isSaving)
  const saveError = useSelector((state) => state.users.error)
  const qualities = useSelector(getQualities())
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus())
  const qualitiesList = qualities.map((q) => ({
    label: q.name,
    value: q._id
  }))
  const professions = useSelector(getProfessions())
  const professionLoading = useSelector(getProfessionsLoadingStatus())
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }))
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    dispatch(
      updateUser({
        ...data,
        qualities: data.qualities.map((q) => q.value)
      })
    )
  }
  function getQualitiesListByIds(qualitiesIds) {
    const qualitiesArray = []
    for (const qualId of qualitiesIds) {
      for (const quality of qualities) {
        if (quality._id === qualId) {
          qualitiesArray.push(quality)
          break
        }
      }
    }
    return qualitiesArray
  }
  const transformData = (data) => {
    const result = getQualitiesListByIds(data).map((qual) => ({
      label: qual.name,
      value: qual._id
    }))
    return result
  }
  useEffect(() => {
    if (!professionLoading && !qualitiesLoading && !data) {
      setData({
        _id: currentUserId,
        email: '',
        name: '',
        profession: '',
        sex: 'male',
        ...currentUser,
        qualities: transformData(currentUser?.qualities || [])
      })
    }
  }, [professionLoading, qualitiesLoading, currentUser, currentUserId, data])
  useEffect(() => {
    if (data && isLoading) setIsLoading(false)
  }, [data])

  const validatorConfig = {
    profession: { isRequired: { message: 'Выберите профессию' } },
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
      }
    }
  }
  useEffect(() => {
    validate()
  }, [data])
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
          {!isLoading ? (
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
                options={professionsList}
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
              {saveError && (
                <p className="text-danger" role="alert">
                  {saveError}
                </p>
              )}
              <button
                type="submit"
                disabled={!isValid || isSaving}
                className="btn btn-primary w-100 mx-auto"
              >
                Обновить
              </button>
            </form>
          ) : (
            'Loading...'
          )}
        </div>
      </div>
    </div>
  )
}

export default EditUserPage
