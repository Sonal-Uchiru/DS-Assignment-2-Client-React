import axios from 'axios'

export default function GetRatingByImdbMovieId(imdb_id) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'https://imdb-api.com/en/API/UserRatings/k_j1208fbx/'+imdb_id,
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

