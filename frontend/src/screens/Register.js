import React,{useState, useEffect} from 'react'
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from '../components/Success';
import { Link } from 'react-router-dom';
function Register() {
    const[name,setname]=useState('')
    const[email,setemail]=useState('')
    const[password,setpassword]=useState('')
    const[cpassword,setcpassword]=useState('')
    const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
    const[success,setsuccess]=useState();
    async function register(){
        if(password===cpassword){
            const user={
                name,
                email,
                password,
                cpassword
            }
            try{
                setloading(true)
                const result=await (await axios.post('/api/users/register',user)).data
                setloading(false)
                setsuccess(true)
                setname('')
                setemail('')
                setpassword('')
                setcpassword('')

            }catch(error){
                console.log(error)
                setloading(false)
                seterror(true)
            }
        }
        else{
            alert('password not match')
        }
    }
  return (
    <div>
        {loading && <Loader/>}
        {error && <Error/>}
        
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
        {success && (<Success message='Registration Successfully'/>)}
            <div
            style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                marginTop: "20px",
                borderRadius: "5px",
                padding: "20px",
              }}>
                <h2>Register</h2>
                <input type="text" className="form-control" placeholder='name' value={name} onChange={(e)=>{setname(e.target.value)}}/>
                <input type="text" className="form-control" placeholder='email'value={email} onChange={(e)=>{setemail(e.target.value)}}/>
                <input type="text" className="form-control" placeholder='password' value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
                <input type="text" className="form-control" placeholder='confirm password' value={cpassword} onChange={(e)=>{setcpassword(e.target.value)}}/>
                <div className="container d-flex justify-content-between">
                <button className='btn btn-dark mt-3'onClick={register} style={{ boxShadow: "none" }}>Register &uarr;</button>
                <Link to='/login'>
                <button className='btn btn-dark mt-3' style={{ boxShadow: "none" }}>Already User &rarr;</button>
                </Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Register
