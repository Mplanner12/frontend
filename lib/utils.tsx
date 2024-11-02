import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

// Add a request interceptor to attach the token to each request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("Access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response && response.status === 401) {
      localStorage.removeItem("Access_token");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

export const mockDeposit = async (amount: any) => {
  try {
    const response = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_API_URL}/deposit`,
      { amount }
    );
    if (response.status !== 200) throw new Error("Failed to deposit");
    const data = await response;
    console.log(data);
  } catch (error) {
    console.error("Deposit failed:", error);
    throw error;
  }
};

export const mockWithdraw = async (amount: Float32Array) => {
  try {
    const response = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_API_URL}/withdraw`,
      { amount }
    );
    if (response.status !== 200) throw new Error("Failed to withdraw");
    const data = await response;
    console.log(data);
  } catch (error) {
    console.error("Withdrawal failed:", error);
    throw error;
  }
};

export const createPayPalOrder = async (amount: any) => {
  try {
    const response = await axiosInstance.post("/deposit/paypal", { amount });
    const { id, links } = response.data;

    // Find the PayPal approval link
    const approvalLink = links.find((link: any) => link.rel === "approve").href;

    // Redirect the user to PayPal for approval
    window.location.href = approvalLink;
  } catch (error: any) {
    console.error(
      "PayPal order creation failed:",
      error.response?.data || error.message
    );
  }
};

export const capturePayPalTransaction = async (orderId: any) => {
  try {
    const response = await axiosInstance.post("/deposit/paypal/capture", {
      orderId,
    });
    alert(response.data.message);
  } catch (error: any) {
    console.error(
      "PayPal capture failed:",
      error.response?.data || error.message
    );
  }
};
