import { useState } from 'react';
import { MdPeople, MdGroups } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { NavLink, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

const OrganizationPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const { orgs } = useSelector((store) => store.orgs);



  const [currentTab, setCurrentTab] = useState(() => {
    if (location.pathname.includes('/members')) return 'members';
    return 'teams';
  });


  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  if (!user) {
    navigate('/login')
  }

  return (
    <>
      <div className="is-size-5 ml-2 mt-2">{orgs.filter(e => e._id === id)[0].name}</div>
      <div className="tabs is-right is-boxed">
        <ul>
          <li className={`${currentTab === 'teams' ? 'is-active' : ''}`} onClick={() => setCurrentTab('teams')} >
            <NavLink to="" >


              <MdGroups size={28} className="mr-2" />
              <span>Teams</span>

            </NavLink>


          </li>
          <li className={`${currentTab === 'members' ? 'is-active' : ''}`} onClick={() => setCurrentTab('members')}>

            <NavLink to="members" >
              <MdPeople size={28} className="mr-2" />
              <span>Members</span>
            </NavLink>

          </li>

        </ul>
      </div>
      <Outlet />
    </>
  )
}
export default OrganizationPage;