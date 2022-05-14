import axios from "axios";

export function GetRatingByImdbMovieId(imdb_id){
    return new Promise((resolve, reject) => {
        function getMovieRatings() {
            axios({
                url: 'https://imdb-api.com/en/API/Ratings/k_2mwz5ful/'+imdb_id,
                method: 'GET',
            }).then((res) => {
                    resolve(res.data.totalRating);
            }).catch((err)=> {
                reject(err)
            })
        }

    })
}