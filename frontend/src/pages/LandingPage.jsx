import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

export default function LandingPage() {
    const navigate = useNavigate();
    const { user } = useSelector((store) => store.auth)
    useEffect(() => {
        if (user) {
            navigate('/dashboard')
        }
    }, [user, navigate]);

    return (
        <section className="hero is-fullheight is-primary">
            <div className="hero-body">
                <div className="">

                    <div>

                        <h1 className="title">Attendly</h1>
                    </div>
                    <div>
                        <h2 className="subtitle">
                            Manage attendance from <strong>anywhere</strong>, in the world.
                        </h2>

                    </div>
                </div>

            </div>
        </section>
    )
}
