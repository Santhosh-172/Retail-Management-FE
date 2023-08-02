import React, { useEffect, useState } from "react";
import useNavigate from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Comp.css";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import axios from "axios";
import ModalDialog from "../Modal/ModalDialog";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";
import { Alert } from "react-bootstrap";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [deleteModalId, setDeleteModalId] = useState(-1);
  const [editModalId, setEditModalId] = useState(-1);
  const [error, setError] = useState("");

  const handleClose = () => setShow(false);

  const handleDeleteModalClose = () => setDeleteModalId(-1);
  const handleEditModalClose = () => setEditModalId(-1);

  const clickHandler = () => setShow(!show);

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:7000/inventory-service/product/delete/${id}`)
      .then((response) => {
        setProducts(products.filter((item) => item.id !== id));
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          // Handle the case when the stock quantity is insufficient
          // Show the error message to the user
          console.error("Error deleting product:", error.response.data);
          setError(error.response.data);
        } else {
          console.error("Error deleting product:", error.response.data);
          setError(
            "An error occurred while deleting the product. Please try again later."
          );
        }
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:7000/inventory-service/product/all")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onAddNewProduct = (newProduct, category) => {
    axios
      .post(
        `http://localhost:7000/inventory-service/product/add/${category}`,
        newProduct
      )
      .then((response) => {
        setProducts((prev) => [...prev, response.data]);
      })
      .catch((error) => console.log(error));
  };

  const onEditProduct = (id, editItem) => {
    console.log("inside Edit Product");
    axios
      .put(
        `http://localhost:7000/inventory-service/product/update/${id}`,
        editItem
      )
      .then((response) => {
        const updatedExpense = response.data;
        console.log(updatedExpense);
        setProducts(products.map((item) => (item.id === id ? editItem : item)));
      })
      .catch((error) => console.log(error));
  };

  // const [category, setCategory] = useState("");

  // const k = {
  //   sports: <SportsIcon />,
  //   study: <Icon />,
  // };
  const [editItem, setEditItem] = useState("");
  const handleEditClick = (id) => {
    console.log(id);
    console.log(products);
    setEditModalId(id);

    const temp = products.filter((i) => i.id === id);
    console.log(temp);
    setEditItem(temp);
  };

  return (
    <>
      <div className="table-container">
        <div className="table-responsive">
          <h1 className="text-center mx-auto mt-3 mb-4">Products</h1>
          <table className="table  table-striped">
            <thead className="table-dark">
              <tr>
                <th>Title</th>

                <th>Description</th>
                <th>Category</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.category.name}</td>

                  <td>{item.price}</td>

                  <td>
                    <div
                      className="btn"
                      onClick={() => {
                        handleEditClick(item.id);
                      }}
                    >
                      <ModeEditIcon color="primary" />
                    </div>
                  </td>
                  <td>
                    <div
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        setDeleteModalId(item.id);
                      }}
                    >
                      Delete
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {error && (
            <Alert variant="danger" className="mt-3">
              {/* Error message */}
              {error}
            </Alert>
          )}
          <ModalDialog
            show={editModalId !== -1}
            handleClose={handleEditModalClose}
            handlePrimaryAction={() => {
              handleEditModalClose();
            }}
            title="Edit"
            closeAction="Cancel"
            primaryAction="Edit"
          >
            <EditProduct item={editItem} onEditProduct={onEditProduct} />
          </ModalDialog>

          <ModalDialog
            show={deleteModalId !== -1}
            handleClose={handleDeleteModalClose}
            handlePrimaryAction={() => {
              deleteProduct(deleteModalId);
              handleDeleteModalClose();
            }}
            title="Delete ?"
            closeAction="Cancel"
            primaryAction="Delete"
          >
            Do you really want to delete this Product?
          </ModalDialog>
        </div>
      </div>
      <div className="row">
        <div className="col-4 offset-4">
          <div className="d-grid">
            <button className="add-btn" onClick={clickHandler}>
              Add Product
            </button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <AddProduct onAddNewProduct={onAddNewProduct} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
