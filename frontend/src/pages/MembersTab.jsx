import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMembers, deleteMember } from "../features/members/membersSlice";
import { MdAdd, MdDelete } from "react-icons/md";
import AddMemberModal from "../components/Modals/AddMemberModal";
import ErrorCard from "../components/Cards/ErrorCard";
import ProfileCard from "../components/Cards/ProfileCard";


const MembersTab = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useSelector((store) => store.auth);

    const {
        members,
        isLoading,
        isError,
        isGetMembersPending,
        isGetMembersRejected,
        isGetMembersFulfilled,
        isGetMembersErrorMsg,

    } = useSelector((store) => store.members);

    const [addMember, setAddMember] = useState(false);

    const [profileView, setProfileView] = useState({});

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
        dispatch(getMembers(id))
    }, [])

    if (isGetMembersPending || isLoading) {
        return (<><h1>Loading...</h1></>)
    }
    if (isGetMembersRejected) {
        return (<>
            <div className="notification is-info is-light">
                {isGetMembersErrorMsg}
            </div>
        </>)
    }
    if (isError) {
        return (<ErrorCard tryAgainMethod={getMembers} />)
    }
    if (members !== undefined) {
        if (members.length === 0) {
            return (
                <>
                    <div className="container is-fluid">
                        <div className="is-size-5 mt-3">
                            Org's Members
                            <div className="mt-3">
                                you don't have members in this organization yet, click below to add one
                                <div className="mt-3">
                                    <button className="button is-link" onClick={() => setAddMember(true)}><MdAdd size={25} />{" "}Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <AddMemberModal isActive={addMember} setAddMember={setAddMember} />
                </>
            )
        }

        return (
            <>
                <div className="columns is-12 is-mobile mx-3">
                    <div className="column is-4">
                        <span className="is-size-5">Profile details</span>
                        <div>
                            {Object.keys(profileView).length > 1 ? (
                                <ProfileCard {...profileView} />
                            ) : (<><div className="notification is-light">
                                Click on members name to view their profile</div></>)}
                        </div>
                    </div>
                    <div className="column">
                        <div className="columns">
                            <div className="column is-size-5">Members</div>
                            <div className="column has-text-right">
                                <button className="button is-link" onClick={() => setAddMember(true)}><MdAdd size={25} />{" "}Add</button>
                            </div>
                        </div>
                        {
                            members.length !== 0 ? (members.map((member, i) => {
                                return (<>


                                    <div key={i} onClick={() => setProfileView(member)} className="columns is-12 is-mobile" style={{ border: '1px solid grey', borderRadius: '5px', padding: 5 }}>

                                        <div className="column">{member.mid.name}</div>
                                        <div className="column is-2 has-text-right">
                                            <MdDelete size={25} className="has-text-danger" onClick={() => dispatch(deleteMember(member.mid._id))} />
                                        </div>

                                    </div></>)
                            })) : ''
                        }

                    </div>
                </div>
                <AddMemberModal isActive={addMember} setAddMember={setAddMember} />
            </>
        )
    }

}

export default MembersTab;