// Handle the reservation form submission
document.getElementById("reservation-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent form from reloading page

    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const guests = document.getElementById("guests").value;

    if (date && time && guests) {
        document.getElementById("form-message").textContent = "Your reservation for " + guests + " guests has been confirmed for " + date + " at " + time + ".";
        document.getElementById("reservation-form").reset();
    } else {
        document.getElementById("form-message").textContent = "Please fill in all fields.";
        document.getElementById("form-message").style.color = "red";
    }
});

// Handle newsletter subscription
document.getElementById("newsletter-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    if (email) {
        alert("Thank you for subscribing!");
        document.getElementById("newsletter-form").reset();
    } else {
        alert("Please enter a valid email address.");
    }
});
// Handle form submission and store data in localStorage
document.getElementById('reservation-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from reloading the page
    
    const form = e.target;
    const date = form.date.value;
    const time = form.time.value;
    const guests = form.guests.value;
    
    if (!date || !time || !guests) {
        displayMessage('Please fill in all fields.', 'error');
        return;
    }

    // Get existing reservations from localStorage (or create a new array)
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    
    // Add the new reservation to the list
    reservations.push({ date, time, guests });

    // Store the updated list back to localStorage
    localStorage.setItem('reservations', JSON.stringify(reservations));

    displayMessage('Reservation saved successfully!', 'success');
    form.reset(); // Reset form fields
});

// Function to display messages
function displayMessage(message, type) {
    const messageBox = document.getElementById('form-message');
    messageBox.textContent = message;
    messageBox.style.color = type === 'success' ? 'green' : 'red';
}

// Optionally, you can display all the reservations on page load
window.onload = function () {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const reservationHistory = document.getElementById('reservation-history');

    if (reservations.length > 0) {
        let historyHTML = '<h3>Reservation History</h3>';
        reservations.forEach((reservation, index) => {
            historyHTML += `
                <div>
                    <p><strong>Reservation #${index + 1}</strong></p>
                    <p>Date: ${reservation.date}</p>
                    <p>Time: ${reservation.time}</p>
                    <p>Guests: ${reservation.guests}</p>
                </div>
                <hr>
            `;
        });
        reservationHistory.innerHTML = historyHTML;
    }
};
