import axios from 'axios'

export function GetMoviesByTitle(title) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'https://imdb-api.com/en/API/SearchTitle/k_t6ijwi54/' + title,
            method: 'GET',
        })
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
