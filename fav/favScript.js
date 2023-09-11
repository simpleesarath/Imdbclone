//selecting the result container div, so that we can append favMovies inside it
const resultContainer = document.querySelector(".result-container");

//Get data from localstorage
let favMovies = JSON.parse(localStorage.getItem("favMovies"));

// if(favMovies == null){
//   console.log("not yet favourite movies added");
// }

//Get all Favourite movies
favMovies.forEach((id) => {
          getData(id); // Get Movie from API with ID
});

//Get Movies from Server
async function getData(movieID) {
          console.log(movieID);
          const result = await fetch(
                    // `http://www.omdbapi.com/?i=${movieID}&apikey=755f786c`
                    `http://www.omdbapi.com/?i=${movieID}&apikey=57bb1f83`
          ); //Get data from API using IMDB id
          const movieDetails = await result.json(); //Make data readable

          AddMovie(movieDetails); //Add to DOM
}

//Add movie to DOM
const AddMovie = (details) => {
          const child = document.createElement("div"); //Create movie box

          child.setAttribute("id", details.imdbID); //Set unique id to delete exact movie
          child.setAttribute("class", "result-grid"); //Add CSS

          child.innerHTML = `<div class="movie-poster">
        <img src="${
                  details.Poster != "N/A" ? details.Poster : "../notFound.png"
        }" alt="movie-poster">
        </div>

        <div class="movie-info">
        <h3 class="movie-title"><b>${details.Title}</b></h3>
        <ul class="movie-misc-info">
            <li class="year"><b><u>Year</u>:</b> <i>${details.Year}</i></li>
            <li class="rated"><b><u>Ratings</u>:</b> <i>${details.Rated}</i></li>
            <li class="released"><b><u>Released</u>:</b> <i>${details.Released}</i></li>
        </ul>
    
        <p class="genre"><b><u>Genre</u>:</b> <i>${details.Genre}</i></p>
        <p class="writer"><b><u>Writer</u>:</b> <i>${details.Writer}</i></p>
        <p class="actors"><b><u>Actors</u>:</b> <i>${details.Actors}</i></p>
        <p class="plot"><b><u>About</u>:</b> <i>${details.Plot}</i></p>
        <p class="language"><b><u>Language</u>:</b> <i>${details.Language}</i></p>
        <p class="awards"><b><u>Awards</u>:<i class="fa-solid fa-award"></i></b> <i>${details.Awards}</i></p>
    </div>`;

          //Create button for each favourite movie
          const btn = document.createElement("button");
          btn.setAttribute("class", "delete-btn"); // Add CSS
          btn.innerHTML = `<i data-id="${details.imdbID}" class="fa-solid fa-trash">`; //Set unique id to delete exact movie

          btn.addEventListener("click", deleteMovie); // Add event listener to each button
          child.appendChild(btn); //Add button to Movie

          resultContainer.appendChild(child); //Add movie to DOM
};

//Delete movie from DOM
const deleteMovie = (e) => {
          //Get the id of the movie
          const delID = e.target.dataset.id;

          //Get the specific movie
          const movie = document.getElementById(`${delID}`);

          //Delete movie from view
          movie.remove();

          //Delete the movie from list
          favMovies = favMovies.filter((id) => id != delID);

          //Add new data of favMovies to localstorage
          localStorage.setItem("favMovies", JSON.stringify(favMovies));
};
