import React, { useState } from "react";

const PackageAddGuests = () => {
  const [guests, setGuests] = useState([{ name: "", email: "" }]);

  const handleGuestChange = (index, e) => {
    const newGuests = [...guests];
    newGuests[index][e.target.name] = e.target.value;
    setGuests(newGuests);
  };

  const addGuest = () => {
    setGuests([...guests, { name: "", email: "" }]);
  };

  return (
    <div>
      <h3>Add Guests</h3>
      {guests.map((guest, index) => (
        <div key={index}>
          <input
            type="text"
            name="name"
            placeholder="Guest Name"
            value={guest.name}
            onChange={(e) => handleGuestChange(index, e)}
          />
          <input
            type="email"
            name="email"
            placeholder="Guest Email"
            value={guest.email}
            onChange={(e) => handleGuestChange(index, e)}
          />
        </div>
      ))}
      <button onClick={addGuest}>Add Guest</button>
    </div>
  );
};

export default PackageAddGuests;
