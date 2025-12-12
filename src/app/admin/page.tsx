import AdminDashboard from '@/components/Admin/AdminDashboard';

// In a real app, this would check sessions on the server.
// For now, we render the dashboard directly, assuming "Access Granted" for demonstration.
export const metadata = {
    title: 'Admin | VIBESTOSTARDOM',
};

export default function AdminPage() {
    return <AdminDashboard />;
}
