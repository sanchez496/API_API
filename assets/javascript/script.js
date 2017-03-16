const baseURL = "https://api.giphy.com/v1/gifs/search?q=";
const apiKey = "&api_key=dc6zaTOxFJmzC&limit=10";

var topics = ["metallica", "Cats", "Dogs", "Harley Davidson"];
//
//     addTopic: function (addtopic) {
//         this.myTopics.push(addtopic);
//     },
//     getTopics: function(){
//         return this.people;
//     },
//     removeSpace: function (name){
//         return name.relace(/\s/g, "+");
//     }
// };






$(document).ready(function(){
	intializeButtons ();
	console.log(topics);
});

//function to create buttons from topics array

// append buttons to id button container

function buttonCreater (name){
	var mybutton= $("<button>")
	// add classes to my button
	mybutton.addClass("btn btn-primary btn-lg");
	// create text for new button
	mybutton.text(name);
	mybutton.attr("id", name);
	// attached button to html inside id buttonContainer
	$("#buttonContainer").append(mybutton);
}

function intializeButtons (){
	for (var i = 0; i < topics.length; i++){
		buttonCreater(topics[i]);
	}
}

// click buttons returns gif, console log reports the button that was clicked

$(document.body).on("click", ".btn-primary", function(){
	var subject = $(this).attr("id");
	console.log(subject);
	callAPI(subject);
})

// This section creates the function making the argument and makes an API call

function callAPI(subject){
	//replace all spaces with plus symbol
	var plusSymbols = subject.split(' ').join('+');
	console.log(plusSymbols);
	var queryAPI = baseURL + plusSymbols + apiKey;
	console.log (queryAPI);
	$.ajax({
		url: queryAPI,
		method: "GET"
	}).done(function(response){
		console.log( response.data);
		// initializeGifs(response.data);
		gifBuilder( response.data[0]);
		gifBuilder( response.data[1]);
		gifBuilder( response.data[2]);
		gifBuilder( response.data[3]);
		gifBuilder( response.data[4]);
		gifBuilder( response.data[5]);
		gifBuilder( response.data[6]);
		gifBuilder( response.data[7]);
		gifBuilder( response.data[8]);
		gifBuilder( response.data[9]);

	});
}
// Creates function that buildings a gif and appends it to the html gifContainer

function gifBuilder (obj){
	var gifDiv = $("<div class= 'item'>");
	var rating = obj.rating;
	var p = $("<p>").text("Rating: " + rating);
	var subjectImage = $("<img>");
	subjectImage.attr({
		"src": obj.images.original_still.url,
		"data-animate": obj.images.fixed_height.url,
		"data-still": obj.images.original_still.url,
		"data-state": "still"
	});
	subjectImage.addClass("gif");
	gifDiv.prepend(p);
	gifDiv.prepend(subjectImage);
	gifDiv.prependTo("#gifContainer");
	
}
// Create function that traveres array of objects to gifBuilder

function initializeGifs (gifArray){
	for (var i = 0; i < gifArray.length; i++);
		gifBuilder(gifArray[i]);
}

// user input collection and push to button

$("#submitbutton").on("click", "", function(){
	var personTopic = $("#newtopic").val();
	console.log(personTopic);
    // topics.push(personTopic);
    buttonCreater(personTopic);

});

// This section will animate and still the gifs
$(document.body).on("click", "img.gif", function(){
    if($(this).attr("data-state") === "animate"){
        console.log("state has changed");
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"));
    }
    else{
        console.log("animate state has changed");
        $(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("data-animate"));
    }
});


// $("#submitButton").on("click", function (event) {
// 	event.preventDefault();
// 	var name = $("submitButton").val().trim();
// 	topics.addTopic(topic);
// 	buildButton(topic);
// 	$("#newTopic").val(' ');
// });


// $("#submitButton").click(function() {
//     var txtVal;
//     txtVal = this.value;
//     console.log("this button");
//     topics.push(txtVal);
//
// })

// var addTopic function (addtopic) {
//     this.topic.push(addtopic);
// };