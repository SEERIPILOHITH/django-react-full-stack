import {Navigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import api from '../api'
import { REFRESH_TOKEN,ACCESS_TOKEN } from '../constants'
import { useState,useEffect } from 'react'

function ProtectedRoute({children}){
    const [isAuth,setisAuth]  = useState(null)
    useEffect(()=>{
        auth().catch(()=>setisAuth(false))
    },[])


    const refreshToken= async()=>{
        const refreshToken= localStorage.getItem(REFRESH_TOKEN);
        try{
            const res = await api.post('/api/token/refresh/',{refresh: refreshToken})
            if(res.status==200){
                localStorage.setItem(ACCESS_TOKEN,res.data.access)
                setisAuth(true)
            }else{
                setisAuth(false)
            }
        }catch(error){
            console.log(error);
            setisAuth(false)
        }
        }
    
    const auth =async()=>{
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(!token){
            setisAuth(false)
            return
        }
        const decoded= jwtDecode(token)
        const tokenexpiration = decoded.exp
        const now = Date.now()/1000
        if (tokenexpiration<now){
            await refreshToken
        }
        else{
            setisAuth(true)
        }
    }
    if (isAuth==null){
        return <div>loading...</div>
    }   
    return isAuth ? children: <Navigate to='login/'/>
}
export default ProtectedRoute