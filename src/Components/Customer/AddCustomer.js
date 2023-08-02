import axios from "axios";
import React, { useState } from "react";

const AddCustomer = (props) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(value)) {
      setPhoneNumberError("Invalid phone number. It should be 10 digits.");
    } else {
      setPhoneNumberError("");
    }
  };

  const submitHandler = () => {
    let newCustomer = {
      name: name,
      phoneNumber: phoneNumber,
      address: address,
    };
    props.onAddNewCustomer(newCustomer);
  };

  return (
    <div>
      <div className="row">
        <div>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="text"
                className="form-control"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                required
              />
              {phoneNumberError && (
                <span className="text-danger">{phoneNumberError}</span>
              )}
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                onChange={(event) => setAddress(event.target.value)}
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

export default AddCustomer;
