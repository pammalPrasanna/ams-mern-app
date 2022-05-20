import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser, resetUserState } from '../features/auth/authSlice'
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

    const {
        user,
        isRegisterUserErrorMsg,
        isRegisterUserPending,
        isRegisterUserRejected,
        isRegisterUserFulfilled
    } = useSelector((state) => state.auth)

    useEffect(() => {
        if (user || isRegisterUserFulfilled) {
            navigate('/dashboard')
        }
    }, [user, isRegisterUserFulfilled])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            name,
            email,
            password,
        }
        dispatch(registerUser(userData))

    }

    return (
        <>
            <div className="has-text-centered is-size-3 mt-2" >Please sign up</div>
            <div className="columns mt-3">
                <div className='column'></div>
                <div className='column is-one-quater'>
                    <div className="box" style={{ margin: 'auto' }}>
                        <form onSubmit={onSubmit} >
                            <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    <input className="input" name="name" onChange={onChange} type="text" placeholder="e.g Alex Smith" />
                                    {name === "" ? <p className="help is-danger">This field is required</p> : ""}

                                </div>
                            </div>

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

                            <div className="field">
                                <label className="label">Re enter Password</label>
                                <div className="control">
                                    <input className="input" name="password2" onChange={onChange} type="password" />
                                    {password2 === "" ? <p className="help is-danger">This field is required</p> : ""}
                                    {password2 !== password ? <p className="help is-danger">Passwords doesn't match</p> : ""}

                                </div>
                            </div>
                            {isRegisterUserRejected ? (<><div className="notification is-danger is-light">
                                {isRegisterUserErrorMsg}
                            </div></>) : ""}
                            <div className="control">
                                <button
                                    className={`button is-link is-fullwidth ${isRegisterUserPending ? 'is-loading' : ''}`}
                                    type="submit"
                                    disabled={((name.length && email.length && password.length && password2.length && (password === password2)) ? false : true)}

                                >Sign up</button>
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