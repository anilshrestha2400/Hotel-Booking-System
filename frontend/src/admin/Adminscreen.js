import React,{useEffect} from "react";
import { Tabs } from "antd";
import Bookingsadmin from "./Bookingsadmin";
import Roomsadmin from "./Roomsadmin";
import Users from "./Users";
import Addrooms from "./Addrooms";

const { TabPane } = Tabs;
function Adminscreen() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/home";
    }
  },[]);
  return (
    <div className="mt-3 me-3 ms-3" 
    style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        marginTop: "20px",
        borderRadius: "5px",
        padding: "20px",
      }}>
      <h1 className="text-center"><b>Admin Panel</b></h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab={<span style={{fontSize:'30px'}}>Bookings</span>} key="1">
          <Bookingsadmin />
        </TabPane>
        <TabPane tab={<span style={{fontSize:'30px'}}>Rooms</span>} key="2">
          <Roomsadmin/>
        </TabPane>
        <TabPane tab={<span style={{fontSize:'30px'}}> Add Room</span>} key="3">
          <Addrooms/>
        </TabPane>
        <TabPane tab={<span style={{fontSize:'30px'}}>Users</span>} key="4">
         <Users/>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;
