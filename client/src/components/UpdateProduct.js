import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function UpdateProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const handleProductName = (event) => {
    setProductName(event.target.value);
  };
  const handleProductPrice = (event) => {
    setProductPrice(event.target.value);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        await axios
          .get("http://localhost:3001/api/get/" + id)
          .then((response) => {
            setProduct(response.data);
          });
      } catch (error) {
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Server Error!",
          });
        }
      }
    };
    getData();
  }, [id]);

  const handleProduct = (e) => {
    e.preventDefault();

    try {
      axios
        .put("http://localhost:3001/update/" + id, {
          productName: productName,
          productPrice: productPrice,
        })
        .then((res) => {
          if (res) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your product has been updated",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Server side error while updating product!",
        });
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form className="mt-5" onSubmit={handleProduct}>
              <div className="mb-3">
                <label htmlFor="product" className="form-label">
                  Product Name:
                </label>
                <input
                  type="name"
                  className="form-control"
                  id="product"
                  aria-describedby="nameHelp"
                  value={product.productName}
                  onChange={handleProductName}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Product Price:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  value={product.productPrice}
                  onChange={handleProductPrice}
                />
              </div>
              <button type="submit" className="btn btn-warning">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
