export const ChangePassword = () =>{
    return(
        <div className="change_password">
            
            <form>
            <h2 className="h2_title">Change Password</h2>
                <div className="my-2">
                <div>Current Password :</div>
                <div><input type="password" className="form-control"/> </div>
                </div>
                <div className="my-2">
                <div>New Password :</div>
                <div><input type="password" className="form-control"/> </div>
                </div>
                <div className="my-2">
                <div>Confirm Password :</div>
                <div><input type="password" className="form-control"/> </div>
                </div>
                <div className="m-2"><button className="btn btn-primary">Change Password</button></div>
            </form>
        </div>
    )
}