import axios from "axios";
import React, { useEffect, useState } from "react";

const BillingTable = () => {
  const [billings, setBillings] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterCustomer, setFilterCustomer] = useState("");
  const [filterNetPrice, setFilterNetPrice] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:7000/billing-service/billing/all")
      .then((response) => {
        setBillings(response.data);
      });
  }, []);

  const handleFilter = () => {
    const queryParams = {};

    if (filterDate) {
      queryParams.date = filterDate;
    }

    if (filterCustomer) {
      queryParams.customer = filterCustomer;
    }

    if (filterNetPrice !== 0) {
      queryParams.netPrice = filterNetPrice;
    }

    axios
      .get("http://localhost:7000/billing-service/billing/filter", {
        params: queryParams,
      })
      .then((response) => {
        setBillings(response.data);
      })
      .catch((error) => {
        console.error("Error filtering billings:", error);
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Billing History</h2>
      <div className="mb-3">
        <label htmlFor="filterDate" className="form-label">
          Filter by Date:
        </label>
        <input
          type="date"
          id="filterDate"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="filterCustomer" className="form-label">
          Filter by Customer:
        </label>
        <input
          type="text"
          id="filterCustomer"
          value={filterCustomer}
          onChange={(e) => setFilterCustomer(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="filterNetPrice" className="form-label">
          Filter by Net Price:
        </label>
        <input
          type="number"
          id="filterNetPrice"
          value={filterNetPrice}
          onChange={(e) => setFilterNetPrice(e.target.value)}
        />
      </div>
      <button onClick={handleFilter}>Filter</button>
      <div className="table-responsive">
        <table className="table  table-striped">
          <thead className="table-dark">
            <tr>
              <th>Customer</th>
              <th>Products</th>
              <th>Quantities</th>
              <th>Net Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {billings.map((billing) => (
              <tr key={billing.id}>
                <td>{billing.customer.name}</td>
                <td>
                  {billing.product.map((product) => (
                    <div key={product.id}>{product.title}</div>
                  ))}
                </td>
                <td>
                  {billing.productQuantities.map((quantity) => (
                    <div key={quantity}>{quantity}</div>
                  ))}
                </td>
                <td>{billing.netPrice}</td>
                <td>{billing.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillingTable;
