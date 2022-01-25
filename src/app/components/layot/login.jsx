import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import LoginForm from '../ui/loginForm'
import RegisterForm from '../ui/registerForm'

const Login = () => {
  const { type } = useParams()
  const [formType, setFormType] = useState(type === 'register' ? type : 'login')
  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === 'register' ? 'login' : 'register'
    )
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === 'register' ? (
            <>
              <h3 className="mb-5">Register</h3>
              <RegisterForm />
              <p>
                Already have account?{' '}
                <a onClick={toggleFormType} role="button">
                  Sign In
                </a>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-5">Login</h3>
              <LoginForm />
              <p>
                Dont have account?{' '}
                <a onClick={toggleFormType} role="button">
                  Sign Up
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
export default Login
