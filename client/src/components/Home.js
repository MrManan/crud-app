import React from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
export default function Home() {
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
            <tr>
              <th scope="row">1</th>
              <td>Cold Drink</td>
              <td>20$</td>
              <td className="d-flex justify-content-center">
                <Link to="UpdateProduct">
                  <button className="btn btn-warning text-decoration-none ms-2">
                    <EditIcon />
                  </button>
                </Link>
                <button className="btn btn-danger text-decoration-none ms-2">
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
