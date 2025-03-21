/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const UserComp = ({user}) => {
    return (
        <div>
        <li key={user._id} className="py-3">
            <Link
            to={`/dreams/${user._id}`}
            className="text-lg font-semibold text-black-600 hover:text-blue-700 hover:underline transition duration-300">
            {user.username}
            </Link>
        </li>
        </div>
    );
};

export default UserComp;
