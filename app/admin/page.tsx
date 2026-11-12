import { redirect } from 'next/navigation';
import { isAdminRequest } from '../lib/adminAuth';
import AdminDashboard from './AdminDashboard';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
    if (!isAdminRequest()) redirect('/admin/login');
    return <AdminDashboard />;
}
