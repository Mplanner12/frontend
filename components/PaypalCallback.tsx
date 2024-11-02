import { useEffect } from "react";
import { useRouter } from "next/router";
import { capturePayPalTransaction } from "../lib/utils";

const PayPalCapture = () => {
  const router = useRouter();
  const { orderId } = router.query;

  useEffect(() => {
    if (orderId) {
      capturePayPalTransaction(orderId);
    }
  }, [orderId]);

  return <p>Processing your PayPal transaction...</p>;
};

export default PayPalCapture;
