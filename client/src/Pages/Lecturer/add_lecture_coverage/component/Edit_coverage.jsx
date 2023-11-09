export const EditCoverage =() =>{
    return(
        <form>
        <div className="add_coverage">
          <h1>Add Lecture Coverages</h1>
        </div>
        <div className="row m-auto">
          <div className="col-md-6 ">
            <div className="input_fields">
              Lecture Name :
              <input className="form-control mb-3" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input_fields ">
              Select Batch :
              <select className="form-control mb-3">
                <option>-- Select Batch --</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row m-auto">
          <div className="col-md-6 ">
            <div className="input_fields">
              Start Time:
              <input className="form-control mb-3" type="time" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input_fields ">
              End Time :
              <input className="form-control mb-3" type="time" />
            </div>
          </div>
        </div>
        <div className="row m-auto">
          <div className="col-md-6 ">
            <div className="input_fields">
              Lecture Name :
              <input className="form-control mb-3" type="date" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input_fields ">
              Select Batch :
              <textarea className="form-control mb-2" rows={2}></textarea>
            </div>
          </div>
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <div className="input_fields my-2">
              <button className="btn btn-primary">Edit Coverage</button>
            </div>
          </div>
        </div>
      </form>
    )
}