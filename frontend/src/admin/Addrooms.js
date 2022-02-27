import axios from "axios";
import React, { useState } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2"
function Addrooms() {
  const [name, setname] = useState("");
  const [rentperday, setrentperday] = useState();
  const [maxcount, setmaxcount] = useState();
  const [description, setdescription] = useState();
  const [phonenumber, setphonenumber] = useState();
  const [type, settype] = useState();
  const [facility1, setfacility1] = useState();
  const [facility2, setfacility2] = useState();
  const [facility3, setfacility3] = useState();
  const [imageurl1, setimageurl1] = useState();
  const [imageurl2, setimageurl2] = useState();
  const [imageurl3, setimageurl3] = useState();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  async function addRoom(){
      const newroom={
          name,
          rentperday,
          maxcount,
          description,
          phonenumber,
          type,
          facilities:[facility1,facility2,facility3],
          imageurls:[imageurl1,imageurl2,imageurl3]
      }
      try {
          setloading(true)
          const result=await(await axios.post('/api/rooms/addroom',newroom)).data
          console.log(result)
          setloading(false)
          Swal.fire('Congrats','Your New Room Added Successfully','success').then(result=>{
              window.location.href='/home'
          })
      } catch (error) {
          console.log(error)
          setloading(false)
          Swal.fire('Oops','Something went wrong','error')
      }
  }

  return (
    <div className="row">
       
      <div
        className="col-md-6"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          marginTop: "20px",
          borderRadius: "5px",
          padding: "20px",
        }}
      >
           {loading && <Loader/>}
        <h4>Room name:</h4>
        <input
          type="text"
          className="form-control"
          placeholder="Room name"
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
        <h4>Rent per day:</h4>
        <input
          type="text"
          className="form-control"
          placeholder="Rent per day"
          value={rentperday}
          onChange={(e) => {
            setrentperday(e.target.value);
          }}
        />
        <h4>No of Guest:</h4>
        <input
          type="text"
          className="form-control"
          placeholder="No of Guest"
          value={maxcount}
          onChange={(e) => {
            setmaxcount(e.target.value);
          }}
        />
        <h4>Phone Number:</h4>
        <input
          type="text"
          className="form-control"
          placeholder="Phone number"
          value={phonenumber}
          onChange={(e) => {
            setphonenumber(e.target.value);
          }}
        />
        <h4>Description</h4>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          value={description}
          onChange={(e) => {
            setdescription(e.target.value);
          }}
        ></textarea>
      </div>
      <div
        className="col-md-6"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          marginTop: "20px",
          borderRadius: "5px",
          padding: "20px",
        }}
      >
        <h4>Room Type:</h4>
        <select
          className="form-control"
          value={type}
          onChange={(e) => {
            settype(e.target.value);
          }}
        >
          <option value="" selected disabled>
            --Select Room type--
          </option>
          <option value="delux">Delux</option>
          <option value="non-delux">Non-Delux</option>
        </select>
        <h4>Facilities:</h4>
        <input
          type="text"
          className="form-control"
          placeholder="Facility 1"
          value={facility1}
          onChange={(e) => {
            setfacility1(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Facility 2"
          value={facility2}
          onChange={(e) => {
            setfacility2(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Facility 3"
          value={facility3}
          onChange={(e) => {
            setfacility3(e.target.value);
          }}
        />
        <h4>Images:</h4>
        <input
          type="text"
          className="form-control"
          placeholder="Image URL 1"
          value={imageurl1}
          onChange={(e) => {
            setimageurl1(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image URL 2"
          value={imageurl2}
          onChange={(e) => {
            setimageurl2(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image URL 3"
          value={imageurl3}
          onChange={(e) => {
            setimageurl3(e.target.value);
          }}
        />
        <div className="text-end">
          <button className="btn btn-dark mt-2" onClick={addRoom}>
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default Addrooms;
