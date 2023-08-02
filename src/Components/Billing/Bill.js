import React from "react";

const Bill = (billing) => {
  console.log(billing);
  console.log(billing.bill.customer.name);

  return (
    <div>
      <h2>Billing Details</h2>
      <div>
        {" "}
        <strong>Bill Id:</strong> {billing.bill.id}
      </div>
      <div>
        <strong>Customer:</strong> {billing.bill.customer.name} -{" "}
        {billing.bill.customer.phoneNumber}
      </div>
      <div>
        <strong>Date:</strong> {billing.bill.date}
      </div>

      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {billing.bill.product.map((product, index) => (
              <tr key={index}>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{billing.bill.productQuantities[index]}</td>
                <td>${billing.bill.productPrices[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <strong>NetPrice:</strong>
        {billing.bill.netPrice + billing.bill.redeemPoints}
      </div>
      <div>
        <strong>Redeemed Points:</strong>
        {billing.bill.redeemPoints}
      </div>
      <div>
        <strong>FinalPrice:</strong>
        {billing.bill.netPrice}
      </div>
    </div>
  );
};

export default Bill;
