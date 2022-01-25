import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
const MultiSelectedField = ({
  options,
  onChange,
  name,
  label,
  defaultValue
}) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map((optionName) => ({
          label: options[optionName].name,
          value: options[optionName]._id
        }))
      : options
  const handleChange = (value) => {
    onChange({ name: name, value })
  }

  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <Select
        closeMenuOnSelect={false}
        isMulti
        defaultValue={defaultValue}
        className="basic-multi-select"
        classNamePrefix="select"
        options={optionsArray}
        onChange={handleChange}
        name={name}
      />
    </div>
  )
}
MultiSelectedField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.array
}
export default MultiSelectedField
