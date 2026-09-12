import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <nav className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
                <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-ink">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-base text-white" aria-hidden="true">☾</span>
                    <span>Weird Dreams</span>
                </Link>
                <div className="flex items-center gap-2 sm:gap-3">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/dreams"
                                className="rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-slate-100 hover:text-ink"
                            >
                                Journal
                            </Link>
                            <Link
                                to="/add-dream"
                                className="rounded-lg bg-ink px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                            >
                                + Log dream
                            </Link>
                            <div className="relative group">
                                <button className="flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-ink hover:border-slate-300">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft text-xs font-bold text-accent">
                                        {(user?.username || 'U')[0].toUpperCase()}
                                    </span>
                                    <span className="hidden sm:inline">{user?.username || 'Profile'}</span>
                                </button>
                                <div className="invisible absolute right-0 mt-2 w-56 rounded-xl border border-line bg-white opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
                                    <div className="border-b border-line px-4 py-3">
                                        <p className="text-xs text-muted">Logged in as</p>
                                        <p className="truncate text-sm font-semibold text-ink">{user?.username}</p>
                                        <p className="truncate text-xs text-muted">{user?.email}</p>
                                    </div>
                                    <Link to="/dreams" className="block px-4 py-2 text-sm text-ink hover:bg-slate-50">
                                        My Dreams
                                    </Link>
                                    <Link to="/users" className="block px-4 py-2 text-sm text-ink hover:bg-slate-50">
                                        Dreamers
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full border-t border-line px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-slate-100 hover:text-ink"
                            >
                                Sign in
                            </Link>
                            <Link
                                to="/signup"
                                className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                            >
                                Get started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar

