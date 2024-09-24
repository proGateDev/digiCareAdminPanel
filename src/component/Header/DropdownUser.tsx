import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "../ClickOutside";
import { useRouter } from 'next/router';
import useAuth from "../../hooks/useAuth"; // Assuming this is correctly exported
import axios from "axios";

const DropdownUser = () => {
  const { getJwtToken, logout } = useAuth(); // Destructure logout as well
  const bearerToken = getJwtToken();
  const [profileData, setProfileData] = useState(null); // Initialize profileData as null
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout(router);
    setDropdownOpen(false);
  };

  // Function to get admin profile data
  const getAdminProfile = async () => {
    try {
      const response = await axios.get('http://192.168.0.172:8000/admin/profile', {
        headers: {
          'Authorization': `Bearer ${bearerToken}`
        }
      });
      setProfileData(response?.data?.user); // Set profile data
      console.log('Profile Data:', response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  // Fetch profile data when the component mounts
  useEffect(() => {
    if (bearerToken) {
      getAdminProfile();
    }
  }, [bearerToken]); // Dependency on bearerToken, so the effect runs when the token is available
console.log(profileData,'---');

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        {/* User Display Info */}
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {profileData?.name } {/* Display the admin's name if available */}
          </span>
          <span className="block text-xs">{profileData?.role}</span>
        </span>
        <span className="h-12 w-12 rounded-full">
          <Image
            width={112}
            height={112}
            src={profileData?.avatar || "/imgaes/iconAdmin.png"} // Use profile avatar if available
            style={{ width: "auto", height: "auto" }}
            alt="User"
          />
        </span>
      </Link>

      {dropdownOpen && (
        <div className="absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
            <li>
              <Link
                href="/profile"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                My Profile
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
