import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser, resetLoginUserState } from '../features/auth/authSlice'
import { toast } from 'react-toastify'


const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const { user, isLoginUserPending, isLoginUserRejected, isLoginUserFulfilled, isLoginUserErrorMsg } = useSelector(
        (store) => store.auth
    )


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


    useEffect(() => {
        if (isLoginUserFulfilled) {

            dispatch(resetLoginUserState());
            navigate('/dashboard');
        }

    }, [isLoginUserFulfilled])


    if (user) {
        navigate('/dashboard')
    }

    return (
        <>
            <div className="has-text-centered is-size-3 mt-2" >Please login</div>
            <div className="columns mt-3">
                <div className='column'></div>
                <div className='column is-one-quater'>
                    <div className='box' style={{ margin: 'auto' }}>

                        <form onSubmit={onSubmit} >

                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control">
                                    <input className="input" name="email" onChange={onChange} type="email" placeholder="e.g. alexsmith@gmail.com" />
                                    {email === "" ? <p className="help is-danger">This field is required</p> : ""}

                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control">
                                    <input className="input" name="password" onChange={onChange} type="password" />
                                    {password === "" ? <p className="help is-danger">This field is required</p> : ""}

                                </div>
                            </div>
                            {
                                isLoginUserRejected ? (
                                    <><div className='notification is-danger is-light'>
                                        {isLoginUserErrorMsg}
                                    </div></>
                                ) : ""
                            }
                            <div className="control">
                                <button
                                    className={`button is-link is-fullwidth ${isLoginUserPending ? 'is-loading' : ''}`}
                                    disabled={((email.length > 0 && password.length > 0) ? false : true)}
                                    type="submit">Log in</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='column'></div>

            </div>
        </>
    )
}

export default RegistrationPage