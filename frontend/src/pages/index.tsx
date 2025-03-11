import MainLayout from '../components/layout/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <section className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          Welcome to Bake Store! 🍰
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-xl">
          Discover and order delicious homemade cakes.
        </p>
        <button className="px-6 py-3 bg-pink-600 text-white font-semibold rounded-lg shadow hover:bg-pink-700 transition">
          Shop Now
        </button>
      </section>
    </MainLayout>
  );
}
