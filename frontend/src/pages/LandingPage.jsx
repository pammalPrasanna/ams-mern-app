
import LoginSignUpButtons from '../components/LoginSignUpButtons';
export default function LandingPage() {
    return (
        <section className="hero is-fullheight is-primary">
            <div className="hero-body">
                <div className="">

                    <div>

                        <h1 className="title">Attendly</h1>
                    </div>
                    <LoginSignUpButtons />
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
