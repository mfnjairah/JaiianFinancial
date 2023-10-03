import React, { useState, useEffect } from "react";

const Transfer = ({ users }) => {
  const [formData, setFormData] = useState({
    sender: "",
    receiver: "",
    sendAmount: "",
  });

  const { sender, receiver, sendAmount } = formData;

  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");

  useEffect(() => {
    const senderUser = users.find((user) => user.accountNumber === sender);
    const receiverUser = users.find((user) => user.accountNumber == receiver);

    setSenderName(senderUser ? senderUser.name : "No sender exists.");
    setReceiverName(
      receiverUser
        ? receiverUser !== senderUser
          ? receiverUser.name
          : "Receiver can't be the sender"
        : "No receiver exists."
    );
  }, [sender, receiver, users]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("userz")) || [];

    const senderUser = storedUsers.find(
      (user) => user.accountNumber === sender
    );
    const receiverUser = storedUsers.find(
      (user) => user.accountNumber == receiver
    );

    if (
      sendAmount > 0 &&
      senderUser &&
      receiverUser &&
      senderUser !== receiverUser
    ) {
      const parsedSendAmount = parseInt(sendAmount);

      if (senderUser.accountBalance >= parsedSendAmount) {
        senderUser.accountBalance = parseInt(senderUser.accountBalance);
        senderUser.accountBalance -= parsedSendAmount;

        receiverUser.accountBalance = parseInt(receiverUser.accountBalance);
        receiverUser.accountBalance += parsedSendAmount;

        const senderIndex = storedUsers.findIndex(
          (user) => user.accountNumber === sender
        );
        const receiverIndex = storedUsers.findIndex(
          (user) => user.accountNumber === receiver
        );

        storedUsers[senderIndex] = senderUser;
        storedUsers[receiverIndex] = receiverUser;

        localStorage.setItem("userz", JSON.stringify(storedUsers));

        console.log(`Transaction successful. New balances:`);
        console.log(`${senderUser.name}: ${senderUser.accountBalance}`);
        console.log(`${receiverUser.name}: ${receiverUser.accountBalance}`);
      } else {
        console.log("Insufficient balance for the transaction.");
      }
    } else {
      console.log("Invalid sender, receiver, or send amount.");
    }
  };

  return (
    <div>
      <h1>Transfer</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="sender"
            value={sender}
            placeholder="Sender account number"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="receiver"
            value={receiver}
            placeholder="Receiver account number"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="sendAmount"
            value={sendAmount}
            placeholder="Amount to send"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <button type="submit">Transfer</button>
        </div>
        <div>{`Sender: ${senderName}`}</div>
        <div>{`Receiver: ${receiverName}`}</div>
      </form>
    </div>
  );
};

export default Transfer;
