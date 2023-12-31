import React from "react";
import PropTypes from "prop-types";
//import { useNavigate } from "react-router-dom";

// MUI components
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";

// Icons
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import Service from "../../../../../utilities/httpService";
// Styles
import styles from "./userTable.module.css";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const TableComponent = ({ rows, columns }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortOrder, setSortOrder] = React.useState("asc"); // "asc" or "desc"
  const [sortedColumn, setSortedColumn] = React.useState("userLevel");

  const handleSort = (column) => {
    setSortedColumn(column);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Sorting function based on userLevel's index when ascending order is selected (0, 1, 2, 3) and descending order is selected (3, 2, 1, 0)
  const compareUserLevel = (a, b) => {
    const levelA = a.userLevel || "";
    const levelB = b.userLevel || "";

    if (sortOrder === "asc") {
      if (levelA === "Admin") {
        return -1;
      } else if (levelA === "Manager") {
        if (levelB === "Admin") {
          return 1;
        } else {
          return -1;
        }
      } else if (levelA === "Finance") {
        if (levelB === "Admin" || levelB === "Manager") {
          return 1;
        } else {
          return -1;
        }
      } else if (levelA === "Accounts") {
        if (levelB === "Admin" || levelB === "Manager" || levelB === "Finance") {
          return 1;
        } else {
          return -1;
        }
      } else {
        return 1;
      }
    }
    else {
      if (sortOrder === "desc") {
        if (levelA === "Admin") {
          if (levelB === "Manager" || levelB === "Finance" || levelB === "Accounts") {
            return 1;
          } else {
            return -1;
          }
        } else if (levelA === "Manager") {
          if (levelB === "Finance" || levelB === "Accounts") {
            return 1;
          } else if (levelB === "Admin") {
            return -1;
          } else {
            return -1;
          }
        } else if (levelA === "Finance") {
          if (levelB === "Accounts") {
            return 1;
          } else if (levelB === "Admin" || levelB === "Manager") {
            return -1;
          } else {
            return -1;
          }
        } else if (levelA === "Accounts") {
          if (levelB === "Admin" || levelB === "Manager" || levelB === "Finance") {
            return -1;
          } else {
            return -1;
          }
        } else {
          return 1;
        }
      }
    }
  };




  const sortedRows = [...rows].sort(compareUserLevel);

  //const navigate = useNavigate();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const service = React.useMemo(() => new Service(), []);
  //delete batch by getting the row id
  const deleteUser = (id) => {
    service.delete(`users/${id}`);
  };
  return (
    <>
      <TableContainer
        component={Paper}
        style={{ border: "none", boxShadow: "none" }}
      >
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow className={styles.tHead}>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  style={{ border: "1px solid #ccc", padding: "8px 16px", cursor: "pointer" }}
                  align="center"
                  onClick={() => handleSort(column)}
                >
                  <span className={styles.tHead}>{column}</span>
                  {sortedColumn === column && (
                    <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : sortedRows
            ).map((row, _id) => (
              <TableRow key={row._id} style={{ border: "1px solid #ccc" }}>

                <TableCell
                  style={{
                    border: "1px solid #ccc",
                    padding: "5px 16px",
                  }}
                  align="center"
                >
                  {row.fullname}
                </TableCell>
                <TableCell
                  style={{
                    border: "1px solid #ccc",
                    padding: "5px 16px",
                  }}
                  align="center"
                >
                  {row.username}
                </TableCell>
                <TableCell
                  style={{
                    border: "1px solid #ccc",
                    padding: "5px 16px",
                  }}
                  align="center"
                >
                  {row.email}
                </TableCell>
                <TableCell
                  style={{
                    border: "1px solid #ccc",
                    padding: "5px 16px",
                    width: "100px",
                  }}
                  align="center"
                >
                  {row.userLevel
                    ? row.userLevel === "Admin"
                      ? "0"
                      : row.userLevel === "Manager"
                        ? "1"
                        : row.userLevel === "Finance"
                          ? "2"
                          : row.userLevel === "Accounts"
                            ? "3"
                            : ""
                    : ""
                  }
                </TableCell>
                <TableCell
                  style={{
                    width: 140,
                    border: "1px solid #ccc",
                    padding: "5px 16px",
                  }}
                  align="center"
                >
                  <button className={styles.removeBtn}
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this user?")) {
                        deleteUser(row._id);
                        window.location.reload();
                      }
                    }}> Remove </button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                style={{
                  border: "none",
                  display: "inline",
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableComponent;
