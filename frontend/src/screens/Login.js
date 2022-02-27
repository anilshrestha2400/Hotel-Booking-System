import React,{useState, useEffect} from 'react'
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";

function Login() {
    const[email,setemail]=useState('')
    const[password,setpassword]=useState('')
    const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
    const[success,setsuccess]=useState();

    async function Login(){
            const user={
                email,
                password,
            }
            try{
                setloading(true)
                const result=await (await axios.post('/api/users/login',user)).data
                setloading(false);
                localStorage.setItem('currentUser',JSON.stringify(result));
                window.location.href='/home'
            }catch(error){
                console.log(error)
                setloading(false);
                seterror(true);
            }
    }
  return (
    <div>
        {loading && <Loader />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
            {error && (<Error message='Invalid Credentials'/>)}
            <div
            style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                marginTop: "20px",
                borderRadius: "5px",
                padding: "20px",
              }}>
                <h2>Login</h2>
                <input type="text" className="form-control" placeholder='email'value={email} onChange={(e)=>{setemail(e.target.value)}}/>
                <input type="text" className="form-control" placeholder='password' value={password} onChange={(e)=>{setpassword(e.target.value)}}/>

                <button className='btn btn-dark mt-3'onClick={Login} style={{ boxShadow: "none" }}>Login</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login
