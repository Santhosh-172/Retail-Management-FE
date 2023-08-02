import React, { useState, useEffect } from "react";
import axios from "axios";

const AddStock = (props) => {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");

  const submitHandler = () => {
    const newStock = {
      product: product,
      quantity: parseInt(quantity),
    };
    props.onAddNewStock(newStock, product.id);
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7000/inventory-service/product/all")
      .then((response) => {
        setProducts(response.data);
      });
  }, []);

  return (
    <div>
      <div className="row">
        <div>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label>Product:</label>
              <select
                defaultValue="Choose a product"
                className="form-control"
                onChange={(event) =>
                  setProduct(products.find((p) => p.id === +event.target.value))
                }
                required
              >
                <option value="Choose a product">Choose a product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Quantity:</label>
              <input
                type="number"
                min="1"
                className="form-control"
                onChange={(event) => setQuantity(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <div className="d-grid">
                <button className="btn btn-success" type="submit">
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStock;
