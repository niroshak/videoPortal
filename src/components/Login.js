import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth";
import axios from "axios";
import {Buffer} from 'buffer';
export const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  // const client = axios.create({
  //   baseURL: "http://localhost:3000"
  // });

  const redirectPath = location.state?.path || "/";

  const handleLogin = async () => {
    // auth.login({user,password});
    // navigate('/Home');

    // let session_url = "http://localhost:5000/login";

    // try {
    //   // const requestBody = {
    //   //   name: 'bobby hadz',
    //   //   salary: 100,
    //   // };

    //   const response = await axios.post("http://localhost:5000/login", {
    //     auth: {
    //       username: "TestUser1",
    //       password: "abc123",
    //     },

    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   return response.data;
    // } catch (err) {
    //   console.log(err.message);
    //   console.log(err.response.status);
    // }

    // let username = 'TestUser1';
    // let password = 'abc123'

    const token = `${user}:${password}`;
    const encodedToken = Buffer.from(token).toString('base64');
    const session_url = 'http://localhost:5000/login';

    var config = {
      method: 'post',
      url: session_url,
      headers: { 'Authorization': 'Basic '+ encodedToken }
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
          navigate('/Home');

    })
    .catch(function (error) {
      console.log(error);
    });


    // axios.post('http://localhost:5000/login', {
    //   auth:{
    //   username: 'TestUser1',
    //   password: 'abc123'
    // }
    // })
    // .then((response) => {
    //   console.log("response",response);
    // }, (error) => {
    //   console.log("error",error);
    // });

    // var session_url = 'http://api_address/api/session_endpoint';

    // let username = 'TestUser1';
    // let password = 'abc123';
    // let credentials = btoa(username + ':' + password);
    // let basicAuth = 'Basic ' + credentials;
    // axios.post(session_url, {
    //   headers: { 'Authorization': + basicAuth }
    // }).then(function(response) {
    //   console.log('Authenticated');
    // }).catch(function(error) {
    //   console.log('Error on Authentication',error);
    // });
  };

  return (
    // <div style={{display:'flex',backgroundColor:'blue',justifyContent:'center',alignItems:'center',flexGrow:1}}>
    //   <label>
    //     Username : <input type='text' onChange={e => setUser(e.target.value)} />
    //   </label><br></br>
    //   <label>
    //     Password : <input type='text' onChange={e => setPassword(e.target.value)} />
    //   </label><br></br>
    //   <button onClick={handleLogin}>Login</button>
    // </div>
    <div
      style={{
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "30%",
          height: "30%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* <div> */}
        <input
          type="text"
          placeholder="username"
          style={{ height: "30px", paddingLeft: "10px" }}
          onChange={(e) => setUser(e.target.value)}
        />
        {/* </div> */}
        {/* <div> */}
        <input
          type="text"
          placeholder="password"
          style={{ height: "30px", paddingLeft: "10px" }}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* </div> */}
        {/* <div> */}
        <button
          style={{
            backgroundColor: "cadetblue",
            height: "30px",
            border: "0px",
          }}
          onClick={handleLogin}
        >
          Login
        </button>
        {/* </div> */}
      </div>
    </div>
  );
};
