import axios from "axios";
import React, { useEffect, useState } from "react";

const EditStock = (props) => {
  const [quantity, setQuantity] = useState("");

  const handleSubmit = () => {
    const updatedStock = {
      product: props.item[0].product,
      quantity: parseInt(quantity),
      dateOfSupply: props.item[0].dateOfSupply,
    };
    console.log(props);
    props.onEditStock(props.item[0].id, updatedStock);
  };

  return (
    <div>
      <div className="edit_form">
        <div className="form-group">
          <input
            type="number"
            placeholder="Quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="btn btn-success" onClick={handleSubmit}>
          Save Changes
        </div>
      </div>
    </div>
  );
};

export default EditStock;
