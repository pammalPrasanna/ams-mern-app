import { Link, useNavigate } from "react-router-dom"
import { MdEditCalendar } from 'react-icons/md'
import LoginSignUpButtons from './LoginSignUpButtons'
import { useDispatch, useSelector } from "react-redux";
import { logout, resetUserState } from '../features/auth/authSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((store) => store.auth);


    const onLogout = () => {
        dispatch(logout());
        dispatch(resetUserState());
        navigate('/')
    }
    return (
        <>
            <nav className="navbar is-dark text-dark" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item is-size-4 " to="/">
                        {/* <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" /> */}
                        <MdEditCalendar size={35} className="mr-2" />Attendly
                    </Link>


                </div>

                <div className="navbar-menu">

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">

                                <LoginSignUpButtons />

                            </div>
                        </div>
                    </div>
                </div>
            </nav>


        </>
    )
}

export default Navbar