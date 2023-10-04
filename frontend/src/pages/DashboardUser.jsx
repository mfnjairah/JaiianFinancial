import "./DashboardUser.css";

const DashBoardUser = () => {


    return (
        <div className = "main-container">
                <div className="grid-container">
                    <div className="balance-container">
                        <span className = "balance-title">Current Balance:</span>
                        <span className = "main-balance">P 100.00</span>
                    </div>
                    <button className="nav-button">Deposit</button>
                    <button className="nav-button">Withdraw</button>
                    <button className="nav-button">Send Money</button>
                    <button className="nav-button">Transactions</button>
                    <button className="nav-button budget-app-button">Budget Application</button>
                </div>
        </div>
    )
};

export default DashBoardUser;
