import { useEffect, useState } from "react";
import "./App.css";

interface Iproducts {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  image: {
    src: string;
    altName: string;
  };
}


function App() {
  const [products, setProducts] = useState<Iproducts[]>([]);
  const [loading, setloading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/product", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const data = await response.json();
        setProducts(data?.data?.products || []);

      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setloading(false);
      }
    }
    fetchData();
  }, []);


  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Fetching products...</p>
        </div>
      </div>
    );
  }

return (
  <div className="min-h-screen bg-gray-50 p-6">
    <div className="max-w-7xl mx-auto">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Our Collection</h1>
        <p className="mt-2 text-lg text-gray-600">Premium products delivered to your door.</p>
      </header>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product: Iproducts) => (
          <div 
            key={product._id} 
            className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Image Section */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <img
                src={product.image.src}
                alt={product.image.altName}
                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-700 shadow-sm backdrop-blur-sm">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-bold text-gray-900">${product.price}</span>
                <div className="flex items-center text-yellow-500">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-sm font-semibold text-gray-600">{product.rating}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                {product.title}
              </h3>
              
              <p className="mt-2 text-sm text-gray-500 line-clamp-2 flex-1">
                {product.description}
              </p>

              <button className="mt-5 w-full rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 active:scale-95">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

}

export default App;
