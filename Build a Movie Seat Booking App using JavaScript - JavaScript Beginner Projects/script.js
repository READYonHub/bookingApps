const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();
let ticketPrice = +movieSelect.value;

//console.log(typeof ticketPrice)

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

    //console.log(seatsIndex);//visszaadja indexelt sorszámát a helynek

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

    //console.log(selectedSeats)
}

//localstorage adatok
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    //console.log(selectedSeats)

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

    movieSelect.addEventListener('change', (e) => {
        ticketPrice = +e.target.value;
        //console.log(e.target.selectedIndex, e.target.value)//visszaadja a kivalasztott iroda undexet es az erteket
        setMovieData(e.target.selectedIndex, e.target.value);
        updateSelectedCount();
    });

    container.addEventListener('click', (e) => {
        //console.log(e.target);//visszaadja a kattintott elem kódját ami a konténerben van
        if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
            //console.log(e.target);//ha masodik feltetel nelkul logolunk, akkor minden seat nevu osztalynak kiirja a kodjat
            e.target.classList.toggle('selected');

            updateSelectedCount();
        }
    });

    // intial count and total
    updateSelectedCount();
}