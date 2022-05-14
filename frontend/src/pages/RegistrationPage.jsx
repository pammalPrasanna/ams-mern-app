import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser, resetUserState } from '../features/auth/authSlice'
import { Box } from 'react-bulma-components'
import { toast } from 'react-toastify'


const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const { name, email, password, password2 } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/dashboard')
        }

        dispatch(resetUserState())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (!name || !email || !password || !password2) {
            toast.error('Fields cannot be empty')

        }
        else if (password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password,
            }

            dispatch(registerUser(userData))
        }
    }

    if (isLoading) {
        return <><h1>Loading...</h1></>
    }

    return (
        <>
            <div className="has-text-centered is-size-3 mt-2" >Please sign up</div>
            <div className="columns mt-3">
                <div className='column'></div>
                <div className='column is-one-quater'>
                    <Box style={{ margin: 'auto' }}>
                        <form onSubmit={onSubmit} >
                            <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    <input className="input" name="name" onChange={onChange} type="text" placeholder="e.g Alex Smith" />
                                </div>
                            </div>

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

                            <div className="field">
                                <label className="label">Re enter Password</label>
                                <div className="control">
                                    <input className="input" name="password2" onChange={onChange} type="password" />
                                </div>
                            </div>
                            <div className="control">
                                <button className="button is-primary is-fullwidth" type="submit">Sign up</button>
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