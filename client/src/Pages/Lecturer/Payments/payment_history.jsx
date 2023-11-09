export const Lec_Payment_History = () => {
    return (
      <div className="coverage_history">
          <h2 className="">Payment History</h2>
        <div className="row w-100 p-5">
          <div className="col-md-4 d-flex">
            <input type="month" className="form-control w-75 mx-2" />
            <button className="btn btn-primary">View</button>
          </div>
        </div>
        <div className="table_components">
          <table className="table table-bordered">
            <thead>
              <tr>
              <th>Course Name</th>
                <th>Batch Code</th>
                <th>Month</th>
                <th>Total Hours</th>
                <th>Payment Rate</th>
                <th>Paid Amount</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    );
  };
  
  