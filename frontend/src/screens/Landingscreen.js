import React from 'react'
import {Link} from 'react-router-dom'
function Landingscreen() {
  return (
    <div className='row justify-content-center' style={{backgroundColor:'black',height:'100vh'}}>
      <div className="col-md-9 my-auto text-center" style={{borderRight:'8px solid white'}}>
          <h1 style={{color:'white',fontSize:'130px'}}>Hotel Royal Villa</h1>
          <h1 style={{color:'white'}}>"अतिथि देवो भवः"</h1>
          <Link to="/home">
          <button className='btn btn-light' style={{marginTop:'20px'}}>Get Started</button>
          </Link>
      </div>
    </div>
  )
}

export default Landingscreen
