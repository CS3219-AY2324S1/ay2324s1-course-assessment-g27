import "./Account.css";

const Account = () => {
    const handleSubmit = () => {
        console.log("submitted form");
    }
    return (
        <div className="account">
            <h1 className="mainheader">Settings</h1>

            <form className="form" onSubmit={handleSubmit}>
              {/* get info with API*/}
                <div className="form-group">
                    <label htmlFor="oldpwd">Old Password<span>*</span></label>
                    <input type="text" name="oldpwd" id="oldpwd"></input>
                </div>

                <div className="form-group">
                    <label htmlFor="newpwd">New Password<span>*</span></label>
                    <input type="text" name="newpwd" id="newpwd"></input>
                </div>

                <div className="form-group">
                    <label htmlFor="cfmpwd">Confirm New Password<span>*</span></label>
                    <input type="text" name="cfmpwd" id="cfmpwd"></input>
                </div>
                <button className="mainbutton" type="submit">Change Password</button>
            </form>
        </div>
    )
}

export default Account;