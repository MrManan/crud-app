import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Alert } from "@mui/material";
export default function CreateProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setPrice] = useState("");
  const [productError, setProductError] = useState("");
  const [showAlert, setShowAlert] = useState(true);

  const handleAlertClose = () => {
    setShowAlert(false);
  };
  const navigate = useNavigate();

  const validateInputFields = () => {
    var validation = true;
    if (productName === "" || productPrice === "") {
      setProductError("Input fields are required");
      validation = false;
    }
    return validation;
  };

  const handleProduct = (e) => {
    e.preventDefault();
    setProductError("");
    if (validateInputFields()) {
      try {
        axios
          .post("http://localhost:3001/product", {
            productName: productName,
            productPrice: productPrice,
          })
          .then((res) => {
            if (res) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your product has been added",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
      } catch (error) {
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Server side error while adding product!",
          });
        }
      }
    }
    if (!validateInputFields()) {
      setShowAlert(true);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <form className="mt-5" onSubmit={handleProduct}>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              {productError
                ? showAlert && (
                    <Alert
                      onClose={() => {
                        handleAlertClose();
                      }}
                      elevation={6}
                      variant="filled"
                      severity="error"
                    >
                      {productError}
                    </Alert>
                  )
                : ""}
              <label htmlFor="productName" className="form-label">
                Product Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="productName"
                aria-describedby="nameHelp"
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="productPrice" className="form-label">
                Product Price:
              </label>
              <input
                type="text"
                className="form-control"
                id="productPrice"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
