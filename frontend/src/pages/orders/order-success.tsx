import { useRouter } from 'next/router';

const OrderSuccess = () => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof window === "undefined" || !router.isReady) return null;

  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold text-pink-600 mb-4">🎉 Order Successful!</h1>
      <p className="mb-4">Thank you for your purchase.</p>
      <p>Your order ID is: <span className="font-mono">{id}</span></p>

      <button
        onClick={() => router.push('/')}
        className="mt-6 bg-pink-600 text-white px-6 py-2 rounded"
      >
        Back to Home
      </button>
    </div>
  );
};

export default OrderSuccess;
