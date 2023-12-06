import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";

import Service from "../../../../../utilities/httpService";

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

// Styles
import styles from "./addPaymentTable.module.css";

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

    function calculateDuration(duration) {
        const hours = Math.floor(duration / 3600000);
        const minutes = Math.floor((duration % 3600000) / 60000);

        return `${hours}h : ${minutes}m`;
    }


    //get batch batchCode from coverage batchCode 
    const [batched, setBatched] = React.useState({});

    React.useEffect(() => {
        const getBatch = async () => {
            const response = await service.get("assignbatch");
            const batches = response.data.reduce((acc, batch) => {
                acc[batch._id] = batch.batchCode;
                return acc;
            }, {});
            setBatched(batches);
        };

        getBatch();
    }, [rows, service]);

    //get batch batchCode from batched batchCode
    const [batchCodes, setBatchCodes] = React.useState({});

    React.useEffect(() => {
        const getBatchCode = async () => {
            const response = await service.get("batch");
            const batches = response.data.reduce((acc, batch) => {
                acc[batch._id] = batch.batchCode;
                return acc;
            }, {});
            setBatchCodes(batches);
        };

        getBatchCode();
    }, [rows, service]);


    //get pay rate from coverage batchCode
    const [payRates, setPayRates] = React.useState({});

    React.useEffect(() => {
        const getRate = async () => {
            const response = await service.get("assignbatch");
            const batches = response.data.reduce((acc, batch) => {
                acc[batch._id] = batch.rate;
                return acc;
            }, {});
            setPayRates(batches);
        };

        getRate();
    }, [rows, service]);

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
                                    style={{ border: "1px solid #ccc", padding: "8px 16px" }}
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
                                    {row.courseName}
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: 140,
                                        border: "1px solid #ccc",
                                        padding: "5px 16px",
                                    }}
                                    align="left"
                                >
                                    {batchCodes[batched[row.batchCode]]}
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: 140,
                                        border: "1px solid #ccc",
                                        padding: "5px 16px",
                                    }}
                                    align="left"
                                >
                                    {row.date.slice(0, 10)}
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: 140,
                                        border: "1px solid #ccc",
                                        padding: "5px 16px",
                                    }}
                                    align="left"
                                >
                                    {calculateDuration(row.duration)}
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: 140,
                                        border: "1px solid #ccc",
                                        padding: "5px 16px",
                                    }}
                                    align="left"
                                >
                                    {payRates[row.batchCode]}
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: 140,
                                        border: "1px solid #ccc",
                                        padding: "5px 16px",
                                    }}
                                    align="left"
                                >
                                    {row.lectureCoverage}
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
