import Link from 'next/link';
import useLogoutAuth from '../src/hooks/logoutAuth'
import DefaultLayout from '../src/component/Layouts/DefaultLayout'

export default function Admin  () {
    const { logout } = useLogoutAuth();
    return (
        <>
            {/* <aside className="sidebar">
                <h2>Admin Menu</h2>
                <ul>
                    <li>
                        <Link href="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/admin/users">Users</Link>
                    </li>
                    <li>
                        <Link href="/admin/settings">Settings</Link>
                    </li>
                </ul>
            </aside> */}
            <main className="content">
                <h1>Admin Dashboard</h1>
                <button 
                onClick={logout}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
                Logout here !
            </button>
                {/* Default content or instructions */}
            </main>
        </>
    );
};

Admin.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>