import axios from 'axios'

export default function GetRatingByImdbMovieId(imdb_id) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'https://imdb-api.com/en/API/UserRatings/k_2mwz5ful/'+imdb_id,
            method: 'GET',
        })
            .then((res) => {
                resolve(res.data.totalRating)
            })
            .catch((err) => {
                reject(err)
            })
    })
}


// function gg(){
//    // alert("dd")
//     GetRatingByImdbMovieId("tt1877830").then((res) => {
//         setRatings(res)
//         console.log(res)
//     }).catch((err) => {
//         console.log(err)
//     })
// }