import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
const MultiSelectedField = ({
  options,
  onChange,
  name,
  label,
  defaultValue,
  error
}) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map((optionName) => ({
          label: options[optionName].name,
          value: options[optionName]._id,
          color: options[optionName].color
        }))
      : options

  const handleChange = useCallback((currArr) => {
    const value = currArr.map((item, i) => ({
      name: currArr[i].label,
      _id: currArr[i].value,
      color: currArr[i].color
    }))
    onChange({ name, value })
  }, [])

  const getInputClasses = () => {
    return 'basic-multi-select' + (error ? ' is-invalid' : '')
  }
  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        defaultValue={defaultValue}
        className={getInputClasses()}
        classNamePrefix="select"
        options={optionsArray}
        onChange={handleChange}
        name={name}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}
MultiSelectedField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.array,
  error: PropTypes.string
}
export default MultiSelectedField
