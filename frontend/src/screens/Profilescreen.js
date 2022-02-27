import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import MyBookings from "./MyBookings";

const { TabPane } = Tabs;
function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  });
  return (
    <div className="container">
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab={<span style={{fontSize:'30px'}}>Profile</span>} key="1">
          <div
            className="row justify-content-center">
            <div className="col-md-9"
             style={{
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              marginTop: "20px",
              borderRadius: "5px",
              padding: "20px",
            }}>
              <h3>My Profile</h3>
              <hr />
              <h4>
                <b>Name:</b>
                {user.name}
              </h4>
              <h4>
                <b>Email:</b>
                {user.email}
              </h4>
              <h4>
                <b>isAdmin:</b>
                {user.isAdmin ? "YES" : "NO"}
              </h4>
            </div>
          </div>
        </TabPane>
        <TabPane tab={<span style={{fontSize:'30px'}}>Bookings</span>} key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profilescreen;
