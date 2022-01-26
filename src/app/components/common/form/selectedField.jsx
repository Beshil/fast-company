import React from 'react'
import PropTypes from 'prop-types'
const SelectedField = ({
  label,
  name,
  value,
  defaultOption,
  options,
  onChange,
  error
}) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map((optionName) => ({
          name: options[optionName].name,
          value: options[optionName]._id
        }))
      : options
  const getInputClasses = () => {
    return 'form-select' + (error ? ' is-invalid' : '')
  }
  const handleChange = ({ target }) => {
    onChange({
      name: [target.name],
      value: {
        _id: target.childNodes[target.selectedIndex].getAttribute('id'),
        name: target.value
      }
    })
    console.log(target)
  }

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id={name}
        name={name}
        onChange={handleChange}
        value={value}
      >
        <option disabled value="">
          {defaultOption}
        </option>

        {optionsArray &&
          optionsArray.map((option) => (
            <option key={option.value} id={option.value} value={option.name}>
              {option.name}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}
SelectedField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func,
  label: PropTypes.string,
  defaultOption: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
}
export default SelectedField
