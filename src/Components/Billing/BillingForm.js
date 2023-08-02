import React, { useState } from "react";
import axios from "axios";
import CustomerSearch from "./CustomerSearch";
import ProductSearch from "./ProductSearch";
import Bill from "./Bill";
import { Alert, Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import ModalDialog from "../Modal/ModalDialog";

const BillingForm = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productQuantities, setProductQuantities] = useState([]);
  const [netPrice, setNetPrice] = useState(0);
  const [loyaltyPointsToRedeem, setLoyaltyPointsToRedeem] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [bill, setBill] = useState();
  const [show, setShow] = useState(false);
  const [showbill, setShowBill] = useState(false);

  const handleLoyaltyPointsRedeem = (event) => {
    // Calculate the maximum loyalty points that can be redeemed (equal to net price)
    // const maxRedeemablePoints = Math.min(
    //   netPrice,
    //   selectedCustomer.loyaltyPoints
    // );
    // setLoyaltyPointsToRedeem(event.target.value);

    setNetPrice(netPrice - loyaltyPointsToRedeem);
  };

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleProductSelect = (product) => {
    setSelectedProducts([...selectedProducts, product]);
    setProductQuantities([...productQuantities, 1]); // Default quantity is 1
  };

  const handleProductQuantityChange = (index, quantity) => {
    const updatedQuantities = [...productQuantities];
    updatedQuantities[index] = quantity;
    setProductQuantities(updatedQuantities);
  };

  const calculateNetPrice = () => {
    const totalPrice = selectedProducts.reduce(
      (total, product, index) =>
        total + product.price * productQuantities[index],
      0
    );
    setNetPrice(totalPrice);
  };
  const handle = () => {
    setShowBill(!showbill);
  };

  const handleSubmitBilling = () => {
    // Create the billing object to send to the backend

    // const finalNetPrice = Math.max(netPrice - loyaltyPointsToRedeem, 0);
    const newBilling = {
      customerId: selectedCustomer.id,
      productIds: selectedProducts.map((product) => product.id),
      productQuantities,
      netPrice,
      redeemPoints: loyaltyPointsToRedeem,
    };

    // Send the newBilling object to the backend API endpoint to create a billing
    axios
      .post(
        `http://localhost:7000/billing-service/billing/add/${selectedCustomer.id}`,
        newBilling
      )
      .then((response) => {
        // Billing created successfully, do something (e.g., show success message, redirect, etc.)
        console.log("Billing created:", response.data);
        setBill(response.data);
        setShow(!show);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          // Handle the case when the stock quantity is insufficient
          // Show the error message to the user
          console.error("Error creating billing:", error.response.data);
          setErrorMsg(error.response.data);
        } else {
          console.error("Error creating billing:", error.response.data);
          setErrorMsg(
            "An error occurred while creating the billing. Please try again later."
          );
        }
      });
  };

  return (
    <Container className="container mt-5">
      <h2>Create Billing</h2>
      <div className="row mb-3">
        <div className="col-md-6">
          <CustomerSearch onSelectCustomer={handleCustomerSelect} />
        </div>
        <div className="col-md-6">
          <ProductSearch onSelectProduct={handleProductSelect} />
        </div>
      </div>

      {selectedCustomer && selectedProducts.length > 0 && (
        <div>
          {/* Billing Details */}
          <h3>Billing Details</h3>
          <Row>
            <Col>
              <strong>Customer:</strong> {selectedCustomer.name} -{" "}
              {selectedCustomer.phoneNumber}
            </Col>
            <Col>
              <strong>Redeemable Loyalty Points:</strong>{" "}
              {selectedCustomer.loyaltyPoints}
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <strong>Selected Products:</strong>
              <ListGroup>
                {/* List of selected products */}
                {selectedProducts.map((product, index) => (
                  <ListGroup.Item key={product.id}>
                    {product.title} - Rs {product.price}
                    <input
                      type="number"
                      value={productQuantities[index]}
                      onChange={(e) =>
                        handleProductQuantityChange(index, e.target.value)
                      }
                    />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col>
              <div>
                {/* Net Price */}
                <strong>Net Price:</strong> {netPrice} $
              </div>
              <Button variant="primary" onClick={calculateNetPrice}>
                {/* Calculate Net Price Button */}
                Calculate Net Price
              </Button>{" "}
              <div className="mt-3">
                {/* Input field to enter loyalty points to redeem */}
                <input
                  type="number"
                  value={loyaltyPointsToRedeem}
                  onChange={(e) =>
                    setLoyaltyPointsToRedeem(Number(e.target.value))
                  }
                />
                {/* Redeem Loyalty Points Button */}
                <Button variant="primary" onClick={handleLoyaltyPointsRedeem}>
                  Redeem Points
                </Button>
              </div>
              <div className="mt-3">
                {/* Submit Billing Button */}
                <Button variant="success" onClick={handleSubmitBilling}>
                  Create Billing
                </Button>
              </div>
            </Col>
          </Row>
          {errorMsg && (
            <Alert variant="danger" className="mt-3">
              {/* Error message */}
              {errorMsg}
            </Alert>
          )}
        </div>
      )}
      <Container className="mt-3">
        {show && (
          <Button onClick={handle}>
            {/* Show Bill Button */}
            Show Bill
          </Button>
        )}
      </Container>
      {/* Show Bill Component */}
      <ModalDialog
        show={showbill !== false}
        handleClose={handle}
        title="Bill"
        closeAction="Cancel"
      >
        <Bill bill={bill} />
      </ModalDialog>
    </Container>
  );
};

export default BillingForm;
