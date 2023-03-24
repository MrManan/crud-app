import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
export default function UpdateProduct() {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [productPrice, setPrice] = useState("");
  const { id } = useParams();

  const handleProduct = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:3001/update/" + id, {
        productName,
        productPrice,
      })
      .then((res) => {
        console.log(res.data);
        alert("Successfully done");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="container">
        <div className="row">
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
                  type="text"
                  className="form-control"
                  id="price"
                  value={productPrice}
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
