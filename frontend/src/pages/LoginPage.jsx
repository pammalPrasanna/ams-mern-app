import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser, resetUserState } from '../features/auth/authSlice'
import { Box } from 'react-bulma-components'
import { toast } from 'react-toastify'


const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message)
            dispatch(resetUserState())
        }

        if (isSuccess || user) {
            navigate('/dashboard')
        }

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (email === '' || password === '') {
            toast.error('Email and password fields cannot be empty')
        } else {
            const userData = {
                email,
                password,
            }

            dispatch(loginUser(userData))
        }
    }

    if (isLoading) {
        return <><h1>Loading...</h1></>
    }

    return (
        <>
            <div class="has-text-centered is-size-3 mt-2" >Please login</div>
            <div className="columns mt-3">
                <div className='column'></div>
                <div className='column is-one-quater'>
                    <Box style={{ margin: 'auto' }}>

                        <form onSubmit={onSubmit} >

                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control">
                                    <input className="input" name="email" onChange={onChange} type="email" placeholder="e.g. alexsmith@gmail.com" />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control">
                                    <input className="input" name="password" onChange={onChange} type="password" />
                                </div>
                            </div>

                            <div className="control">
                                <button className="button is-primary is-fullwidth" type="submit">Log in</button>
                            </div>
                        </form>
                    </Box>
                </div>
                <div className='column'></div>

            </div>
        </>
    )
}

export default RegistrationPage