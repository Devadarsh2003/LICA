// import "../css/ProductCard.css"

// function ProductCard({ product }) {

//     function onFavoriteClick() {
//         console.log('Favorite button clicked');
//         alert("clicked favourites")
//     }

//     function onLinkClick({link}) {
//         console.log('Link button clicked');
//         alert("clicked link")
//     }

//   return (
//     <div className="product-card">
//       <div className="product-poster">
//         <img src={product.poster} alt={product.title} />
//         <div className="product-overlay">
//             <button className="favorite-btn" onClick={onFavoriteClick}>
//                 🤍
//             </button>
//         </div>
//       </div>
//       <div className="product-info">
//         <div className="product-overlay">
//             <h3>{product.title}</h3>
//             <a href={product.link} target="_blank" rel="noopener noreferrer">
//                 <button className="link-btn">🔗</button>
//              </a>
//         </div>
//         <h3>{product.title}</h3>
//         <p>Price: {product.price}</p>
//         <p>Rating: {product.rating}</p>
//       </div>
//     </div>
//   );
// }

// export default ProductCard

import { useState } from "react";
import "../css/ProductCard.css";

function ProductCard({ product }) {
  const [isFavorited, setIsFavorited] = useState(false);

  function onFavoriteClick() {
    setIsFavorited(!isFavorited);
  }

  return (
    <div className="product-card">
      <div className="product-poster">
        <img src={product.poster} alt={product.title} />
        <div className="product-overlay">
          <button 
            className={`favorite-btn ${isFavorited ? "favorited" : ""}`} 
            onClick={onFavoriteClick}
          >
            ❤️
          </button>
        </div>
      </div>
      <div className="product-info">
        <div className="product-overlay">
          <h3>{product.title}</h3>
          <a href={product.link} target="_blank" rel="noopener noreferrer">
            <button className="link-btn">🔗</button>
          </a>
        </div>
        <h3>{product.title}</h3>
        <p>Price: {product.price}</p>
        <p>Rating: {product.ratings}</p>
      </div>
    </div>
  );
}

export default ProductCard;
