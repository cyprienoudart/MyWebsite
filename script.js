document.addEventListener('DOMContentLoaded', function() {
    console.log('Website Loaded');

    const toggleButton = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const emailIcon = document.getElementById('email-icon');
    const locationIcon = document.getElementById('location-icon');

    // Function to toggle theme
    function toggleTheme() {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            emailIcon.src = 'pictures/email-light.png'; // Change to light mode icon
            locationIcon.src = 'pictures/location-light.png'; // Change to light mode icon
            themeIcon.src = 'pictures/moon.png'; // Change to moon icon for light mode
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            emailIcon.src = 'pictures/email-dark.png'; // Change to dark mode icon
            locationIcon.src = 'pictures/location-dark.png'; // Change to dark mode icon
            themeIcon.src = 'pictures/sun.png'; // Change to sun icon for dark mode
        }
    }

    // Event listener for the toggle button
    toggleButton.addEventListener('click', toggleTheme);

    // Check for saved user preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'light') {
            emailIcon.src = 'pictures/email-light.png'; // Set light mode icon
            locationIcon.src = 'pictures/location-light.png'; // Set light mode icon
            themeIcon.src = 'pictures/moon.png'; // Set moon icon for light mode
        } else {
            emailIcon.src = 'pictures/email-dark.png'; // Set dark mode icon
            locationIcon.src = 'pictures/location-dark.png'; // Set dark mode icon
            themeIcon.src = 'pictures/sun.png'; // Set sun icon for dark mode
        }
    } else {
        // If no saved preference, check the system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            emailIcon.src = 'pictures/email-dark.png'; // Set dark mode icon
            locationIcon.src = 'pictures/location-dark.png'; // Set dark mode icon
            themeIcon.src = 'pictures/sun.png'; // Set sun icon for dark mode
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            emailIcon.src = 'pictures/email-light.png'; // Set light mode icon
            locationIcon.src = 'pictures/location-light.png'; // Set light mode icon
            themeIcon.src = 'pictures/moon.png'; // Set moon icon for light mode
        }
    }
});

// Initialize the map and set its view to Paris, France
var map = L.map('map').setView([48.8566, 2.3522], 13); // Coordinates for Paris

// Add a tile layer to the map, which will be the map background
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a marker to the map at the Paris coordinates
L.marker([48.8566, 2.3522]).addTo(map)
    .openPopup();
