import React, { useState } from "react";

const AddExpenses = (props) => {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    let newExpense = {
      date: new Date(date).toLocaleDateString("en-GB"),
      category: category,
      description: description,
      amount: amount,
    };
    console.log(newExpense);
    props.onAddNewExpense(newExpense);
  };
  return (
    <div>
      <div className="row">
        <div>
          {/* <h4 className="text-center">Add Godown</h4> */}
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label>Date:</label>
              <input
                type="date"
                className="form-control"
                onChange={(event) => setDate(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                defaultValue="Choose a category"
                className="form-control"
                onChange={(event) => setCategory(event.target.value)}
                required
              >
                <option value="Choose a category">Choose a category</option>
                <option value="Bills">Bills</option>
                <option value="EMIs">EMIs</option>
                <option value="Groceries">Groceries</option>
                <option value="Shopping">Shopping</option>
                <option value="Travel">Travel</option>
              </select>
            </div>

            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                className="form-control"
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Amount:</label>
              <input
                type="number"
                className="form-control"
                min="1"
                onChange={(event) => setAmount(event.target.value)}
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

export default AddExpenses;
