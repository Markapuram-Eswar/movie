function renderPage( userName, movieName){

    const apiKey = "cc454ece"
    const url = `https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`;

    let movieFromLocal = true;

    // try getting from the local data
    fetch('top100.json')
        .then(res => res.json())
        .then(data => {
            let movieObject  = null;
            data.forEach(movie =>{
                if(movie.Title === movieName) {
                    movieObject = movie;
                    console.log("from Local");
                }
            })
            return movieObject; // if not found, returns false
        })
        .then(movieObject =>{
            if(movieObject === null){
                movieFromLocal = false;
                console.log("from internet");   // from api

                // ** use 'return fetch' to make the script wait for fetch to return
                return fetch(url)           
                    .then(res => res.json())
            }
            else return movieObject            
        })
        .then(data => {
            document.getElementById('title-id').innerHTML = data.Title;

            const info = document.querySelector('.info');
            const yearAndRuntime = document.createElement('p');
            const genre = document.createElement('p');
            const reviews = document.createElement('p');
            const rating = document.createElement('p');

            yearAndRuntime.innerHTML = data.Year + " &#x2022; " + data.Runtime;
            genre.innerHTML = data.Genre;
            reviews.innerHTML = "IMDb rating : " + data.imdbRating + "<br>"  + "MetaScore : " + data.Metascore;
            rating.innerHTML = "Rating : " +  data.Rated;
            
            info.appendChild(yearAndRuntime);
            info.appendChild(genre);
            info.appendChild(reviews);
            info.appendChild(rating);

            const director = document.getElementById("director-id");
            const castList = document.getElementById("cast-list-id");

            const poster = document.getElementById('movie-poster-id');
            const backdrop = document.querySelector('.backdrop-image');

            if(movieFromLocal){
            poster.src = "images/" + data.imdbID + ".jpg";
            backdrop.style.backgroundImage = "url(images/" + data.imdbID + ".jpg)";
            }else{
                poster.src = data.Poster;
                backdrop.style.backgroundImage = "url(" + data.Poster + ")";
            }

            director.innerHTML = 'Director : ' + '<span style="font-weight: 500;">' + data.Director + '</span>';
            data.Actors.split(',').forEach(actor =>{
                const element = document.createElement('li');
                element.innerHTML = actor;
                castList.appendChild(element);
            })

            const plot = document.getElementById('plot-content-id');
            plot.innerHTML = data.Plot

            
            writeNewReview(userName,movieName)
        })
}
