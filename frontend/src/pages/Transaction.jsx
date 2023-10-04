import "./Transaction.css"

const Transaction = ({ users, currentUser }) => {
  return (
    <div>
        {currentUser.transactionHistory.map((user) => (
            <li>{user.date} - {user.amount}</li>
        ))}
    </div>
  )
 
};

export default Transaction;
