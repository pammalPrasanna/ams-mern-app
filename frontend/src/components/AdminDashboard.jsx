import { useEffect, useState } from "react"
import { MdAdd } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import AddOrgModal from "./Modals/AddOrgModal"
import { getOrgs, resetOrgsStore } from "../features/orgs/orgsSlice"
import OrgCard from "./Cards/OrgCard";


export default function AdminDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((store) => store.auth);
    const { orgs, isLoading, isError, isInternalError, message } = useSelector((store) => store.orgs);
    const [addOrg, setAddOrg] = useState(false);


    const [width, setWidth] = useState(0);
    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize)

    })


    useEffect(() => {
        if (isInternalError) {
            navigate('/500')
        }
        if (isError) {
            dispatch(resetOrgsStore())
        }
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate, isError, message, dispatch])


    useEffect(() => {

        dispatch(getOrgs())
    }, [])


    if (isLoading) {
        return <><h1>Loading...</h1></>
    }

    if (orgs.length === 0) {
        return <>
            {/* <div className="container is-fluid">
                <div className="is-size-5 mt-3">
                    <div className="columns is-12 is-mobile">
                        <div className="column"> Your organizations
                            <div className="mt-3">
                                you don't have organization yet, click below to create one
                            </div>
                        </div>
                        <div className="column has-text-right">
                            <button className="button is-link" onClick={() => setAddOrg(true)}><MdAdd size={25} />{" "}Add</button>
                        </div>
                    </div>

                </div>
            </div> */}
            <div className="container is-fluid">
                <div className="is-size-5 mt-3">
                    Your organizations
                    <div className="mt-3">
                        you don't have an organization yet, click below to create one
                        <div className="mt-3">
                            <button className="button is-link" onClick={() => setAddOrg(true)}><MdAdd size={25} />{" "}Add</button>
                        </div>
                    </div>
                </div>
            </div>
            <AddOrgModal isActive={addOrg} setAddOrg={setAddOrg} />

        </>
    }

    return (
        <>
            <div className="container is-fluid">
                <div className="is-size-5 mt-3">
                    <div className="columns is-12 is-mobile">
                        <div className="column">
                            Your organizations
                        </div>
                        <div className="column is-6 has-text-right">
                            {
                                (width >= 525) ?
                                    (<button className="button is-link" onClick={() => setAddOrg(true)}><MdAdd size={25} />{" "}Add</button>)
                                    :
                                    <MdAdd size={25} align="right" onClick={() => setAddOrg(true)} />
                            }

                        </div>
                    </div>

                </div>
                <div className="columns is-12 is-multiline mt-2">
                    {
                        orgs.length !== 0 ? (orgs.map(e => {
                            // return (<div key={e._id} className="column is-4"><div className="card">
                            //     <div className="card-content">{e.name}</div>
                            // </div></div>)
                            return (<div className="column is-4" key={e._id}><OrgCard  {...e} /></div>)
                        })) : ""
                    }
                </div>
            </div>
            <AddOrgModal isActive={addOrg} setAddOrg={setAddOrg} />
        </>

    )
}
