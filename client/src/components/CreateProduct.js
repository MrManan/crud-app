import React, { useState } from "react";
import Axios from "axios";
export default function CreateProduct() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const handleProduct = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/product", {
      productName: productName,
      productPrice: price,
    }).then(() => {
      alert("Successfully done");
    });
    console.log(price, productName);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <form className="mt-5" onSubmit={handleProduct}>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="product" className="form-label">
                Enter Product Name
              </label>
              <input
                type="name"
                className="form-control"
                id="product"
                aria-describedby="nameHelp"
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
