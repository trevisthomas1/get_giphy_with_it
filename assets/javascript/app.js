var startingTopics = ["tiger", "duck", "kitty", "otter", "puppy"];
var topics = ["tiger", "duck", "kitty", "otter", "puppy"];

function displayInfo() {

    $("#gifs-appear-here").empty();
    var animal = $(this).attr("data-name");
    var api = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=12";

    $.ajax({
        url: api,
        method: "GET"
    }).done(function (response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating.toUpperCase();
            var p = $("<p class='rating'>").text("Rating: " + rating);
            var animalImage = $("<img class='pause'>");
            animalImage.attr({
                src: results[i].images.fixed_height_still.url,
                "data-still": results[i].images.fixed_height_still.url,
                "data-animate": results[i].images.fixed_height.url,
                "data-state": "still",
            });
            
            gifDiv.append(animalImage);
            gifDiv.append(p);
            gifDiv.addClass("gifs");
            $("#gifs-appear-here").prepend(gifDiv);
        }

        $(".pause").on("click", function () {
            var state = $(this).attr("data-state");
            if (state == "still") {
                $(this).attr("src", $(this).data("animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).data("still"));
                $(this).attr("data-state", "still");
            }
        })
    })
};

$("#clear").on("click", function () {
    $("#gifs-appear-here").empty();
    function startingButtons() {
        $(".gif-buttons").empty();
        $.each(startingTopics, function (index, element) {
            var button = $("<button/>").addClass("btn animalBtn").attr("data-name", "baby " + element).text("baby " + element);
            console.log(button);
            $(".gif-buttons").append(button);
        });
    };
    startingButtons();
});

function renderButtons() {

    $(".gif-buttons").empty();
    $.each(topics, function (index, element) {
        var button = $("<button/>").addClass("btn animalBtn").attr("data-name", "baby " + element).text("baby " + element);
        console.log(button);
        $(".gif-buttons").append(button);
    });

};

$("#add-animal").on("click", function () {
    var animal = $("#animal-input").val().trim();
    topics.push(animal);
    renderButtons();

    $("#animal-input").val("");
    return false;
});

renderButtons();
$(document).on("click", ".animalBtn", displayInfo);
$(document).on("click", ".clear");

