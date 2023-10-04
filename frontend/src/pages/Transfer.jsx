import React, { useState, useEffect } from "react";
import "./Transfer.css";
import { BiTransferAlt, BiLogIn } from "react-icons/bi";

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
    const senderUser = users.find((user) => user.accountNumber == sender);
    const receiverUser = users.find((user) => user.accountNumber == receiver);

    setSenderName(senderUser ? senderUser.name : "No sender exists.");
    setReceiverName(
      receiverUser
        ? receiverUser.accountNumber != sender
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

    const storedUsers = JSON.parse(localStorage.getItem("userz")) || users;

    const senderUser = storedUsers.find((user) => user.accountNumber == sender);
    const receiverUser = storedUsers.find(
      (user) => user.accountNumber == receiver
    );

    if (
      sendAmount > 0 &&
      senderUser &&
      receiverUser &&
      senderUser !== receiverUser
    ) {
      const parsedSendAmount = parseFloat(sendAmount);

      if (senderUser.accountBalance >= parsedSendAmount) {
        senderUser.accountBalance -= parsedSendAmount;
        receiverUser.accountBalance += parsedSendAmount;

        const senderIndex = storedUsers.findIndex(
          (user) => user.accountNumber == sender
        );
        const receiverIndex = storedUsers.findIndex(
          (user) => user.accountNumber == receiver
        );

        storedUsers[senderIndex] = senderUser;
        storedUsers[receiverIndex] = receiverUser;

        localStorage.setItem("userz", JSON.stringify(storedUsers));
        setFormData({
          sender: "",
          receiver: "",
          sendAmount: "",
        });

        setSenderName("");
        setReceiverName("");

        alert(`Transaction successful.`);
      } else {
        alert("Insufficient balance for the transaction.");
      }
    } else {
      alert("Invalid sender, receiver, or send amount.");
    }
  };

  return (
    <div>
      <div className="transfer-div">
        <div>
          <div className="heading-transfer">
            <BiTransferAlt className="transfer-logo" />
            <h1>Transfer</h1>
          </div>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                className="form-control-transfer"
                type="text"
                name="sender"
                value={sender}
                placeholder="Sender account number"
                onChange={onChange}
              />
              <div className="sr-names">{senderName}</div>
            </div>
            <div className="form-group">
              <input
                className="form-control-transfer"
                type="text"
                name="receiver"
                value={receiver}
                placeholder="Receiver account number"
                onChange={onChange}
              />
              <div className="sr-names">{receiverName}</div>
            </div>
            <div className="form-group">
              <input
                className="form-control-transfer"
                type="number"
                name="sendAmount"
                value={sendAmount}
                placeholder="Amount to send"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="transfer-btn">
                <BiLogIn />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
