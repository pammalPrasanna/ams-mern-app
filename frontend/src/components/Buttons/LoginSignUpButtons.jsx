import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { logout, resetUserState } from '../../features/auth/authSlice';

function LoginSignUpButtons() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((store) => store.auth);


    const onLogout = () => {
        dispatch(logout());
        dispatch(resetUserState());
        navigate('/')
    }
    if (user === null) {
        if (location.pathname.includes('register')) {
            return (<Link to="/login" className="button is-light"> Log in </Link>)
        } else if (location.pathname.includes('login')) {
            return (<Link className="button is-primary" to='/register'>
                <strong>Sign up</strong>
            </Link>)
        }

        return (<>
            <Link className="button is-primary" to='/register'>
                <strong>Sign up</strong>
            </Link>
            <Link to="/login" className="button is-light"> Log in </Link>
        </>)
    } else {
        return (<><button
            className="button is-danger"
            type="submit"
            onClick={() => onLogout()}>Logout</button></>)
    }

}

export default LoginSignUpButtons