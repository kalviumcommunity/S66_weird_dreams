import {Link} from 'react-router-dom'
import image from '../assets/image.png'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth()

    return (
      <>
        <nav>
          <section className="relative flex flex-row items-center justify-between ">
            <Link to="/">
              <img src={image} alt="" className=" absolute top-5 left-5 h-20 w-20 rounded-full " />
            </Link>
            <section className="relative flex flex-row items-center justify-end ">
              {isAuthenticated ? (
                <>
                  <Link to="/add-dream" className="relative z-10">
                    <button className="mt-8 px-6 py-2 mx-2 text-lg font-semibold border-2 rounded-lg hover:bg-purple-600 transition">
                      Add Dream
                    </button>
                  </Link>
                  <div className="relative z-10 group">
                    <button className="mt-8 px-6 py-2 mx-2 text-lg font-semibold border-2 rounded-lg hover:bg-purple-600 transition">
                      {user?.username || 'Profile'} 👤
                    </button>
                    <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg z-50">
                      <div className="px-4 py-3 border-b border-gray-700">
                        <p className="text-sm text-gray-300">Logged in as</p>
                        <p className="font-semibold text-white">{user?.username}</p>
                        <p className="text-xs text-gray-400">{user?.email}</p>
                      </div>
                      <Link to="/dreams" className="block px-4 py-2 text-gray-300 hover:bg-purple-600 hover:text-white">
                        My Dreams
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:bg-red-600 hover:text-white border-t border-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="relative z-10">
                    <button className="mt-8 px-6 py-2 mx-2 text-lg font-semibold border-2 rounded-lg hover:bg-purple-600 transition">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup" className="relative z-10">
                    <button className="mt-8 px-6 py-2 mx-2 text-lg font-semibold border-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
              <Link to="/users">
                <button className="mt-8 px-6 py-2 mx-2 text-lg font-semibold border-2 rounded-lg hover:bg-purple-600 transition">
                  Created By
                </button>
              </Link>
            </section>
          </section>
        </nav>
      </>
    );
}

export default Navbar
