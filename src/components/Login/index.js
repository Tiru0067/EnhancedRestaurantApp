import {useState} from 'react'
import {useHistory, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({showSubmitError: false, errorMsg: ''})
  const [loading, setLoading] = useState(false)

  const history = useHistory()

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  const onSubmitFailure = errorMsg => {
    setError({showSubmitError: true, errorMsg})
    setLoading(false)
  }

  const fetchLoginDetails = async () => {
    setLoading(true)
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const url = 'https://apis.ccbp.in/login'

    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    if (response.ok) {
      setLoading(false)
      onSubmitSuccess(data.jwt_token)
    } else {
      setLoading(false)
      onSubmitFailure(data.error_msg)
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    fetchLoginDetails()
  }

  if (Cookies.get('jwt_token')) {
    return <Redirect to='/' />
  }

  return (
    <div className='login'>
      <div className='login__container'>
        <h1 className='login__message'>Please Login to continue</h1>
        <form className='login__form' onSubmit={handleSubmit}>
          <div className='login__form-group'>
            <label htmlFor='username' className='login__label'>
              USERNAME
            </label>
            <input
              id='username'
              name='username'
              className='login__input'
              type='text'
              placeholder='Username'
              value={username}
              onChange={e => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className='login__form-group'>
            <label htmlFor='password' className='login__label'>
              PASSWORD
            </label>
            <input
              id='password'
              name='password'
              className='login__input'
              type='password'
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          <button type='submit' className='login__button' disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error.showSubmitError && (
            <p className='login__error-message'>*{error.errorMsg}</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default Login
