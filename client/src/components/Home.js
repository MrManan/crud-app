import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getData")
      .then((response) => setProducts(response.data));
  }, []);
  const deleteProduct = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setProducts(
        products.filter((data) => {
          return data.id !== id;
        })
      );
    });
  };
  return (
    <div className="mt-5">
      <div className="container">
        <div className="add-btn mt-2">
          <Link to="CreateProduct">
            <button className="btn btn-primary text-decoration-none">
              CreateProduct
            </button>
          </Link>
        </div>
        <table className="table table-striped mt-2">
          <thead className="table-dark text-center">
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {products.map((data, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{data.productName}</td>
                  <td>{data.productPrice}</td>
                  <td className="d-flex justify-content-center">
                    <Link to={`UpdateProduct/${data.id}`}>
                      <button className="btn btn-warning text-decoration-none ms-2">
                        <EditIcon />
                      </button>
                    </Link>
                    <button
                      className="btn btn-danger text-decoration-none ms-2"
                      onClick={() => {
                        deleteProduct(data.id);
                      }}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
