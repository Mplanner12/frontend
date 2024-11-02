import React, { useState } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import {
  HiBanknotes,
  HiMiniArrowDownTray,
  HiMiniArrowUpTray,
} from "react-icons/hi2";
import { BsClockHistory } from "react-icons/bs";

interface sideBarProps {
  activeSection: string;
  isMobileMenuOpen: boolean;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar = ({
  activeSection,
  setActiveSection,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: sideBarProps) => {
  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  //   const [activeSection, setActiveSection] = useState("Account Details");
  //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <aside className="w-64 min-h-screen bg-gray-800 p-6 hidden md:block shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Dashboard</h2>
      <nav className="space-y-4">
        <button
          onClick={() => handleNavClick("Account Details")}
          className={`w-full text-left text-gray-300 hover:bg-gray-700 p-3 rounded-lg flex items-center ${
            activeSection === "Account Details" ? "bg-gray-700" : ""
          }`}
        >
          <FaUserCircle className="h-5 w-5 mr-2" />
          Account Details
        </button>
        <button
          onClick={() => handleNavClick("Bank Accounts")}
          className={`w-full text-left text-gray-300 hover:bg-gray-700 p-3 rounded-lg flex items-center ${
            activeSection === "Bank Accounts" ? "bg-gray-700" : ""
          }`}
        >
          <HiBanknotes className="h-5 w-5 mr-2" />
          Bank Accounts
        </button>
        <button
          onClick={() => handleNavClick("Transaction History")}
          className={`w-full text-left text-gray-300 hover:bg-gray-700 p-3 rounded-lg flex items-center ${
            activeSection === "Transaction History" ? "bg-gray-700" : ""
          }`}
        >
          <BsClockHistory className="h-5 w-5 mr-2" />
          Transaction History
        </button>
        <button
          onClick={() => handleNavClick("Deposit Funds")}
          className={`w-full text-left text-gray-300 hover:bg-gray-700 p-3 rounded-lg flex items-center ${
            activeSection === "Deposit Funds" ? "bg-gray-700" : ""
          }`}
        >
          <HiMiniArrowDownTray className="h-5 w-5 mr-2" />
          Deposit
        </button>
        <button
          onClick={() => handleNavClick("Withdraw Funds")}
          className={`w-full text-left text-gray-300 hover:bg-gray-700 p-3 rounded-lg flex items-center ${
            activeSection === "Withdraw Funds" ? "bg-gray-700" : ""
          }`}
        >
          <HiMiniArrowUpTray className="h-5 w-5 mr-2" />
          Withdraw
        </button>
      </nav>
    </aside>
  );
};

export default SideBar;
