import React, { useState, useEffect } from "react";
import axios from "axios";

const AddProduct = (props) => {
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [prodDescription, setProdDescription] = useState("");
  const [prodPrice, setProdPrice] = useState("");

  const submitHandler = () => {
    let newProduct = {
      title: productName,
      description: prodDescription,
      price: prodPrice,
    };
    props.onAddNewProduct(newProduct, category);
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7000/inventory-service/category/all")
      .then((response) => {
        setCategories(response.data);
      });
    console.log(props);
  }, []);

  return (
    <div>
      <div className="row">
        <div>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                className="form-control"
                onChange={(event) => setProductName(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                className="form-control"
                onChange={(event) => setProdDescription(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Price:</label>
              <input
                type="Number"
                className="form-control"
                onChange={(event) => setProdPrice(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                defaultValue="Choose a category"
                className="form-control"
                onChange={(event) => setCategory(event.target.value)}
                required
              >
                <option value="Choose a category">Choose a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
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

export default AddProduct;
