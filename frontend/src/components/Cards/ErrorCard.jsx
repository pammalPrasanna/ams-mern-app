import { useDispatch } from "react-redux"

const ErrorCard = ({ errorMessage = "Something went wrong", tryAgainMethod }) => {
    const dispatch = useDispatch();
    return (
        <div className="container">

            <div className="notification is-danger is-size-6 is-medium is-light">
                {errorMessage}, click <a onClick={() => dispatch(tryAgainMethod())}>here</a> to try again.

            </div>
        </div>
    )
}

export default ErrorCard