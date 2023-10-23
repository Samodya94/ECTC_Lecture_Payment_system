import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Styles
import styles from "../adminSideNav.module.css";

// MUI icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

const FinanceNav = ({ expanded, setExpanded }) => {
  const [payReportsExpanded, setPayReportsExpanded] = useState(false);
  const [paymentApprovalExpanded, setPaymentApprovalExpanded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!expanded) {
      setPayReportsExpanded(false);
      setPaymentApprovalExpanded(false);
    }
  }, [expanded]);

  const togglePayReports = () => {
    if (!expanded) {
      setExpanded(!expanded);
    }
    setPayReportsExpanded(!payReportsExpanded);
  };

  const togglePayApproval = () => {
    if (!expanded) {
      setExpanded(!expanded);
    }
    setPaymentApprovalExpanded(!paymentApprovalExpanded);
  };

  return (
    <>
      <ul className={styles.ul}>
        <li
          className={styles.li}
          style={{ whiteSpace: "nowrap" }}
          onClick={() => navigate("dashboard")}
        >
          <span className={styles.liContainer}>
            {/* Icon */}
            <HomeOutlinedIcon />
            {/* Display name when expanded */}
            {expanded && <span className={styles.span}>Home</span>}
          </span>
        </li>
        <li
          className={styles.li}
          style={{ whiteSpace: "nowrap" }}
          onClick={togglePayApproval}
        >
          <span className={styles.liContainer}>
            <CreditScoreIcon />
            {expanded && <span className={styles.span}>Payment Approval</span>}
          </span>
          {paymentApprovalExpanded
            ? expanded && <span className={styles.span}>&#9650;</span>
            : expanded && <span className={styles.span}>&#9660;</span>}
        </li>
        {/* Sub-links for configurations */}
        {paymentApprovalExpanded && (
          <ul className={`${styles.subMenu}`}>
            <li
              className={styles.li}
              style={{ whiteSpace: "nowrap" }}
              onClick={() => {
                setPaymentApprovalExpanded(!paymentApprovalExpanded);
                navigate("approve-payments-finance");
              }}
            >
              - Approve Payments
            </li>
            <li
              className={styles.li}
              style={{ whiteSpace: "nowrap" }}
              onClick={() => {
                setPaymentApprovalExpanded(!paymentApprovalExpanded);
                navigate("rollback-payments");
              }}
            >
              - Rollback Payments
            </li>
          </ul>
        )}
        <li
          className={styles.li}
          style={{ whiteSpace: "nowrap" }}
          onClick={togglePayReports}
        >
          <span className={styles.liContainer}>
            <ReceiptIcon />
            {expanded && <span className={styles.span}>Payment Reports</span>}
          </span>
          {payReportsExpanded
            ? expanded && <span className={styles.span}>&#9650;</span>
            : expanded && <span className={styles.span}>&#9660;</span>}
        </li>
        {/* Sub-links for configurations */}
        {payReportsExpanded && (
          <ul className={`${styles.subMenu}`}>
            <li
              className={styles.li}
              style={{ whiteSpace: "nowrap" }}
              onClick={() => {
                setPayReportsExpanded(!payReportsExpanded);
                navigate("finalized-payments");
              }}
            >
              - Finalized Payments
            </li>
            <li
              className={styles.li}
              style={{ whiteSpace: "nowrap" }}
              onClick={() => {
                setPayReportsExpanded(!payReportsExpanded);
                navigate("confirmed-payments");
              }}
            >
              - Generate Reports
            </li>
          </ul>
        )}
      </ul>
    </>
  );
};

export default FinanceNav;
