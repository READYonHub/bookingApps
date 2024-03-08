const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movivieSelect = document.getElementById('movie');

populateUI();
let ticketPrice = +movivieSelect.value;

//console.log(typeof ticketPrice)

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(function (seat) {
        return [...seats].indexOf(seat);
    })

    //console.log(seatsIndex);//visszaadja indexelt sorszámát a helynek

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerHTML = selectedSeatsCount;
    total.innerHTML = selectedSeatsCount * ticketPrice;

    //console.log(selectedSeats)
}

//localstorage adatok
function populateUI() {
    const selectedSeats = JSON.stringify(localStorage.getItem('selectedSeats'))

    //console.log(selectedSeats)

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    const selecttedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selecttedMovieIndex != null) {
        movivieSelect.selectedIndex = selecttedMovieIndex;
    }
}

movivieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    //console.log(e.target.selectedIndex, e.target.value)//visszaadja a kivalasztott iroda undexet es az erteket
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

container.addEventListener('click', (e) => {
    //console.log(e.target);//visszaadja a kattintott elem kódját ami a konténerben van
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        //console.log(e.target);//ha masodik feltetel nelkul logolunk, akkor minden seat nevu osztalynak kiirja a kodjat
        e.target.classList.toggle('selected');
    }
    updateSelectedCount();
})
updateSelectedCount();