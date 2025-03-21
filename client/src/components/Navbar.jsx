import {Link} from 'react-router-dom'
import image from '../assets/image.png'

const Navbar = () => {
    return (
      <>
        <nav>
          <section className="relative flex flex-row items-center justify-between ">
            <Link to="/">
              <img src={image} alt="" className=" absolute top-5 left-5 h-20 w-20 rounded-full " />
            </Link>
            <section className="relative flex flex-row items-center justify-end ">
              <Link to="/add-dream" className="relative z-10">
                <button className="mt-8 px-6 py-2 mx-2 text-lg font-semibold border-2 rounded-lg">
                  Add Dream
                </button>
              </Link>
              <Link to="/users">
                <button className="mt-8 px-6 py-2 mx-2 text-lg font-semibold border-2 rounded-lg">
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
