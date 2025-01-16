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
