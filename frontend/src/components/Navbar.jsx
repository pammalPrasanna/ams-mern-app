import { Link } from "react-router-dom"
import { MdEditCalendar } from 'react-icons/md'
import LoginSignUpButtons from './Buttons/LoginSignUpButtons'
import { useSelector } from "react-redux"
import SwipeButtons from "./Buttons/SwipeButtons"

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);

    return (
        <>
            <nav className="navbar is-dark text-dark" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item is-size-4 " to="/">
                        <MdEditCalendar size={35} className="mr-2" />Attendly
                    </Link>


                </div>

                <div className="navbar-menu">

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                {user ? (user.role === 2 ? (<SwipeButtons />) : "") : ""}
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