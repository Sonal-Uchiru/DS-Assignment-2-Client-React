import emailjs from "emailjs-com";
export function forgotPasswordEmail(emailContent){
    return new Promise((resolve, reject)=>{
        emailjs
            .send(
                "service_d2vcq28", //your service id
                "template_pcwlvj6", // template id
                emailContent,
                "user_TGhnW7M8Z4dNu0PzvbuZ9" //
            )
            .then((result) => {
                resolve(result);
            }).catch((err)=>{
            reject(err);
        })
    })
}