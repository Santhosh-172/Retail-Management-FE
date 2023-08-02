import React, { useState } from "react";
import axios from "axios";

const CustomerSearch = ({ onSelectCustomer }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customer, setCustomer] = useState(null);

  const handleSearch = () => {
    axios
      .get(
        `http://localhost:7000/inventory-service/customer/getByPhoneNumber/${phoneNumber}`
      )
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customer:", error.response.data);
        setCustomer(null);
      });
  };

  return (
    <div className="card">
      <div className="card-header">Search Customer by Phone Number</div>
      <div className="card-body">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
        {customer && (
          <div>
            <strong>Customer Name:</strong> {customer.name}
            <br />
            <strong>Phone Number:</strong> {customer.phoneNumber}
            <br />
            <button
              className="btn btn-success mt-2"
              onClick={() => onSelectCustomer(customer)}
            >
              Select Customer
            </button>
          </div>
        )}
        {!customer && <div>No customer found for the given phone number.</div>}
      </div>
    </div>
  );
};

export default CustomerSearch;
