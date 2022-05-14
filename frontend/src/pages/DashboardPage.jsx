import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'



export default function DashboardPage() {

    const navigate = useNavigate();

    const { user } = useSelector((store) => store.auth);

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user, navigate])

    return (
        <div>DashboardPage</div>
    )
}
