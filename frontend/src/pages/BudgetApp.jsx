import { useEffect, useState } from "react";
import "./BudgetApp.css"
import { BsFillPieChartFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

const BudgetApp = ({ users, currentUser }) => {
    const storedUsers = JSON.parse(localStorage.getItem("userz")) || users;
    const LoggedInUser = storedUsers.find(
            (user) => user.name == currentUser.name)

    const d = new Date();
    const [amount, setAmount] = useState("");
    const [name, setName] = useState('');
    const [item, setItem] = useState(LoggedInUser.budgetApplication);
    const [balance, setBalance] = useState(LoggedInUser.accountBalance);
    const [transactAmount, settransactAmount] = useState("");
    const [transactDesc, settransactDesc] = useState("");
    const [transaction, setTransaction ] = useState(LoggedInUser.transactionHistory);

    const [day, setDay] = useState(d.getDate());
    const [month, setMonth] = useState(d.getMonth());
    const year = d.getFullYear();

    const ids = item.map(id => {
        return id.ID;
    });

    const maxID = Math.max(...ids) + 1;

    
   

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("userz")) || users;
        const userIndex = storedUsers.findIndex((user) => user.name === currentUser.name);
        const updatedUsers = [...storedUsers];
        updatedUsers[userIndex] = {
            ...updatedUsers[userIndex],
            budgetApplication: item
        };

        updatedUsers[userIndex] = {
            ...updatedUsers[userIndex],
            accountBalance: balance
        };

        updatedUsers[userIndex] = {
            ...updatedUsers[userIndex],
            transactionHistory: transaction
        };

        localStorage.setItem("userz", JSON.stringify(updatedUsers));
        const storedUsers1 = JSON.parse(localStorage.getItem("userz")) || users;
        console.log(storedUsers1);
    }, [item]
    );


    const HandleOnAdd = (e) => {
        e.preventDefault();
            const storedUsers = JSON.parse(localStorage.getItem("userz")) || users;
            const LoggedInUser = storedUsers.find((user) => user.name == currentUser.name)
            const transIds = LoggedInUser.transactionHistory.map(id => {
                return id.ID;
            });
            const transMaxID = Math.max(...transIds) + 1;
        
            const updatedBalance = balance - amount;
            setBalance(updatedBalance)
            setAmount('')
            setName('')

            setTransaction([
                ...transaction,
                    { ID: transMaxID, date: year + "-" + month + "-"+ day, description: transactDesc, amount: "-" + transactAmount },
            ]);

            setItem([
                    ...item,
                    { ID: maxID, ItemName: name, amount: amount }
            ]);

    }


    return (
        <div className="main-container">
            <div className="budget-container">
                <BsFillPieChartFill className="icon"></BsFillPieChartFill>
                <span className="title">Budget Application:</span>
                <input className = "input-item-name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Item Name"
                />
                <input className = "input-item-name"
                    type="number"
                    value={amount}
                    onChange={e => {
                        setAmount(e.target.value)
                        settransactAmount(e.target.value)
                        settransactDesc("Budget Application - Added an Item")
                    }}
                    placeholder="Amount"
                />
                <button className= "add-item-button" onClick={HandleOnAdd}>Add</button>

                <table className="budget-table">
                    <thead>
                        <tr className="total-balance-row">
                            <th colSpan = "3" className="curr-bal-cell">Current Balance: {balance}</th>
                        </tr>
                        <tr className="budget-table-row">
                            <th>Item Name</th>
                            <th>Amount</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item.map(itim => (
                            <tr key={itim.ID}>
                                <td className="budget-data">{itim.ItemName}</td>
                                <td className="budget-data">P {itim.amount}.00</td>
                                <td className="budget-data">
                                <button onClick={() => {
                                    const storedUsers = JSON.parse(localStorage.getItem("userz")) || users;
                                    const LoggedInUser = storedUsers.find((user) => user.name == currentUser.name)
                                    const transIds = LoggedInUser.transactionHistory.map(id => {return id.ID;});
                                    const transMaxID = Math.max(...transIds) + 1;
                                
                                    const updatedBalance = balance - amount;
                                    setTransaction([
                                        ...transaction,
                                            { ID: transMaxID, 
                                            date: year + "-" + month + "-"+ day, 
                                            description: "Budget Application - Removed an Item", 
                                            amount: (itim.amount) },
                                    ]);
                                    setBalance(Number(balance) + Number(itim.amount))
                                    setItem(item.filter(a => a.ID !== itim.ID));
                                }
                                }
                                ><MdDelete /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
 
};

export default BudgetApp;

