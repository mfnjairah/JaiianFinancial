import "./Transaction.css"
import { RiBankCard2Fill } from "react-icons/ri";
const Transaction = ({ users, currentUser }) => {
  const storedUsers = JSON.parse(localStorage.getItem("userz")) || users;
  const userLoggedIn = storedUsers.find((user) => user.name === currentUser.name);

  return (
    <div className="trans-main-container">
      <div className="trans-container">
        <RiBankCard2Fill className="trans-icon"></RiBankCard2Fill>
        <span className="trans-title">Transaction History:</span>
      
        <table className="trans-table">
          <thead>
            <tr className="trans-table-row">
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
            </tr>
          </thead>
          <tbody>
          {userLoggedIn.transactionHistory.map((user) => (
            <tr key={user.ID}>
              <td className="trans-data">{user.date}</td>
              <td className="trans-data desc">{user.description}</td>
              <td className="trans-data">{user.amount}.00</td>
          </tr>
          ))}
          </tbody>
          
        </table>
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