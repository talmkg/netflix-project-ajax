const divformovies = document.querySelector("movie-row");

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZkMTAyNGQ0YmUzZDAwMTU4NDYwZjgiLCJpYXQiOjE2NjgwOTE5NDEsImV4cCI6MTY2OTMwMTU0MX0.et2nZ7DRAkHpdooekdUVz7Z5CeAw4TyIwGYk1teIv-A",
  },
};
//lets first render only horror movies and then we will see.
async function getallMovies() {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/movies/horror",
    options
  );
  const movies = await response.json();
  console.log(movies);
  return movies;
}

//okay, now we have an array of !horror movies.
//now all we have to do is to replace at least 1st row
//lets grab the 1st row of main page

const trendingRow = document.getElementById("trending");
const wholeTrendingElement = document.querySelectorAll("movie-row");

//
function renderAppointments(listOfAppointments) {
  let allmovies = document.querySelector(".movie-row"); //all g
  trendingRow.innerHTML = "";

  listOfAppointments.forEach((movies, index) => {
    // We could aslo have desctructured the information as follows
    // listOfAppointments.forEach(({ name, price, _id }, index) => {
    const movieDivElement = document.createElement("div");
    movieDivElement.classList.add("col-md-2");
    movieDivElement.innerHTML = `
    <a href="details.html?movieId=${movies._id}"><img class="movie-cover thumb-post" src="${movies.imageUrl}" /></a>
  `;

    trendingRow.appendChild(movieDivElement);
  });
}
//

window.onload = async () => {
  const movies = await getallMovies();
  renderAppointments(movies);
  //dont forget to add func here
};
