import { useState } from "react";
import axiosInstance, { mockWithdraw } from "../lib/utils";

const WithdrawComponent = ({ onWithdrawal }: any) => {
  const [_amount, setAmount] = useState("");

  return (
    <form className="flex flex-col space-y-2">
      <label>Amount:</label>
      <input
        className="h-[2.25rem] text-black bg-slate-100"
        type="number"
        value={_amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          onWithdrawal(_amount);
        }}
        className="h-[2.25rem] border rounded-md border-orange-500 text-orange-500 bg-blue-950 hover:bg-blue-950 hover:text-white"
        type="submit"
      >
        Withdraw
      </button>
    </form>
  );
};

export default WithdrawComponent;
