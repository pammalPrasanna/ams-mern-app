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

    if (user === null) {
        return (
            <div className='notification is-info is-light'>
                Its not you its us. We are working on it!
            </div>
        )
    }

    if (user.role === 1) {
        return <AdminDashboard />
    }

    if (user.role === 2) {
        return <MemberDashboard />
    }

}
