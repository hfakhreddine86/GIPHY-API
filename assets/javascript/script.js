//Initial Array of Movies
var topics = ["batman", "frozen", "back to the future", "iron man", "thor"];

//GET GIF's
function displayMovie() {

    var movie = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=slk2GW8TLJb6t3x2toEHLIbyjCdfOeT0&limit=10";

    //Creating an AJAX call to retrievae the giphy API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        console.log(queryURL);

        console.log(response);

        var topics = response.data;

        for (var i = 0; i < topics.length; i++) {

            // Creating and storing a div tag
            var movieDiv = $("<div class='movie-container'>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + topics[i].rating);

            // Creating and storing an image tag
            var movieImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            movieImage.attr("src", topics[i].images.fixed_height.url);

            // Setting the src attribute of the image to a property pulled off the result item
            movieImage.attr("src", topics[i].images.fixed_height_still.url);
            movieImage.attr("data-still", topics[i].images.fixed_height_still.url);
            movieImage.attr("data-animate", topics[i].images.fixed_height.url);
            movieImage.attr("data-state", "still");
            movieImage.attr("class", "gif");

            // Appending the paragraph and image tag to the animalDiv
            movieDiv.append(p);
            movieDiv.append(movieImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $(".gifs").prepend(movieDiv);
        }
        $(".gif").click(function () {
            console.log("clicked");

            //Switch between still and animate state
            var state = $(this).data("state");

            if (state === "still") {
                $(this).attr("src", $(this).data("animate"));
                $(this).data("state", "animate");
            } else {
                $(this).attr("src", $(this).data("still"));
                $(this).data("state", "still");
            }
        })
    });
}

function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie to our button
        a.addClass("movie");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

$("#add-movie").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var movie = $("#movie-input").val().trim();

    // Adding movie from the textbox to our array
    topics.push(movie);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "movie"
$(document).on("click", ".movie", displayMovie);

// Calling the renderButtons function to display the intial buttons
renderButtons();

$(".gifs").click(function () {
    console.log("clicked");
})