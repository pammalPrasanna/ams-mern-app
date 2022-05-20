import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addMember, resetAddMemberState } from "../../features/members/membersSlice";


const AddMemberModal = ({ isActive, setAddMember }) => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const { isAddMemberRejected, isAddMemberPending, isAddMemberFullfilled } = useSelector((store) => store.members)

    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addMember({
            org_id: id,
            name,
            email
        }));
    }

    useEffect(() => {
        setFormData({ name: "", email: "" })
        dispatch(resetAddMemberState());
    }, [isActive])


    const { name, email } = formData;

    return (

        <div className={`modal ${isActive ? 'is-active' : ''}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title is-size-5">Add Member</p>
                    <button className="delete" aria-label="close" onClick={() => setAddMember(false)}></button>
                </header>
                <section className="modal-card-body">

                    <form onSubmit={onSubmit} >
                        <div className="field">
                            <label className="label">Name</label>
                            <div className={`control ${isAddMemberPending ? 'is-loading' : ''}`}>
                                <input className="input" name="name" onChange={onChange} type="text" placeholder="eg. My Organization" />
                            </div>
                            {name === "" ? <p className="help is-danger">This field is required</p> : ""}
                        </div>
                        <div className="field">
                            <label className="label">Email</label>
                            <div className={`control ${isAddMemberPending ? 'is-loading' : ''}`}>
                                <input className="input" name="email" onChange={onChange} type="email" placeholder="eg. name@email.com" />
                            </div>
                            {email === "" ? <p className="help is-danger">This field is required</p> : ""}
                        </div>
                        {
                            isAddMemberRejected ? (<div className="notification is-danger">
                                Some error occured! try again.
                            </div>) : ""
                        }
                        {
                            isAddMemberFullfilled ? (<div className="notification is-success">
                                Member was added successfully.
                            </div>) : ""
                        }
                        <div align="right">
                            <button className={`button is-link ${isAddMemberPending ? 'is-loading' : ''}`} disabled={((name.length > 0 && email.length > 0) ? false : true)} type="submit"><MdAdd size={22} />{" "}Add</button>
                        </div>

                    </form>




                </section>
            </div>
        </div>
    )
}


export default AddMemberModal