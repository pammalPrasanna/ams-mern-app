import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import { getOneMember, registerMember } from "../features/members/membersSlice"
const MemberRegistrationPage = () => {
    const { mid } = useParams();
    const dispatch = useDispatch();
    const { member,
        isGetOneMemberPending,
        isGetOneMemberRejected,
        isGetOneMemberFulfilled,
        isRegisterMemberPending,
        isRegisterMemberFulfilled,
        isRegisterMemberRejected,
        registerMemberErrorMsg
    } = useSelector((store) => store.members);

    // get the member details using mid

    // if mid is valid show 'Hi member_name' and password fields to set password

    // if mid is not valid show 404



    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: ''
    })

    const { email, password, password2 } = formData;


    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
            toast.error('Passwords doesnt match!')
        } else {
            dispatch(registerMember({
                id: mid,
                email,
                password
            }));
        }
    }



    useEffect(() => {
        dispatch(getOneMember(mid))
    }, [])

    if (isGetOneMemberPending) {
        return <h1>Loading...</h1>
    }

    if (isGetOneMemberRejected) {
        return (<>
            <div className="container mt-5">
                <div className="notification is-danger is-light is-size-5">
                    Try again after some time (or) Contact your organization
                </div>
            </div>
        </>)
    }

    if (isGetOneMemberFulfilled) {
        return (
            <div className="container mt-6">
                <div className="columns">
                    <div className="column"></div>
                    <div className="column is-4 box">
                        <div className="mb-2">
                            <span className="is-size-5"> Hi <span className="has-text-link">{member.mid.name}</span> </span>
                            <br />
                            <span>Fill out the details below to complete your registration.</span>
                        </div>
                        <div className="mt-3">

                            <form onSubmit={onSubmit}>
                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control">
                                        <input size={100} className="input" name="email" onChange={onChange} type="email" placeholder="e.g. alexsmith@gmail.com" />
                                        {email === "" ? <p className="help is-danger">This field is required</p> : ""}
                                    </div>

                                </div>
                                <div className="field mt-2">
                                    <label className="label">Password</label>
                                    <div className="control">
                                        <input size={100} className="input" name="password" onChange={onChange} type="password" placeholder="e.g. alexsmith@gmail.com" />
                                        {password === "" ? <p className="help is-danger">This field is required</p> : ""}

                                    </div>
                                </div>
                                <div className="field mt-2">
                                    <label className="label">Re enter password</label>
                                    <div className="control">
                                        <input size={100} className="input" name="password2" onChange={onChange} type="password" placeholder="e.g. alexsmith@gmail.com" />
                                        {password2 === "" ? <p className="help is-danger">This field is required</p> : ""}

                                    </div>
                                </div>
                                {
                                    isRegisterMemberRejected ? (<div className="notification is-danger is-light">
                                        {registerMemberErrorMsg}
                                    </div>) : ""
                                }
                                {
                                    isRegisterMemberFulfilled ? (<div className="notification is-success is-light">
                                        Registration successfull click <Link to="/login">here</Link> to login
                                    </div>) : ""
                                }
                                <div className="control mt-2">
                                    <button
                                        className={`button is-link is-fullwidth ${isRegisterMemberPending ? 'is-loading' : ''}`}
                                        disabled={((email.length && password.length && password2.length && (password === password2)) ? false : true)} type="submit">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="column"></div>
                </div>
            </div>
        )
    }


}

export default MemberRegistrationPage