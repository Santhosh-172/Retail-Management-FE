import axios from "axios";
import React, { useEffect, useState } from "react";

const EditProduct = (props) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editableProduct, setEditableProduct] = useState({
    title: props.item[0].title,
    description: props.item[0].description,
    price: props.item[0].price,
    category: {
      id: selectedCategory,
    },
  });

  console.log(editableProduct);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7000/inventory-service/category/all")
      .then((response) => {
        setCategories(response.data);
      });
    console.log(props);
  }, []);

  const handleSubmit = () => {
    console.log("Inside Submit");
    props.onEditProduct(props.item[0].id, editableProduct);
    console.log(props.item[0].id);
  };

  return (
    <div>
      <div className="edit_form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Title"
            defaultValue={props.item[0].title}
            onChange={(e) =>
              setEditableProduct({
                ...editableProduct,

                title: e.target.value,
              })
            }
          />
        </div>
        <div className="form-group">
          <select
            defaultValue={props.item[0].category}
            className="form-control"
            onChange={(e) =>
              setEditableProduct({
                ...editableProduct,

                category: {
                  id: Number(e.target.value),
                },
              })
            }
            required
          >
            <option value="Choose a category">Choose a category</option>
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
                onClick={(event) => setSelectedCategory(event.target.value)}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Description"
            defaultValue={props.item[0].description}
            onChange={(e) =>
              setEditableProduct({
                ...editableProduct,

                description: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <input
            type="number"
            placeholder="Price"
            defaultValue={props.item[0].price}
            onChange={(e) =>
              setEditableProduct({
                ...editableProduct,

                price: e.target.value,
              })
            }
          />
        </div>

        <div className="btn btn-success" onClick={handleSubmit}>
          Save Changes
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
