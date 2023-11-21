export const MarkAttendance = () => {
    return(
       <div className="mark_attendance">
            <form className="w-75 m-auto my-4">
                <div className="row my-4">
                    <div className="col-md-6">
                        <label>Lecturer Name:</label>
                        <input
                            type="text"
                            disabled
                            className="form-control"/>
                    </div>
                    <div className="col-md-6">
                        <label>Batch Code:</label>
                        <input
                            type="text"
                            disabled
                            className="form-control"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label>Date:</label>
                        <input
                            type="date"
                            className="coverage"/>
                    </div>

                </div>
            </form>
       </div> 
    )
}