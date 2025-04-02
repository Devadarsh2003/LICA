import "../css/Home.css";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSearched) {
      document
        .querySelector(".search-container")
        .scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isSearched]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearched(true);
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/get_recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data = await response.json();
      
      // Extracting product details from API response
      const extractedProducts = data.products.map((product) => {
        const amazon = product.platforms.amazon;
        return amazon ? {
          title: amazon.title,
          poster: amazon.poster,
          price: amazon.price,
          ratings: amazon.ratings,
          total: amazon.total,
          link: amazon.link,
        } : null;
      }).filter(product => product !== null);

      setProducts(extractedProducts);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <NavBar />
      <div className="header-container">
        <h2>LICA</h2>
        <p>Find. Compare. Save. With LICA.</p>
      </div>
      <div className={`search-container ${isSearched ? "moved" : ""}`}>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for the best deals..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <p>🔄 Loading results...</p>
      ) : (
        products.length > 0 ? (
          <div className="product-grid">
            {products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        ) : (
          isSearched && <p>No products found.</p>
        )
      )}
    </div>
  );
}

export default Home;