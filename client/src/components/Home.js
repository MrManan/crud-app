import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import Swal from "sweetalert2";
import { TablePagination } from "@mui/material";

export default function Home(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        await axios
          .get("http://localhost:3001/api/getData")
          .then((response) => setProducts(response.data));
      } catch (error) {
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Server Side Error",
          });
        }
      }
    };
    getData();
  }, []);
  const deleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
        try {
          axios
            .delete(`http://localhost:3001/delete/${id}`)
            .then((response) => {
              if (response) {
                setProducts(
                  products.filter((data) => {
                    return data.id !== id;
                  })
                );
              }
            });
        } catch (error) {
          if (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Server Side Error in while you are deleting product",
              footer: '<a href="">Why do I have this issue?</a>',
            });
          }
        }
      }
    });
  };
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
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
            {products
              .slice(
                currentPage * rowsPerPage,
                currentPage * rowsPerPage + rowsPerPage
              )
              .map((data, i) => {
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={!products.length || products.length <= 0 ? 0 : currentPage}
          SelectProps={{
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}
