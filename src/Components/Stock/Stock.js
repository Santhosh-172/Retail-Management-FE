import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import "../Comp.css";
import Button from "react-bootstrap/Button";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ModalDialog from "../Modal/ModalDialog";
import AddStock from "./AddStock";
import EditStock from "./EditStock";

const Stock = () => {
  const [stocks, setStocks] = useState([]);
  const [show, setShow] = useState(false);
  const [deleteModalId, setDeleteModalId] = useState(-1);
  const [editModalId, setEditModalId] = useState(-1);
  const [filterProduct, setFilterProduct] = useState("");

  const handleClose = () => setShow(false);

  const handleDeleteModalClose = () => setDeleteModalId(-1);
  const handleEditModalClose = () => setEditModalId(-1);

  const clickHandler = () => setShow(!show);

  const deleteStock = (id) => {
    axios
      .delete(`http://localhost:7000/inventory-service/stock/delete/${id}`)
      .then((response) => {
        setStocks(stocks.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:7000/inventory-service/stock/all")
      .then((response) => {
        setStocks(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleFilter = () => {
    const queryParams = {};

    if (filterProduct) {
      queryParams.product = filterProduct;
    }

    axios
      .get("http://localhost:7000/inventory-service/stock/filter", {
        params: queryParams,
      })
      .then((response) => {
        setStocks(response.data);
      })
      .catch((error) => {
        console.error("Error filtering billings:", error);
        console.log(error);
      });
  };

  const onAddNewStock = (newStock, productId) => {
    axios
      .post(
        `http://localhost:7000/inventory-service/stock/add/${productId}`,
        newStock
      )
      .then((response) => {
        setStocks((prev) => [...prev, response.data]);
      })
      .catch((error) => console.log(error));
  };

  const onEditStock = (id, editItem) => {
    axios
      .put(
        `http://localhost:7000/inventory-service/stock/update/${id}`,
        editItem
      )
      .then((response) => {
        console.log(response.data);
        setStocks(stocks.map((item) => (item.id === id ? editItem : item)));
      })
      .catch((error) => console.log(error));
  };

  const [editItem, setEditItem] = useState("");
  const handleEditClick = (id) => {
    setEditModalId(id);

    const temp = stocks.filter((i) => i.id === id);
    setEditItem(temp);
  };

  return (
    <>
      <div className="mb-3">
        <label htmlFor="filterProduct" className="form-label">
          Filter by Product Name:
        </label>
        <input
          type="Text"
          id="filterProduct"
          value={filterProduct}
          onChange={(e) => setFilterProduct(e.target.value)}
        />
      </div>
      <button onClick={handleFilter}>Filter</button>
      <div className="table-container">
        <div className="table-responsive">
          <h1 className="text-center mx-auto mt-3 mb-4">Expense</h1>
          <table className="table  table-striped">
            <thead className="table-dark">
              <tr>
                <th>Date</th>
                <th>Product</th>
                <th>Quantity</th>

                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((item) => (
                <tr key={item.id}>
                  <td>{item.dateOfSupply}</td>
                  <td>{item.product.title}</td>
                  <td>{item.quantity}</td>

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
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddStock onAddNewStock={onAddNewStock} />
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
        <EditStock item={editItem} onEditStock={onEditStock} />
      </ModalDialog>

      <ModalDialog
        show={deleteModalId !== -1}
        handleClose={handleDeleteModalClose}
        handlePrimaryAction={() => {
          deleteStock(deleteModalId);
          handleDeleteModalClose();
        }}
        title="Delete ?"
        closeAction="Cancel"
        primaryAction="Delete"
      >
        Do you really want to delete this Stock?
      </ModalDialog>

      <div className="row">
        <div className="col-4 offset-4">
          <div className="d-grid">
            <button className="add-godown" onClick={clickHandler}>
              Add Stock
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stock;
