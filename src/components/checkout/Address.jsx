import React, { useRef, useState } from "react";
import { useContext } from "react";
import { AgriContext } from "../../context/AgriContext";
import "./address.css";
import axios from "axios";

const AdressCheckout = ({
  setCheckoutAdress,
  selectAdressIndex,
  setSelectAdressIndex,
}) => {
  const { user, fetchUser } = useContext(AgriContext);
  console.log(user);
  const [adresses, setAdresses] = useState(user.adress); // Local state to manage addresses
  const [mes, setMes] = useState("");
  const [addbutt, setAddbutt] = useState(true);

  // Refs for new address inputs
  const nameRef = useRef();
  const line1Ref = useRef();
  const line2Ref = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const pinRef = useRef();
  const mobRef = useRef();

  const handleSelectIndex = (index) => {
    setSelectAdressIndex(index);
    setCheckoutAdress(adresses[index]);
  };

  const handleAddNewAddress = async (event) => {
    event.preventDefault();
    try {
      const mobileValue = mobRef.current.value;
      const pinValue = pinRef.current.value;

      if (isNaN(parseInt(mobileValue)) || mobileValue.length !== 10) {
        setMes("Please enter a valid 10-digit mobile number");
        return;
      }
      if (isNaN(parseInt(pinValue)) || pinValue.length !== 6) {
        setMes("Please enter a valid 6-digit pin code");
        return;
      }

      // API call to add a new address
      const dataadd = await axios.post(
        `http://localhost:3000/api/customer/addaddress/${user.id}`,
        {
          name: nameRef.current.value,
          line1: line1Ref.current.value,
          line2: line2Ref.current.value,
          city: cityRef.current.value,
          state: stateRef.current.value,
          pincode: pinRef.current.value,
          mobile: mobRef.current.value,
        }
      );

      if (dataadd.status === 200) {
        setMes("Address added successfully");

        // Update local state with the new address
        const newAddress = {
          name: nameRef.current.value,
          line1: line1Ref.current.value,
          line2: line2Ref.current.value,
          city: cityRef.current.value,
          state: stateRef.current.value,
          pincode: pinRef.current.value,
          mobile: mobRef.current.value,
        };
        setAdresses((prev) => [...prev, newAddress]);
        fetchUser();

        // Clear the form fields
        nameRef.current.value = "";
        line1Ref.current.value = "";
        line2Ref.current.value = "";
        cityRef.current.value = "";
        stateRef.current.value = "";
        pinRef.current.value = "";
        mobRef.current.value = "";

        // Optionally, refresh user data from the backend
      }
    } catch (err) {
      console.error(err.message);
      setMes("Failed to add address. Please try again.");
    }
  };

  const handleDeleteAddress = async (index) => {
    try {
      const data = await axios.get(
        `http://localhost:3000/api/customer/deleteaddress/${user.id}/${index}`
      );

      alert("Address deleted");
      fetchUser();
      setAdresses((prev) => prev.splice(index, 1));
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleAddButt = () => {
    setAddbutt((prev) => !prev);
  };

  return (
    <div className="adresscheckout">
      {adresses.length === 0 ? (
        <p>Address not found, please add a new one</p>
      ) : (
        <div className="adresslist">
          <p>Select address from below or add a new one</p>
          <ul>
            {console.log(adresses)}
            {adresses.map((item, index) => (
              <div key={index} className="adress-item">
                <input
                  type="radio"
                  name="selectAdress"
                  value={index}
                  checked={index === selectAdressIndex}
                  onChange={() => handleSelectIndex(index)}
                />
                <li>
                  <h3>{item.name}</h3>
                  <p>{item.line1}</p>
                  <p>{item.line2}</p>
                  <p>
                    {item.city}, {item.state} - {item.pincode}
                  </p>
                  <p>Mobile: {item.mobile}</p>
                  <img
                    src="/Delete.svg"
                    onClick={() => handleDeleteAddress(index)}
                  />
                </li>
              </div>
            ))}
          </ul>
        </div>
      )}

      <button onClick={handleAddButt}>
        {addbutt ? "Add New Address" : "Hide Address Add"}
      </button>

      {!addbutt && (
        <form onSubmit={handleAddNewAddress}>
          <input type="text" placeholder="Name" ref={nameRef} required />
          <input
            type="text"
            placeholder="Address Line 1"
            ref={line1Ref}
            required
          />
          <input type="text" placeholder="Address Line 2" ref={line2Ref} />
          <input type="text" placeholder="City" ref={cityRef} required />
          <input type="text" placeholder="State" ref={stateRef} required />
          <input type="tel" placeholder="Pincode" ref={pinRef} required />
          <input type="tel" placeholder="Mobile Number" ref={mobRef} required />
          <input type="submit" value="ADD" />
        </form>
      )}

      <h5>{mes && mes}</h5>
    </div>
  );
};

export default AdressCheckout;
