import React,{useState} from "react";
import {Modal,Button,Carousel} from 'react-bootstrap';
import { Link } from "react-router-dom";
function Room({ room, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div
      className="row"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        marginTop: "20px",
        borderRadius: "5px",
        padding: "20px",
      }}
    >
      <div className="col-md-4">
        <img
          src={room.imageurls[0]}
          style={{ height: "200px", width: "100%", borderRadius: "5px" }}
        />
      </div>
      <div className="col-md-7">
        <h1 style={{ fontSize: "20px" }}>{room.name}</h1>
        <b>
          <p>{room.facilities+" "}</p>
          <p>No of Guest:{room.maxcount}</p>
          <p>Phone Number:{room.phonenumber}</p>
          <p>Type:{room.type}</p>
          <p>Rent Per day:{room.rentperday}</p>
        </b>
        <div style={{ float: "right" }}>

          {(fromdate && todate) &&(
            <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
            <button className="btn btn-dark m-2">Book Now</button>
            </Link>
          )}

          
          <button onClick={handleShow} className="btn btn-dark" style={{ boxShadow: "none" }}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
    <Carousel prevLabel='' nextLabel=''>
  {room.imageurls.map(url=>{
    return <Carousel.Item>
    <img
      className="d-block w-100"
      src={url}
      style={{height:"400px",borderRadius:"5px"}}
    />
  </Carousel.Item>
  })}
</Carousel>
  <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
