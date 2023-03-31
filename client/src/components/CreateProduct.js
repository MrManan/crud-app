import React, { useEffect, useId, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Alert } from "@mui/material";
export default function CreateProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productError, setProductError] = useState("");
  const [showAlert, setShowAlert] = useState(true);
  const [category, setCategory] = useState(0);
  const [listCategory, setListCategory] = useState([]);
  const navigate = useNavigate();
  const selectId = useId();
  const handleAlertClose = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    const getCategory = async () => {
      await axios
        .get("http://localhost:3001/api/getCategory")
        .then((response) => {
          setListCategory(response.data);
        });
    };
    getCategory();
  }, []);

  const validateInputFields = () => {
    var validation = true;
    if (productName === "" || productPrice === "" || category === "") {
      setProductError("Input fields are required");
      validation = false;
    }
    return validation;
  };

  const handleProduct = async (e) => {
    e.preventDefault();
    setProductError("");
    if (validateInputFields()) {
      try {
        await axios
          .post("http://localhost:3001/product", {
            name: productName,
            price: productPrice,
            categoryid: category,
          })
          .then((error, response) => {
            console.log(response);
            if (response) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your product has been added",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
            if (error) {
              console.log(error.message);
            }
          })
          .catch((error) => {
            console.error(error);
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
    <>
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
            <div className="mb-3 mt-3 col-lg-6 col-md-6 col-12">
              <select
                className="form-select "
                name="selectCategory"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option>Select Catagories</option>
                {listCategory.map((item, index) => {
                  return (
                    <option
                      text={item.name}
                      key={index}
                      id={selectId}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="productPrice" className="form-label">
                Product Price:
              </label>
              <input
                type="text"
                className="form-control"
                id="productPrice"
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
