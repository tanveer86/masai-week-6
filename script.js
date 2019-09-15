let allTheatre = [];
let allMovies = [];
let allBooking = [];
let bookMovieId = 0;

console.log(allBooking)

let adminDetails = ['tanveerk86@gmail.com', 'Masai@1']

    $("#adminDiv").hide();
    $("#adminHomepage").hide();
    $("#movieTicketBooking").hide();
    $("#UserDiv").hide();
    $("#sucessDiv").hide();

class Theatre{
    constructor(name, area, price, logo){
        this.name = name;
        this.area = area;
        this.price = price;
        this.logo = logo;
    }
}

class Movies{
    constructor(name, poster, language, story, actors, theatreshows){
        this.name = name;
        this.poster = poster;
        this.language = language;
        this.story = story;
        this.actors = actors;
        this.theatreshows = theatreshows;
    }
}

$("#addTheatre").click(function(){
    let theatreName = $("#theatreName").val();
    let theatreArea = $("#theatreArea").val();
    let theatrePrice = $("#theatrePrice").val();
    let theatreLogo = $("#theatreLogo").val();

    let getTheatre = new Theatre(theatreName, theatreArea, theatrePrice, theatreLogo);

    allTheatre.push(getTheatre);
    
    localStorage.setItem('theatreStorage',JSON.stringify(allTheatre));
    theatreOptions();
})

$("#addMovie").click(function(){
    let movieName = $("#movieName").val();
    let moviePoster = $("#moviePoster").val();
    let movieStory = $("#movieStory").val();
    let movieLanguage = $("#movieLanguage").val();
    let movieActors = $("#movieActors").val();
    let addedTheatre = $("#addedTheatre").val();

    let getMovie = new Movies(movieName, moviePoster, movieLanguage, movieStory, movieActors, addedTheatre);

    allMovies.push(getMovie);

    localStorage.setItem('moviesStorage',JSON.stringify(allMovies));
})

function loginPage(){
    $("#carouselExampleControls").hide();
    $("#theatreAdd").hide();
    $("#movieAdd").hide();
    $("#movie").hide();
    $("#book").hide();
    $("#selectTheatreDiv").hide();
    $("#welcome").hide();
    $("#navbar").hide();
    $("#adminDiv").show();
    $("#sucessDiv").hide();
    adminHome()
}

function adminLogin(){
    let adminEmail = $("#adminEmail").val();
    let adminPassword = $("#adminPassword").val();

    if(adminEmail == adminDetails[0] && adminPassword == adminDetails[1]){
        $("#adminHomepage").show();
        $("#adminDiv").hide();
    } else {
        alert('Your Email Id & Password is Wrong!');
    }
}

function addTheatreDetails(){
    $("#theatreAdd").show();
    $("#movieAdd").hide();
    $("#adminShow").hide();
}

function addMovieDetails(){
    $("#movieAdd").show();
    $("#theatreAdd").hide();
    $("#adminShow").hide();
    $("#addedTheatre").empty();

    theatreStorage = JSON.parse(localStorage.getItem('theatreStorage'));

    for(var i = 0; i < theatreStorage.length; i++){
        $("#addedTheatre").append(`<option>${theatreStorage[i].name}</option>`);
    }
    $("#addedTheatre").append(`<option>All Theatres</option>`);
}

function adminHome(){
    $("#adminShow").show();
    $("#movieAdd").hide();
    $("#theatreAdd").hide();
    $("#bookingTitle").empty();
    let bookingStorage = JSON.parse(localStorage.getItem('bookingStorage'));
    $("#bookingTitle").text('Total Tickets Booking: ' + bookingStorage.length);
    for(var i = 0; i < bookingStorage.length; i++){
        $("#adminBookingDisplay").append(`<tr><th scope="row">${i}</th><td>${bookingStorage[i].name}</td><td>${bookingStorage[i].movie}</td><td>${bookingStorage[i].theatre}</td><td>Rs. ${bookingStorage[i].price}</td></tr>`);
    }
}

function showMovies(){
    $("#allMoviesDisplay").empty();
    
    moviesStorage = JSON.parse(localStorage.getItem('moviesStorage'));
    // let allMoviesDisplay = $("#allMoviesDisplay");
    let sendmovie = "movieDetails(${allMovies[i].name})";
    for(var i = 0; i < moviesStorage.length; i++){
        $("#allMoviesDisplay").append(`<div class='col-3 mb-4'><div class="card"><img src='${moviesStorage[i].poster}' alt='${moviesStorage[i].name}' title='${moviesStorage[i].name}'><div class="card-body"><h5 class='card-title'>${moviesStorage[i].name}</h5><button onclick='movieDetails(${i})' class='btn btn-primary'>Movie Details</button></div></div></div>`);

        // $(`#${allMovies[i].name}`).attr("onclick", `movieDetails(${i})`);

    }
}
showMovies();

function movieDetails(movieArrID){
    for(var i = 0; i < moviesStorage.length; i++){
        if(i == movieArrID){
            $("#movieDetailImage").attr("src", `${moviesStorage[i].poster}`);
            $("#movieDetailName").text('Movie Name: ' + moviesStorage[i].name);
            $("#movieDetailLanguage").text('Language: ' + moviesStorage[i].language);
            $("#movieDetailActors").text('Actors: ' + moviesStorage[i].actors);
            $("#movieDetailStory").text('Movie Story: ' + moviesStorage[i].story);
            $("#movieDetailShow").text('Available in : ' + moviesStorage[i].theatreshows);
            bookMovieId = i;
        }
    }
    $("#movieTicketBooking").show();
}

