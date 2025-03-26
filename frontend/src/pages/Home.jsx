// import "../css/Home.css";
// import ProductCard from "../components/ProductCard";
// import { useState, useEffect } from "react";
// import NavBar from "../components/NavBar";

// function Home() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [products, setProducts] = useState([]);
//   const [isSearched, setIsSearched] = useState(false);
//   const [loading, setLoading] = useState(false);

//   /*const dummyProducts = [
//     {
//       title: "Samsung Galaxy S23",
//       poster: "https://m.media-amazon.com/images/I/71RnJXDexML._SX425_.jpg",
//       price: "$799",
//       ratings: "4.5⭐",
//       total: "10,432 reviews",
//       link: "https://www.amazon.in/Samsung-Galaxy-Green-256GB-Storage/dp/B0BT9DVZLZ?th=1",
//     },
//     {
//       title: "Apple iPhone 15 Pro",
//       poster: "https://m.media-amazon.com/images/I/61O3kh6qpvL._SX466_.jpg",
//       price: "$999",
//       ratings: "4.7⭐",
//       total: "20,567 reviews",
//       link: "https://www.amazon.in/Apple-iPhone-15-Pro-128/dp/B0CHX2DRGV?th=1",
//     },
//     {
//       title: "Google Pixel 8",
//       poster: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/e/y/x/-original-imagtwh5zrcy9hfj.jpeg?q=70&crop=false0",
//       price: "$699",
//       ratings: "4.6⭐",
//       total: "8,765 reviews",
//       link: "https://www.flipkart.com/google-pixel-8-hazel-128-gb/p/itm67e2a2531aaac?pid=MOBGT5F2WD8HPTPZ",
//     },
//   ];*/

//   useEffect(() => {
//     if (isSearched) {
//       document
//         .querySelector(".search-container")
//         .scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   }, [isSearched]);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setIsSearched(true);
//     setLoading(true);
  
//     try {
//       const response = await fetch("http://127.0.0.1:8000/get_recommendations", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ query: searchQuery }),
//       });
  
//       if (!response.ok) {
//         throw new Error("Failed to fetch recommendations");
//       }
  
//       const data = await response.json();
//       setProducts(data); // Directly storing the list
//     } catch (error) {
//       console.error("Error fetching recommendations:", error);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   // Store products in a variable before returning JSX
//   const productList = products.length > 0 ? (
//     <div className="product-grid">
//       <p>{productList}</p>
//       {products.map((product, index) => (
//         <ProductCard product={product} key={index} />
//       ))}
//     </div>
//   ) : (
//     isSearched && !loading && <p>No products found.</p>
//   );

//   return (
//     <div className="home">
//       <NavBar />
//       <div className={`search-container ${isSearched ? "moved" : ""}`}>
//         <form onSubmit={handleSearch} className="search-form">
//           <input
//             type="text"
//             placeholder="Search for the best deals..."
//             className="search-input"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button type="submit" className="search-button">
//             Search
//           </button>
//         </form>
//       </div>

//       {/* Show Loading, Products, or No Results */}
//       {loading ? <p>🔄 Loading results...</p> : productList}
//     </div>
//   );
// }

// export default Home;

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