import { MdOutlineCorporateFare } from 'react-icons/md';
import { Link } from 'react-router-dom';

function OrgCard({ _id, name }) {
    return (
        <div className="card">
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <MdOutlineCorporateFare size={28} />
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">{name}</p>
                        {/* <p className="subtitle is-6">@johnsmith</p> */}
                    </div>
                </div>
            </div>
            <footer className="card-footer">
                {/* <a href="#" className="card-footer-item">Save</a> */}
                <Link to="#" className="card-footer-item">Edit</Link>
                <Link to={`/orgs/${_id}`} className="card-footer-item">View</Link>
            </footer>

        </div>
    )
}

export default OrgCard