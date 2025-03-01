import { useNavigate } from "react-router-dom";
import { auth } from "../auth/firebaseConfig";

function UserProfile() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await auth.signOut();
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center bg-white p-1 rounded-lg shadow border border-gray-200 w-24">
            <img
                src={
                    auth.currentUser?.photoURL ||
                    "https://randomuser.me/api/portraits/men/75.jpg"
                }
                className="w-6 h-6 rounded-full border border-purple-500"
                alt="User Avatar"
            />
            <span className="text-gray-800 font-semibold text-[10px] mt-1 text-center">
                {auth.currentUser?.displayName || "Guest"}
            </span>
            <button
                onClick={handleLogout}
                className="mt-1 px-1 py-0.5 bg-red-500 text-white rounded text-[9px] hover:bg-red-600"
            >
                Logout
            </button>
        </div>
    );
}

export default UserProfile;
