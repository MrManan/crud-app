import React, { useState } from "react";
import { Axios } from "axios";
export default function UpdateProduct() {
  const [productName, setProductName] = useState();
  const [price, setPrice] = useState();

  const updateProduct = (event, id) => {
    Axios.put("http://localhost:3001/update", {
      productName: productName,
      productPrice: price,
      id: id,
    }).then((response) => {
      alert("Updated");
    });
    event.preventDefault();
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form className="mt-5" onSubmit={updateProduct}>
              <div className="mb-3">
                <label htmlFor="product" className="form-label">
                  Enter Product Name
                </label>
                <input
                  type="name"
                  className="form-control"
                  id="product"
                  aria-describedby="nameHelp"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-warning">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
