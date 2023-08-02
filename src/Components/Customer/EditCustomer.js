import axios from "axios";
import React, { useEffect, useState } from "react";

const EditCustomer = (props) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (props.item && props.item.length > 0) {
      setName(props.item[0].name);
      setPhoneNumber(props.item[0].phoneNumber);
      setAddress(props.item[0].address);
    }
  }, [props.item]);

  const handleSubmit = () => {
    const editedCustomer = {
      name: name,
      phoneNumber: phoneNumber,
      address: address,
    };

    props.onEditCustomer(props.item[0].id, editedCustomer);
  };

  return (
    <div>
      <div className="edit_form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            defaultValue={props.item[0].name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Phone Number"
            defaultValue={props.item[0].phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Address"
            defaultValue={props.item[0].address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="btn btn-success" onClick={handleSubmit}>
          Save Changes
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
