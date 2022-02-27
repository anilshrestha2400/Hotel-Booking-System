import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
function Roomsadmin() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  useEffect(async () => {
    try {
      const data = await(await axios.get("/api/rooms/getallrooms")).data;
      setrooms(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(true);
    }
  }, []);
  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Rooms</h1>
        {loading && <Loader/>} 
        <table className="table table-borderd table-dark">
          <thead
            style={{
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              marginTop: "20px",
              borderRadius: "5px",
              padding: "20px",
            }}
          >
            <tr>
              <th>Room Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent Per Day</th>
              <th>No of Guest</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length &&
              rooms.map((room) => {
                return (
                  <tr>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentperday}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phonenumber}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Roomsadmin;
