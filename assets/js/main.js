const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const countElement = document.getElementById("count");
const totalElement = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats) {
    seats.forEach((seat, index) => {
      if (selectedSeats.includes(index)) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;

  countElement.innerText = selectedSeatsCount;
  totalElement.innerText = selectedSeatsCount * ticketPrice;

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

container.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("sold")) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

window.addEventListener("beforeunload", () => {
  localStorage.clear();
});

populateUI();
updateSelectedCount();
