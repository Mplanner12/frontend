import { useState } from "react";
import axiosInstance, { createPayPalOrder, mockDeposit } from "../lib/utils";

const DepositComponent = ({ onDeposit }: any) => {
  const [_amount, setAmount] = useState<any>();

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
        className="h-[2.25rem] border rounded-md border-orange-500 text-orange-500 bg-blue-950 hover:bg-blue-950 hover:text-white"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onDeposit(_amount);
        }}
      >
        Deposit with PayPal
      </button>
    </form>
  );
};

export default DepositComponent;
