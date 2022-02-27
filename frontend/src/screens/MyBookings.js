import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";
import { Tag, Divider } from 'antd';
export default function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  useEffect(async () => {
    try {
      const data = await (
        await axios.post("/api/bookings/getbookingsbyuserid", {
          userid: user._id,
        })
      ).data;
      console.log(data);
      setbookings(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(true);
    }
  });
  async function cancelBooking(bookingid, roomid) {
    try {
      setloading(true);
      const result = await axios.post("/api/bookings/cancelbooking", {
        bookingid,
        roomid,
      }).data;
      console.log(result);
      setloading(false);
      Swal.fire("Congrats", "Your booking has been cancelled", "success").then(
        (result) => {
          window.location.reload();
        }
      );
    } catch (error) {
      console.log(error);
      setloading(false);
      Swal.fire("Oops", "Something went wrong", "error");
    }
  }
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-9">
          {loading && <Loader />}
          {bookings &&
            bookings.map((booking) => {
              return (
                <div
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    marginTop: "20px",
                    borderRadius: "5px",
                    padding: "20px",
                  }}
                >
                  <h1>{booking.room}</h1>
                  <p>
                    <b>Booking Id:</b>
                    {booking._id}
                  </p>
                  <p>
                    <b>CheckIn:</b>
                    {booking.fromdate}
                  </p>
                  <p>
                    <b>CheckOut:</b>
                    {booking.todate}
                  </p>
                  <p>
                    <b>Amount:</b>
                    {booking.totalamount}
                  </p>
                  <p>
                    <b>Status:</b>:{" "}
                    {booking.status=='cancelled' ?(<Tag color="red">CANCELLED</Tag>):(<Tag color="green">CONFIRMED</Tag>)}
                  </p>
                  {booking.status !== "cancelled" && (
                    <div className="text-end">
                      <button
                        className="btn btn-dark"
                        onClick={() => {
                          cancelBooking(booking._id, booking.roomid);
                        }}
                      >
                        CANCEL BOOKING
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
