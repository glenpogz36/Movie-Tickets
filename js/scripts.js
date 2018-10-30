// Business Logic for AddressBook ---------
function movietickets() {
  this.movie = []
  this.currentId = 0
}

movietickets.prototype.addMovies = function (movies){
  movies.id = this.assignId();
  this.movie.push(movies);
}

movietickets.prototype.assignId =function(){
  this.currentId += 1;
  return this.currentId;
}

movietickets.prototype.findMovies = function(id){
  for (var i=0; i< this.movie.length; i++) {
    if (this.movie[i]) {
      if (this.movie[i].id == id) {
        return this.movie[i];
      }
    }
  };
  return false;
}


movietickets.prototype.deleteMovies = function (id){
  for (var i=0; i< this.movie.length; i++) {
    if (this.movie[i]) {
      if (this.movie[i].id == id) {
      delete this.movie[i];
      return true;
    }
  }
};
  return false;
}
// Business Logic for Contacts ---------
function Movies(movies,time,date,age){
  this.movies = movies
  this.time = time
  this.date = date
  this.age = age
}
Movies.prototype.movietype = function(){
  return this.movie+ " ";
}

// User Interface Logic ---------
var movietickets = new movietickets();

function displaymoviedetails(movieticketstodisplay) {
  var movielist = $("ul#yourmovie");
  var htmlFormovieinfo = "";
  movieticketstodisplay.movie.forEach(function(movies){
    htmlFormovieinfo += "<li id=" + movies.id + ">" + movies.movies + " " + "</li>";
  });
movielist.html(htmlFormovieinfo);
};

function showMovies (movieId) {
  var movies = movietickets.findMovies (movieId)
  $("#show-movie").show ();
  $(".movie-name").html (movies.movies);
  $(".time").html (movies.time);
  $(".date").html (movies.date);
  $(".age").html (movies.age);
  $(".price").html (movies.price);
  var buttons = $("buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + + movies.id + ">Delete</button>");
}

function attachMovieListeners (){
  $("ul#movie").on ("click", "li", function () {
    showMovies (this.id);
  });
  $("#button").on("click", ".deleteButton", function (){
    movietickets.deleteMovies (this.id);
    $("#show-movie").hide();
    displaymoviedetails (movietickets);

  });
};

$(document).ready(function(){
  attachMovieListeners();
  $("form#movies").submit (function (event){
    event.preventDefault();
    var inputtedmovies = $("input#movietype").val();
    var inputteddate = $("input#Date").val();
    var inputtedtime = $("input#time").val();
    var inputtedage = $("input#age").val();
    $("input#movietype").val("");
    $("input#Date").val("");
    $("input#time").val("");
    $("input#age").val("");
    var newMovies = new Movies(inputtedmovies, inputteddate, inputtedtime, inputtedage)
    movietickets.addMovies(newMovies);
    displaymoviedetails(movietickets);


  })
})
