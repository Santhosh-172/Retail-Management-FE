import React, { useState } from "react";
import axios from "axios";

const ProductSearch = ({ onSelectProduct }) => {
  const [productName, setProductName] = useState("");
  const [products, setProducts] = useState([]);

  const handleSearch = () => {
    axios
      .get(
        `http://localhost:7000/inventory-service/product/search/${productName}`
      )
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error.response.data);
        setProducts([]);
      });
  };

  return (
    <div className="card">
      <div className="card-header">Search Product by Name</div>
      <div className="card-body">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
        {products.length > 0 && (
          <div>
            <strong>Found {products.length} Products:</strong>
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  {product.title} - Rs {product.price}
                  <button
                    className="btn btn-success ml-2"
                    onClick={() => onSelectProduct(product)}
                  >
                    Select Product
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {products.length === 0 && (
          <div>No products found for the given name.</div>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
