import React, { useState } from 'react'
import axios from 'axios'
import { uploadFile } from '../firebase/uploadFile'
import { codeGenerator } from '../generators/codeGenerator'
import {forgotPasswordEmail, ticketConfirmationEmail} from '../email_service/emailServices'

export default function Test() {
    const a =
        'eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl9leHBpcmF0aW9uX2RhdGUiOjE2NTIzNzE4Njc4NTEsInVzZXJJRCI6IjYyNzc4OTc0NWUwZmUzMWFjMjhmODkyMyIsInVzZXJuYW1lIjoiSGltYWFtYXNzc3NzZCIsInRva2VuX2NyZWF0ZV9kYXRlIjp7ImRheU9mWWVhciI6MTMwLCJkYXlPZldlZWsiOiJUVUVTREFZIiwibW9udGgiOiJNQVkiLCJkYXlPZk1vbnRoIjoxMCwieWVhciI6MjAyMiwibW9udGhWYWx1ZSI6NSwiaG91ciI6OSwibWludXRlIjo0MSwic2Vjb25kIjo3LCJuYW5vIjo4NTEwMDAwMDAsImNocm9ub2xvZ3kiOnsiY2FsZW5kYXJUeXBlIjoiaXNvODYwMSIsImlkIjoiSVNPIn19fQ.v0cnEeRfHuJ7s_UbSQiXCOrHKh1vrJNWFZ40vsR_fjo4xI0jSPwvIfVN6Wq9vvG7kHI-GfLMoMy5r4x0yvEMbg'
    function click() {
        axios
            .get('http://localhost:8093/api/carts', {
                headers: { 'x-auth-token': a },
            })
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {})

        // axios(
        //     url: 'https://httpbin.org/post',
        //     method: 'post',
        //     headers:
        //     params
        // )

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

    const [file, setFile] = useState([])
    async function click2() {
        // console.log(file)
        await uploadFile(file)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    async function click3() {
        const emailContent = {
            email: 'sonal123326@gmail.com',
            totalPrice: 12350,
        }
        await ticketConfirmationEmail(emailContent)
            .then((res) => {
               alert(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function click4() {}
    return (
        <div className="addMov">
            <button onClick={() => click3()}>add</button>
            <input type="file" onChange={(e) => setFile(e.target.files)} />
        </div>
    )
}
