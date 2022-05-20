import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createOrg } from "../../features/orgs/orgsSlice";

function AddOrgModal({ isActive, setAddOrg }) {
    const org = useSelector((store) => store.orgs);
    const { orgs, isError, message, isLoading, isSuccess } = org;
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: ""
    });

    const { name } = formData;


    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createOrg({
            org_name: name
        }))
    }
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    useEffect(() => {
        if (isError) {
            setAddOrg(false);
            toast.error(message);
        }
        if (isSuccess) {
            setAddOrg(false);
        }

    }, [isError, isSuccess]);



    return (
        <div className={`modal ${isActive ? 'is-active' : ''}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title is-size-5">Create Organization</p>
                    <button className="delete" aria-label="close" onClick={() => setAddOrg(false)}></button>
                </header>
                <section className="modal-card-body">
                    <form onSubmit={onSubmit} >

                        <div className="field">
                            <label className="label">Organization name</label>
                            <div className={`control ${isLoading ? 'is-loading' : ''}`}>
                                <input className="input" name="name" onChange={onChange} type="text" placeholder="eg. My Organization" />
                                {name === "" ? <p className="help is-danger">This field is required</p> : ""}
                            </div>
                        </div>

                        <div align="right">
                            <button className={`button is-link`} disabled={(name.length > 0 ? false : true)} type="submit">Create</button>

                        </div>

                    </form>
                </section>
            </div>
        </div>
    )
}

export default AddOrgModal