$("#movieDetailBook").click(function(){
    $("#carouselExampleControls").hide();
    $("#welcome").hide();
    $("#movie").hide();
    $("#movieTicketBooking").hide();
    let theatreStorage = JSON.parse(localStorage.getItem('theatreStorage'));
    $("#theaterAll").empty();
    for(var i = 0; i < moviesStorage.length; i++){
        if(i == bookMovieId){
            $("#bookTitle").text('Choose Theater to Watch ' + moviesStorage[i].name);
            if(moviesStorage[i].theatreshows == "All Theatres"){
                for(var t = 0; t < theatreStorage.length; t++){
                    $("#theaterAll").append(`<div class="col-4"><div class='card mb-3'><img src='${theatreStorage[t].logo}' class="card-img-top" height='200'><div class="card-body"><h5 class="card-title">${theatreStorage[t].name}</h5><p class="card-text">${theatreStorage[t].area}</p><button onclick="selectedTheatre('${moviesStorage[i].name}','${theatreStorage[t].name}')" id="movieDetailBook" class="btn btn-primary" title='Book Now'>Book: Rs. ${theatreStorage[t].price}</button></div></div></div>`)
                }
            }
            for(var tl = 0; tl < theatreStorage.length; tl++){
                if(moviesStorage[i].theatreshows == theatreStorage[tl].name){
                    $("#theaterAll").append(`<div class="col-4"><div class='card mb-3'><img src='${theatreStorage[tl].logo}' class="card-img-top" height='200'><div class="card-body"><h5 class="card-title">${theatreStorage[tl].name}</h5><p class="card-text">${theatreStorage[tl].area}</p><button onclick="selectedTheatre('${moviesStorage[i].name}','${theatreStorage[tl].name}')" id="movieDetailBook" class="btn btn-primary" title='Book Now'>Book: Rs. ${theatreStorage[tl].price}</button></div></div></div>`)
                }
            }
        }
    }  
})

let bookingData = ['','',''];

function selectedTheatre(movieData, theatreData){
    $("#selectTheatreDiv").hide();
    let theatreStorage = JSON.parse(localStorage.getItem('theatreStorage'));

    for(var i = 0; i < moviesStorage.length; i++){
        if(moviesStorage[i].name == movieData){
            $("#ticketMovieName").text('Movie Name: ' + moviesStorage[i].name);
            $("#ticketMovieActors").text('Actors: ' + moviesStorage[i].actors);
            bookingData[0] = moviesStorage[i].name;
        }
    }

    for(var t = 0; t < theatreStorage.length; t++){
        if(theatreStorage[t].name == theatreData){
            $("#ticketMovieTheatre").text('Theatre: ' + theatreStorage[t].name);
            $("#ticketMoviePrice").text('Total Price: ' + theatreStorage[t].price);
            bookingData[1] = theatreStorage[t].name;
            bookingData[2] = theatreStorage[t].price;
        }
    }

    $("#UserDiv").show();
}

class TicketBook{
    constructor(name, phone, email, time, payment, movie, theatre, price){
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.time = time;
        this.payment = payment;
        this.movie = movie;
        this.theatre = theatre;
        this.price = price;
    }
}



$("#bookingConfirm").click(function(){
    let bookingName = $("#bookingName").val();
    let bookingPhone = $("#bookingPhone").val();
    let bookingEmail = $("#bookingEmail").val();
    let bookingTime = $("#bookingTime").val();
    let bookingPayment = $("#bookingPayment").val();
    let ticketMovieName = bookingData[0];
    let ticketMovieTheatre = bookingData[1];
    let ticketMoviePrice = bookingData[2];

    let bookingDetails = new TicketBook(bookingName, bookingPhone, bookingEmail, bookingTime, bookingPayment, ticketMovieName, ticketMovieTheatre, ticketMoviePrice);

    allBooking.push(bookingDetails);

    localStorage.setItem('bookingStorage',JSON.stringify(allBooking));

    bookingSucess(bookingName, bookingPhone, bookingEmail, bookingTime, bookingPayment, ticketMovieName, ticketMovieTheatre, ticketMoviePrice);

    $("#sucessDiv").show();
})

function bookingSucess(bookingName, bookingPhone, bookingEmail, bookingTime, bookingPayment, ticketMovieName, ticketMovieTheatre, ticketMoviePrice){
    $("#UserDiv").hide();
    $("#sucessMovie").text('Movie Name: ' + ticketMovieName);
    $("#sucessTheatre").text('Theatre Name: ' + ticketMovieTheatre);
    $("#sucessTime").text('Movie Time: ' + bookingTime);
    $("#sucessPayment").text('Payment Mode: ' + bookingPayment);
    $("#sucessPrice").text('Total Price: ' + ticketMoviePrice);
    $("#sucessName").text(bookingName);
    $("#sucessMessage").text('A copy of same sent to your email id ' + bookingEmail);

    let theatreStorage = JSON.parse(localStorage.getItem('theatreStorage'));

    for(var i = 0; i < theatreStorage.length; i++){
        if(theatreStorage[i].name == ticketMovieTheatre){
            $("#theatreImage").attr("src", theatreStorage[i].logo);
        }
    }

    for(var t = 0; t < moviesStorage.length; t++){
        if(moviesStorage[t].name == ticketMovieName){
            $("#movieImage").attr("src", moviesStorage[t].poster);
        }
    }
}