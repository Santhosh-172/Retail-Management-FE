import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../Comp.css";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ModalDialog from "../Modal/ModalDialog";
import EditCustomer from "./EditCustomer";
import AddCustomer from "./AddCustomer";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [show, setShow] = useState(false);
  const [deleteModalId, setDeleteModalId] = useState(-1);
  const [editModalId, setEditModalId] = useState(-1);

  const handleClose = () => setShow(false);

  const handleDeleteModalClose = () => setDeleteModalId(-1);
  const handleEditModalClose = () => setEditModalId(-1);

  const clickHandler = () => setShow(!show);

  const deleteCustomer = (id) => {
    axios
      .delete(`http://localhost:7000/inventory-service/customer/delete/${id}`)
      .then((response) => {
        setCustomers(customers.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:7000/inventory-service/customer/all")
      .then((response) => {
        console.log(response.data);
        setCustomers(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onAddNewCustomer = (newCustomer) => {
    axios
      .post("http://localhost:7000/inventory-service/customer/add", newCustomer)
      .then((response) => {
        setCustomers((prev) => [...prev, response.data]);
      })
      .catch((error) => console.log(error));
  };

  const onEditCustomer = (id, editItem) => {
    axios
      .put(
        `http://localhost:7000/inventory-service/customer/update/${id}`,
        editItem
      )
      .then((response) => {
        const updatedCustomer = response.data;
        console.log(updatedCustomer);
        setCustomers(
          customers.map((item) => (item.id === id ? editItem : item))
        );
      })
      .catch((error) => console.log(error));
  };

  const [editItem, setEditItem] = useState("");
  const handleEditClick = (id) => {
    setEditModalId(id);

    const temp = customers.filter((i) => i.id === id);
    setEditItem(temp);
  };

  return (
    <>
      <div className="table-container">
        <div className="table-responsive">
          <h1 className="text-center mx-auto mt-3 mb-4">Customers</h1>
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.address}</td>
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
          <ModalDialog
            show={editModalId !== -1}
            handleClose={handleEditModalClose}
            handlePrimaryAction={() => {
              handleEditModalClose();
            }}
            title="Edit Customer"
            closeAction="Cancel"
            primaryAction="Edit"
          >
            <EditCustomer item={editItem} onEditCustomer={onEditCustomer} />
          </ModalDialog>

          <ModalDialog
            show={deleteModalId !== -1}
            handleClose={handleDeleteModalClose}
            handlePrimaryAction={() => {
              deleteCustomer(deleteModalId);
              handleDeleteModalClose();
            }}
            title="Delete Customer?"
            closeAction="Cancel"
            primaryAction="Delete"
          >
            Do you really want to delete this customer?
          </ModalDialog>
        </div>
      </div>
      <div className="row">
        <div className="col-4 offset-4">
          <div className="d-grid">
            <button className="add-customer" onClick={clickHandler}>
              Add Customer
            </button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Customer</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <AddCustomer onAddNewCustomer={onAddNewCustomer} />
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

export default Customer;
