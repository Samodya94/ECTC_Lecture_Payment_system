import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// MUI Table components
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
import styles from "./assignedBatchesTable.module.css";

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
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const navigate = useNavigate();

  const service = React.useMemo(() => new Service(), []);

  //delete batch by getting the row id
  const deleteAssignedBatch = (id) => {
    service.delete(`assignbatch/${id}`);
  };

  //get batch batchCode from coverage batchCode 
  const [batched, setBatched] = React.useState({});

  React.useEffect(() => {
    const getBatch = async () => {
      const response = await service.get("batch");
      const batches = response.data.reduce((acc, batch) => {
        acc[batch._id] = batch.batchCode;
        return acc;
      }, {});
      setBatched(batches);
    };

    getBatch();
  }, [rows, service]);


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

  function calculateDuration(duration) {
    const hours = Math.floor(duration / 3600000);
    const minutes = Math.floor((duration % 3600000) / 60000);

    return `${hours}h : ${minutes}m`;
  }

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
                  style={{
                    border: "1px solid #ccc", padding: "8px 16px",
                    width: index === 1 ? "14.5%" : index === 7 ? "16%" : "auto",
                  }}
                >
                  <span className={styles.tHead}>{column}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, _id) => (
              <TableRow key={row._id} style={{ border: "1px solid #ccc" }}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    border: "1px solid #ccc",
                    padding: "5px 16px",
                  }}
                >
                  {row.lecturerNic}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    border: "1px solid #ccc",
                    padding: "5px 16px",
                  }}
                >
                  {row.lecturerName}
                </TableCell>
                <TableCell
                  style={{
                    width: 140,
                    border: "1px solid #ccc",
                    padding: "5px 16px",
                  }}
                  align="left"
                >
                  {row.course}
                </TableCell>
                <TableCell
                  style={{
                    width: 140,
                    border: "1px solid #ccc",
                    padding: "5px 16px",
                  }}
                  align="left"
                >
                  {batched[row.batchCode]}
                </TableCell>
                <TableCell
                  style={{
                    width: 140,
                    border: "1px solid #ccc",
                    padding: "5px 16px",
                  }}
                  align="left"
                >
                  {row.rate}
                </TableCell>
                <TableCell
                  style={{
                    width: 140,
                    border: "1px solid #ccc",
                    padding: "5px 16px",
                  }}
                  align="left"
                >
                  {calculateDuration(row.hours)}
                </TableCell>
                <TableCell
                  style={{
                    width: 140,
                    border: "1px solid #ccc",
                    padding: "5px 16px",
                  }}
                  align="left"
                >
                  {calculateDuration(row.remaining_hours)}
                </TableCell>
                <TableCell
                  style={{
                    width: 140,
                    border: "1px solid #ccc",
                    padding: "5px 16px",
                  }}
                  align="center"
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <button
                      className={styles.viewBtn}
                      onClick={() => navigate(`view-assigned/${row._id}`)}
                    >
                      {" "}
                      View{" "}
                    </button>
                    <button className={styles.removeBtn}
                      onClick={() => {
                        if (window.confirm("Are you sure you want to remove this Assign Batch?")) {
                          deleteAssignedBatch(row._id);
                          window.location.reload();
                        }
                      }}> Remove </button>
                  </div>
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
