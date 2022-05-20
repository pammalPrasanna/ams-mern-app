import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import { swipe, getSwipeDetails } from "../../features/swipe/swipeSlice"

const SwipeButtons = () => {

    const {
        swipeData,
        isGetSwipeDetailsPending,
        isGetSwipeDetailsRejected,
        isGetSwipeDetailsErrorMsg
    } = useSelector((store) => store.swipe);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isGetSwipeDetailsRejected) {
            toast.error(isGetSwipeDetailsErrorMsg);
        }

    }, [isGetSwipeDetailsRejected])

    useEffect(() => {
        dispatch(getSwipeDetails());
    }, [])

    if (isGetSwipeDetailsPending) {
        return (<><button className="button is-info is-loading"></button></>)
    }

    if (Object.keys(swipeData).length === 0) {
        return (<><button className="button is-info" onClick={() => dispatch(swipe('in'))}>Swipe in</button></>)
    }

    if (swipeData.hasOwnProperty('check_out')) {
        if (swipeData.check_out === "")
            return (<><button className="button is-warning" onClick={() => dispatch(swipe('out'))}>Swipe out</button></>)
        else return (<>
            <div className="tags has-addons my-2 mr-2">
                <span className="tag">Hours clocked today</span>
                <span className="tag is-warning">{swipeData.hours_clocked}</span>
            </div>
        </>)
    } else {
        return (<><button className="button is-warning" onClick={() => dispatch(swipe('out'))}>Swipe out</button></>)
    }
}

export default SwipeButtons