import React, { useState } from "react";

export default function UpdateProduct() {
  const [productName, setProductName] = useState("Pencil");
  const [price, setPrice] = useState(0);
  const handleProduct = (e) => {
    console.log(price);
    console.log(productName);
    e.preventDefault();
  };

  return (
    <div>
      <div className="container">
        <div className="row"></div>
        <div className="col-md-6">
          <form className="mt-5" onSubmit={handleProduct}>
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
  );
}
