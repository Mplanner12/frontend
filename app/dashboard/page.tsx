"use client";
import Link from "next/link";
import { useEffect, useState, CSSProperties } from "react";
import axiosInstance from "../../lib/utils";
import { useStateContext } from "../../context/useStateContext";
import ClipLoader from "react-spinners/ClipLoader";
import DepositComponent from "../../components/Deposit";
import WithdrawComponent from "../../components/Withdraw";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "../../components/SideBar";
import TopHeader from "../../components/Header";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

export default function Dashboard() {
  const { user, setUser, setToken } = useStateContext();
  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [accountsLoading, setAccountsLoading] = useState<boolean>(false);
  const [transactionsLoading, setTransactionsLoading] =
    useState<boolean>(false);
  const [transactions, setTransactions] = useState<any>([]);
  const [linkedAccounts, setLinkedAccounts] = useState<any>([]);
  const [activeSection, setActiveSection] = useState("Account Details");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [fetchedTransactions, setFetchedTransactions] = useState(false);

  const fetchUserData = async () => {
    setUserLoading(true);
    try {
      const userResponse = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user-profile`
      );
      setUser(userResponse.data.user);
      console.log(userResponse.data);
      setToken(userResponse.data.access_token);
    } catch (error) {
      console.error(error);
    }
    setUserLoading(false);
  };
  const fetchUserTransactions = async () => {
    setTransactionsLoading(true);
    try {
      const transactionResponse = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions`
      );
      console.log(transactionResponse.data.transactions);
      setTransactions(transactionResponse.data.transactions);
    } catch (error) {
      console.error(error);
    }
    setTransactionsLoading(false);
  };
  const fetchUserAccounts = async () => {
    setAccountsLoading(true);
    try {
      const accountsResponse = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/linked-accounts`
      );
      setLinkedAccounts(accountsResponse.data.linked_accounts);
      console.log(accountsResponse.data.linked_accounts);
    } catch (error) {
      console.error(error);
    }
    setAccountsLoading(false);
  };
  useEffect(() => {
    fetchUserData();
    fetchUserAccounts();
    fetchUserTransactions();
  }, []);

  useEffect(() => {
    if (activeSection === "Transaction History") {
      fetchUserTransactions();
      setFetchedTransactions(true);
    }
  }, [activeSection]);

  const handleAddAccount = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/link-paypal`
      );
      if (response.status === 200) {
        fetchUserAccounts();
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveAccount = async (id: any) => {
    try {
      const response = await axiosInstance.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/user/linked-accounts/${id}`
      );
      if (response.status === 200) {
        fetchUserAccounts();
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeposit = async (_amount: any) => {
    try {
      const amount = parseFloat(_amount);
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/deposit`,
        { amount }
      );
      if (response.status !== 201) throw new Error("Failed to deposit");
      const data = await response;
      toast.success("Deposit successful!");
    } catch (error) {
      console.error("Deposit failed:", error);
      toast.error("Deposit failed. Please try again later.");
    }
  };

  const handleWithdraw = async (_amount: any) => {
    const amount = parseFloat(_amount);
    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/withdraw`,
        { amount }
      );
      if (response.status !== 201) throw new Error("Failed to withdraw");
      const data = await response;
      console.log(data);
      toast.success("Withdrawal successful!");
    } catch (error) {
      console.error("Withdrawal failed:", error);
      toast.error("Withdrawal failed. Please try again later.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <SideBar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <div className="flex-1 bg-gray-900 text-white">
        {/* Top Bar */}
        <TopHeader
          userLoading={userLoading}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          setUserLoading={setUserLoading}
        />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <ToastContainer />
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Conditionally render sections based on activeSection */}
            {activeSection === "Account Details" && (
              <section className="p-6 rounded-lg bg-gray-800 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Account Details</h3>
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
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span>{user?.email ?? "me@domain.com"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Account Balance:</span>
                      <span>${user.balance}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <span>no data</span>
                  </div>
                )}
              </section>
            )}

            {activeSection === "Bank Accounts" && (
              <section className="p-6 rounded-lg bg-gray-800 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">
                  Linked Bank Accounts
                </h3>
                <div className="space-y-2">
                  {/* Existing Account Display */}
                  {accountsLoading ? (
                    <ClipLoader
                      cssOverride={override}
                      color="#f06f13"
                      loading={accountsLoading}
                      size={25}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : linkedAccounts ? (
                    linkedAccounts.map((account: any, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <span>Account Name: {account.provider}</span> <br />
                          <span>
                            {(
                              "account = " +
                              account.account_email +
                              "; let lastFourDigits = account.account_email.slice(-6);"
                            ).slice(0, 0)}
                            Account email: **** ****
                            {account.account_email.slice(-6)}
                          </span>
                        </div>
                        <button
                          className="px-3 py-1 rounded-md bg-red-500 text-sm hover:bg-red-600"
                          onClick={() => {
                            console.log(account.account_id);
                            handleRemoveAccount(account.account_id);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  ) : (
                    <span className="my-[2rem]">"No accounts found"</span>
                  )}

                  {/* Add Account Button */}
                  <button
                    className="w-full py-2 rounded-lg bg-green-500 hover:bg-green-600 text-center"
                    onClick={() => handleAddAccount()}
                  >
                    Add Paypal Account
                  </button>
                </div>
              </section>
            )}

            {activeSection === "Transaction History" && (
              <section className="p-6 rounded-lg bg-gray-800 shadow-lg overflow-y-scroll max-h-[calc(100vh-130px)]">
                <h3 className="text-xl font-semibold mb-4">
                  Transaction History
                </h3>
                {transactionsLoading ? (
                  <ClipLoader
                    cssOverride={override}
                    color="#f06f13"
                    loading={transactionsLoading}
                    size={25}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  <div className="space-y-2">
                    {transactions.map((transaction: any) => (
                      <div
                        key={transaction.id}
                        className="h-full flex justify-between text-gray-300"
                      >
                        <span>
                          {new Date(
                            transaction.created_at
                          ).toLocaleDateString()}
                        </span>
                        <span
                          className={
                            transaction.type === "deposit"
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {transaction.type === "deposit" ? "+" : "-"}$
                          {parseFloat(transaction.amount).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {activeSection === "Deposit Funds" && (
              <section className="p-6 rounded-lg bg-gray-800 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Deposit Funds</h3>
                <DepositComponent onDeposit={handleDeposit} />
              </section>
            )}

            {activeSection === "Withdraw Funds" && (
              <section className="p-6 rounded-lg bg-gray-800 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Withdraw Funds</h3>
                <WithdrawComponent onWithdrawal={handleWithdraw} />
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
