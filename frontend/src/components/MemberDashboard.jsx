import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { MdPerson, MdFreeCancellation, MdFormatListBulleted } from 'react-icons/md'
const MemberDashboard = () => {
    const location = useLocation();
    const [currentTab, setCurrentTab] = useState(() => {
        if (location.pathname.includes('/leaves')) return 'leaves';
        else if (location.pathname.includes('/profile')) return 'profile';
        else return 'attendance';
    });
    return (
        <>
            <div className="mt-3 tabs is-right is-boxed">
                <ul>
                    <li className={`${currentTab === 'attendance' ? 'is-active' : ''}`} onClick={() => setCurrentTab('attendance')} >
                        <NavLink to="">
                            <MdFreeCancellation size={25} className="mr-2" />
                            <span>Attendance</span>

                        </NavLink>
                    </li>
                    <li className={`${currentTab === 'leaves' ? 'is-active' : ''}`} onClick={() => setCurrentTab('leaves')} >
                        <NavLink to="leaves" >
                            <MdFormatListBulleted size={25} className="mr-2" />

                            <span>Leaves</span>
                        </NavLink>
                    </li>
                    <li className={`${currentTab === 'profile' ? 'is-active' : ''}`} onClick={() => setCurrentTab('profile')}>

                        <NavLink to="profile" >
                            <MdPerson size={25} className="mr-2" />
                            <span>Profile</span>
                        </NavLink>

                    </li>

                </ul>
            </div>

            <Outlet />
        </>
    )
}

export default MemberDashboard