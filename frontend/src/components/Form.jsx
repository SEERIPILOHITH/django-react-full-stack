import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN,REFRESH_TOKEN } from "../constants";
function Form({route,method}){
    const [username,setusername] =useState('')
    const [password,setpassword] =useState('')
    const [loading,setloading] =useState(false)
    const navigate = useNavigate();
    const name = method==='login'?'Login':'Register'
    const handlesubmit=async (e)=>{
        setloading(true);
        e.preventDefault();
        try{
            const res = await api.post(route,{username,password})
            if(method==='login'){
                localStorage.setItem(ACCESS_TOKEN,res.data.access)
                localStorage.setItem(REFRESH_TOKEN,res.data.refresh)
                navigate('/')
            }else{
                navigate('/login')
            }
        }
        catch(error){
            alert(error)
        }
        finally{
            setloading(false)
        }
    }
    return (
      <form onSubmit={handlesubmit}>
        <h1>{name}</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          placeholder="username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="password"
        />
        <button type="submit">{name}</button>
      </form>
    );
}
export default Form