// API Base URL - Update this to match your backend port

const API_BASE_URL = 'http://localhost:5001/api';
// API Base URL - This is the server endpoint where our backend is running
// Port 5001 is where the backend server listens for requests
// The '/api' path is the base route for all API endpoints


// Get DOM elements
const urlForm = document.getElementById('urlForm');
// Get reference to the form element that contains URL and description inputs
// This allows us to listen for form submission events

const urlInput = document.getElementById('url');
// Get reference to the URL input field where users type the URL
// We'll use this to get the URL value when the form is submitted

const descriptionInput = document.getElementById('description');
// Get reference to the description textarea where users describe the URL
// We'll use this to get the description value when the form is submitted

const saveBtn = document.getElementById('saveBtn');
// Get reference to the "Save URL" button
// We'll use this to disable it during save operations and change its text

const formMessage = document.getElementById('formMessage');
// Get reference to the div that displays success/error messages
// This is where we'll show feedback to the user after actions

const showUrlsBtn = document.getElementById('showUrlsBtn');
// Get reference to the "Show All Saved URLs" button
// When clicked, this will fetch and display all saved URLs from the database

const urlListDiv = document.getElementById('urlList');
// Get reference to the div where the list of URLs will be displayed
// This is the container that will hold all the URL items we fetch


// Function to show messages

// Function to display success or error messages to the user
// Parameters:
//   - message: The text to display (string)
//   - type: Either 'success' or 'error' to style the message appropriately
function showMessage(message, type) {
    // Create HTML with a div containing the message
    // The 'type' class will apply appropriate styling (green for success, red for error)
    formMessage.innerHTML = `<div class="message ${type}">${message}</div>`;
    
    // Set a timer to automatically clear the message after 3 seconds (3000 milliseconds)
    // This prevents old messages from cluttering the UI
    setTimeout(() => {
        formMessage.innerHTML = ''; // Clear the message by setting innerHTML to empty string
    }, 3000);
}


// Function to create a new URL (POST request)

// Async function to send a new URL to the backend server
// Parameters:
//   - url: The URL string to save
//   - description: The description of the URL
// This function is async because it performs a network request which takes time
async function createUrl(url, description) {
    try {
        // Disable button while saving
        saveBtn.disabled = true;
        // Disable the save button to prevent multiple submissions
        // This prevents users from clicking "Save" multiple times while a request is in progress

        saveBtn.textContent = 'Saving...';
        // Change button text to show that saving is in progress
        // Provides visual feedback to the user

        // Make a POST request to the backend API
        // fetch() is the modern way to make HTTP requests in JavaScript
        const response = await fetch(`http://localhost:5001/api/createUrl`,
            {
                method: 'POST', // POST method is used to create new resources

                // Headers tell the server what format we're sending data in
                headers: {
                    'Content-Type': 'application/json', // We're sending JSON data
                },
                body: JSON.stringify({ url, description })
                // Convert our JavaScript object to JSON string and send it in the request body
                // JSON.stringify() converts {url: "...", description: "..."} to a JSON string
            });


        const data = await response.json();
        // Parse the JSON response from the server
        // .json() converts the JSON string response to a JavaScript object

        // Check if the response was successful (status code 200-299)
        if (response.ok) { // Show success message with green styling
            showMessage('✅ URL saved successfully!', 'success');

            // Clear the form
            // Clear all input fields in the form
            // This prepares the form for the next URL entry
            urlForm.reset();

            // Automatically show updated list
            // Automatically fetch and display the updated list of URLs
            // This shows the user their newly added URL immediately
            getAllUrls();
        } else {
            // If response wasn't ok, show error message
            // data.error comes from the backend, or we use a default message
            showMessage(`❌ Error: ${data.error || 'Failed to save URL'}`, 'error');
        }
    } catch (error) {
        // Catch any network errors or other exceptions
        // This handles cases like server being offline, network issues, etc.
        showMessage(`❌ Error: ${error.message}`, 'error');

        // Log the full error to browser console for debugging
        console.error('Error creating URL:', error);
    } finally {
        // Re-enable button
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save URL';
    }
}

// Function to get all URLs (GET request)
async function getAllUrls() {
    try {
        showUrlsBtn.disabled = true;
        showUrlsBtn.textContent = 'Loading...';

        const response = await fetch(`http://localhost:5001/api/getAllUrl`);
        const urls = await response.json();

        if (response.ok) {
            displayUrls(urls);
        } else {
            urlListDiv.innerHTML = '<div class="error">❌ Failed to load URLs</div>';
        }
    } catch (error) {
        urlListDiv.innerHTML = `<div class="error">❌ Error: ${error.message}</div>`;
        console.error('Error fetching URLs:', error);
    } finally {
        showUrlsBtn.disabled = false;
        showUrlsBtn.textContent = 'Show All Saved URLs';
    }
}

// Function to display URLs on the page
function displayUrls(urls) {
    // Clear previous content
    urlListDiv.innerHTML = '';

    // Check if there are any URLs
    if (urls.length === 0) {
        urlListDiv.innerHTML = '<div class="no-urls">No URLs saved yet. Add your first URL above!</div>';
        return;
    }

    // Create HTML for each URL
    urls.forEach(urlData => {
        const urlItem = document.createElement('div');
        urlItem.className = 'url-item';

        // Format the date
        const date = new Date(urlData.createdAt).toLocaleString();

        urlItem.innerHTML = `
            <div class="url">🔗 ${urlData.url}</div>
            <div class="description">📝 ${urlData.description}</div>
            <div class="date">📅 ${date}</div>
        `;

        urlListDiv.appendChild(urlItem);
    });
}

// Event Listeners

// Handle form submission
urlForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload

    const url = urlInput.value.trim();
    const description = descriptionInput.value.trim();

    // Basic validation (HTML5 required attribute also works)
    if (!url || !description) {
        showMessage('❌ Please fill in both URL and Description', 'error');
        return;
    }

    // Call the createUrl function
    createUrl(url, description);
});

// Handle "Show All URLs" button click
showUrlsBtn.addEventListener('click', () => {
    getAllUrls();
});