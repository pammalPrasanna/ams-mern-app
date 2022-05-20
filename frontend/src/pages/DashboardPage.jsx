import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import AdminDashboard from '../components/AdminDashboard';
import MemberDashboard from '../components/MemberDashboard';

export default function DashboardPage() {

    const navigate = useNavigate();

    const { user } = useSelector((store) => store.auth);

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])


    if (user.role === 1) {
        return <AdminDashboard />
    }

    if (user.role === 2) {
        return <MemberDashboard />
    }
    return (
        <div>DashboardPage</div>
    )
}
