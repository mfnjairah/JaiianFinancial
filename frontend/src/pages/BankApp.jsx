import { useState } from "react";
import "./BankApp.css"
import { BsFillPieChartFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

const BankApp = ({ users, currentUser }) => {

    const [amount, setAmount] = useState("");
    const [name, setName] = useState('');
    const [item, setItem] = useState(currentUser.budgetApplication);

    
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
                    onChange={e => setAmount(e.target.value)}
                    placeholder="Amount"
                />
                <button className= "add-item-button" onClick={() => {
                    let ids = item.map(id => {
                        return id.ID;
                    });
                
                    let maxID = Math.max(...ids) + 1;
                    setItem([
                    ...item,
                    { ID: maxID, ItemName: name, amount: amount }
                    ]);

                    console.log(currentUser.budgetApplication)
                    
                }}>Add</button>


                <table className="budget-table">
                    <thead>
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
                                    setItem(item.filter(a => a.ID !== itim.ID));
                                }
                                }><MdDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
 
};

export default BankApp;