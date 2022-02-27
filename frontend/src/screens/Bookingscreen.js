import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from 'react-stripe-checkout';
import Swal from "sweetalert2"

function Bookingscreen() {
  const [room, setroom] = useState();
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const { roomid ,fromdate, todate } = useParams();
  const fromdates=moment(fromdate,'DD-MM-YYYY')
  const todates=moment(todate,'DD-MM-YYYY')
  const totaldays= moment.duration(todates.diff(fromdates)).asDays()+1
  const [totalamount,settotalamount]=useState()
  useEffect(async () => {
    if(!localStorage.getItem('currentUser')){
      window.location.href='/register'
    }
    try {
      setloading(true);
      const data = (
        await axios.post("/api/rooms/getroombyid", {
          roomid: roomid,
        })
      ).data;
      settotalamount(data.rentperday * totaldays)
      console.log(data);
      setroom(data);
      setloading(false);
    } catch (error) {
      seterror(true);
      setloading(false);
      console.log(error);
    }
  }, []);


  async function onToken(token){
    console.log(token)
    const bookingDetails={
      room ,
      userid:JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      token
    }
    try{
      setloading(true)
      const result= await axios.post('/api/bookings/bookroom',bookingDetails)
      setloading(false)
      Swal.fire('Congratulations', 'Your Room Booked Successfully','success').then(result=>{
        window.location.href='/profile'
      })
    }catch(error){
      setloading(false)
      Swal.fire('Oops','Something wnt wrong','error')
    }
  }
  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div
            className="row justify-content-center mt-5"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              marginTop: "20px",
              borderRadius: "5px",
              padding: "20px",
            }}
          >
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img
                src={room.imageurls[0]}
                style={{ height: "400px", borderRadius: "5px" }}
              />
            </div>
            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>Name:{JSON.parse(localStorage.getItem('currentUser')).name}</p>
                  <p>From Date:{fromdate}</p>
                  <p>To Date:{todate}</p>
                  <p>Max Count:{room.maxcount}</p>
                </b>
              </div>
              <div style={{ textAlign: "right" }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total days:{totaldays}</p>
                  <p>Rent Per day:{room.rentperday}</p>
                  <p>Total Amount:{totalamount}</p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                
                  <StripeCheckout
                  amount={totalamount * 100}
                  token={onToken}
                  currency='NPR'
                  stripeKey="pk_test_51KUmGAGCNJb87QZoJixAvbOyReZP1GlsNbo7AoCxGFDm9EbIAJOYVWpNcstdL7ffZ69eWYvgG6NGbd8kLr7f76B9008GtKpKna"
                  >
                    <button className="btn btn-dark" style={{ boxShadow: "none" }}>Pay Now{" "}</button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
