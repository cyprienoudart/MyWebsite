document.addEventListener('DOMContentLoaded', function() {
    console.log('Website Loaded');

    const toggleButton = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const emailIcon = document.getElementById('email-icon');
    const locationIcon = document.getElementById('location-icon');
    const epitaLink = document.getElementById('epita-link');
    const navbarToggler = document.getElementById('navbar-toggler');
    const navItems = document.querySelector('.navbar-nav');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link'); // All nav links
    const navbar = document.querySelector('.navbar');

    // Apply smooth transition for theme changes
    document.documentElement.style.transition = "background-color 0.3s, color 0.3s, border-color 0.3s";

    // Function to toggle theme
    function toggleTheme() {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDarkMode ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        emailIcon.src = `pictures/email-${newTheme}.png`; // Change email icon to match theme
        locationIcon.src = `pictures/location-${newTheme}.png`; // Change location icon to match theme
        themeIcon.src = newTheme === 'dark' ? 'pictures/sun.png' : 'pictures/moon.png'; // Change theme icon
        epitaLink.style.color = newTheme === 'dark' ? '#bbdefa' : '#3a75c4'; // Adjust EPITA link color

        updateHamburgerColor(); // Update hamburger color to match theme
    }

    // Event listener for the toggle button
    toggleButton.addEventListener('click', toggleTheme);

    // Check for saved user preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        emailIcon.src = `pictures/email-${savedTheme}.png`; // Set icon based on saved theme
        locationIcon.src = `pictures/location-${savedTheme}.png`;
        themeIcon.src = savedTheme === 'dark' ? 'pictures/sun.png' : 'pictures/moon.png';
        epitaLink.style.color = savedTheme === 'dark' ? '#bbdefa' : '#3a75c4';
    } else {
        // If no saved preference, check the system preference
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const defaultTheme = prefersDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', defaultTheme);

        emailIcon.src = `pictures/email-${defaultTheme}.png`;
        locationIcon.src = `pictures/location-${defaultTheme}.png`;
        themeIcon.src = defaultTheme === 'dark' ? 'pictures/sun.png' : 'pictures/moon.png';
        epitaLink.style.color = defaultTheme === 'dark' ? '#bbdefa' : '#3a75c4';
    }

    // Dynamically show the hamburger menu based on navbar width and screen size
    window.addEventListener('resize', handleNavbarVisibility);
    handleNavbarVisibility(); // Run on load

    function handleNavbarVisibility() {
        const windowWidth = window.innerWidth;
        const breakpoint = 768; // Use 768px as a breakpoint for mobile screens

        if (windowWidth < breakpoint || navbar.scrollWidth > navbar.clientWidth) {
            navbarToggler.style.display = 'block'; // Show the button on smaller screens or when overflowing
        } else {
            navbarToggler.style.display = 'none'; // Hide the button on larger screens with enough space
            navItems.classList.remove('show'); // Ensure nav items are hidden when not needed
        }
    }

    // Ensure hamburger color updates based on theme
    function updateHamburgerColor() {
        const theme = document.documentElement.getAttribute('data-theme');
        navbarToggler.style.color = theme === 'dark' ? '#ffffff' : '#000000'; // Set color based on theme
    }

    // Ensure the button color updates when the theme changes
    toggleButton.addEventListener('click', () => {
        setTimeout(updateHamburgerColor, 100); // Update after theme changes
    });

    // Function to toggle the navbar visibility when hamburger is clicked
    navbarToggler.addEventListener('click', function() {
        navItems.classList.toggle('show');
    });

    // Close the toggler when a menu item is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navItems.classList.remove('show'); // Hide the navbar when any link is clicked
        });
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
});
