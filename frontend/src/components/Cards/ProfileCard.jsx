const ProfileCard = ({ mid }) => {
    console.log(window.location.href)
    return (
        <>

            {
                (mid.role === 3) ? (<>
                    <div className="notification is-danger is-light mt-2">
                        Member registration is not completed for the member <strong>'{mid.name}'</strong>.

                        <div className='box my-2'>
                            {`${window.location.href.replace('members', 'member')}-registration/${mid._id}`}
                        </div>

                        Share the above link to the member to complete his/her registration.
                    </div>

                </>) : (<><div className="card mt-2">
                    <div className="card-content">
                        <div className="media">
                            <div className="media-left">
                                <figure className="image is-96x96">
                                    <img className="is-rounded" src="https://bulma.io/images/placeholders/96x96.png" />
                                </figure>
                            </div>
                            <div className="media-content">
                                <p className="title is-4">{mid.name}</p>
                                <p className="subtitle is-6">{mid.email} </p>
                            </div>
                        </div>

                        <div className="content">

                        </div>
                    </div>
                </div></>)
            }
        </>

    )
}

export default ProfileCard