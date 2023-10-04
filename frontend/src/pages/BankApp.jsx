import { useState } from "react";
import "./BankApp.css"

const BankApp = ({ users, currentUser }) => {

    const [amount, setAmount] = useState("");
    const [name, setName] = useState('');
    const [item, setItem] = useState(currentUser.budgetApplication);

    return (
        <>
        <h1>Budget Application:</h1>
        <input
            value={name}
            onChange={e => setName(e.target.value)}
        />
        <input
            value={amount}
            onChange={e => setAmount(e.target.value)}
        />
        <button onClick={() => {
            let length = item.length + 1;
            setItem([
            ...setItem,
            { ID: length, ItemName: name, amount: amount }
            ]);
        }}>Add</button>
        <ul>
            {item.map(items => (
            <li key={items.ID}>{items.ItemName} - {items.amount}</li>
            ))}
        </ul>
        </>
    );
 
};

export default BankApp;