import React, {useState} from "react";
import axios from "axios";


export default function Test() {
    const a = "eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl9leHBpcmF0aW9uX2RhdGUiOjE2NTIzNzE4Njc4NTEsInVzZXJJRCI6IjYyNzc4OTc0NWUwZmUzMWFjMjhmODkyMyIsInVzZXJuYW1lIjoiSGltYWFtYXNzc3NzZCIsInRva2VuX2NyZWF0ZV9kYXRlIjp7ImRheU9mWWVhciI6MTMwLCJkYXlPZldlZWsiOiJUVUVTREFZIiwibW9udGgiOiJNQVkiLCJkYXlPZk1vbnRoIjoxMCwieWVhciI6MjAyMiwibW9udGhWYWx1ZSI6NSwiaG91ciI6OSwibWludXRlIjo0MSwic2Vjb25kIjo3LCJuYW5vIjo4NTEwMDAwMDAsImNocm9ub2xvZ3kiOnsiY2FsZW5kYXJUeXBlIjoiaXNvODYwMSIsImlkIjoiSVNPIn19fQ.v0cnEeRfHuJ7s_UbSQiXCOrHKh1vrJNWFZ40vsR_fjo4xI0jSPwvIfVN6Wq9vvG7kHI-GfLMoMy5r4x0yvEMbg"
    function click(){

        axios.get("http://localhost:8093/api/users",{headers:{'x-auth-token':a}}).then((res)=>{
                console.log(res.data)
        }).catch((err)=>{

        })


    //     let user = {
    //         username:"Himaamasssssd",
    //         password:"ddsdfklkj"
    //     }
    // axios.post("http://localhost:8093/api/auth",user).then((res)=>{
    //     console.log(res.data.token);
    // }
    // ).catch((err)=>{
    //     console.log(err)
    // })

    }
    return (
        <div className="addMov">

        <button onClick={()=> click()}>add</button>
        </div>
    );
}
