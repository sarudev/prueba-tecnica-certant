import useError from '../hooks/useError'
import { Form, useActionData } from 'react-router-dom'
import { useEffect } from 'react'
import '../styles/login.scss'

export default function Login () {
  const { error, setError } = useError()
  const loginError = useActionData() as string

  useEffect(() => {
    setError(loginError)
  }, [loginError])

  return (
    <div className="form-container">
      <Form method='POST'>
        <input type="text" placeholder='username' name='username' required/>
        <input type="password" placeholder='password' name='password' required/>
        {error !== '' && <div className='error'>{error}</div>}
        <button type="submit">Login</button>
      </Form>
    </div>
  )
}
