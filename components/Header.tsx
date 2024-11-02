import React, { CSSProperties } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import axiosInstance from "../lib/utils";
import { useStateContext } from "../context/useStateContext";
import Link from "next/link";

interface headerProps {
  userLoading: boolean;
  isMobileMenuOpen: boolean;
  setUserLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

const TopHeader = ({
  userLoading,
  setUserLoading,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: headerProps) => {
  const { user, setUser, setToken } = useStateContext();

  const handleLogout = () => {
    localStorage.removeItem("token");
    axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/logout`);
    setUser(null);
    setToken(null);
    window.location.href = "/auth/login";
  };

  return (
    <header className="bg-gray-800 w-full px-4 py-4 flex items-center justify-between">
      <div className="text-xl font-semibold">
        <span className="text-orange-400">Fin</span>Track
      </div>
      <div className="text-xl font-semibold">
        {" "}
        {userLoading ? (
          <ClipLoader
            cssOverride={override}
            color="#f06f13"
            loading={userLoading}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : user ? (
          user.name
        ) : (
          ""
        )}
      </div>
      <div className="hidden md:flex space-x-4">
        {userLoading ? (
          <ClipLoader
            cssOverride={override}
            color="#f06f13"
            loading={userLoading}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : user ? (
          <>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/auth/login"
              className="px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-500"
            >
              Register
            </Link>
          </>
        )}
      </div>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden text-gray-300 hover:text-white"
      >
        <FaBars className="h-6 w-6" />
      </button>
    </header>
  );
};

export default TopHeader;
