import axios from 'axios'

export function GetMoviesByTitle(title) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'https://imdb-api.com/en/API/SearchTitle/k_2mwz5ful/' + title,
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
