import "./Transaction.css"
import { RiBankCard2Fill } from "react-icons/ri";
const Transaction = ({ users, currentUser }) => {
  return (
    <div className="trans-main-container">
      <div className="trans-container">
        <RiBankCard2Fill className="trans-icon"></RiBankCard2Fill>
        <span className="trans-title">Transaction History:</span>
      </div> 
    </div>
  )
 
};

export default Transaction;
{/* <table>

        
{currentUser.transactionHistory.map((user) => (
    <li>{user.date} - {user.amount}</li>
))}
</table> */}