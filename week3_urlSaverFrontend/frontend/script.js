// API Base URL - Update this to match your backend port
const API_BASE_URL = 'http://localhost:5001/api';

// Get DOM elements
const urlForm = document.getElementById('urlForm');
const urlInput = document.getElementById('url');
const descriptionInput = document.getElementById('description');
const saveBtn = document.getElementById('saveBtn');
const formMessage = document.getElementById('formMessage');
const showUrlsBtn = document.getElementById('showUrlsBtn');
const urlListDiv = document.getElementById('urlList');


// Function to show messages
function showMessage(message, type) {
    formMessage.innerHTML = `<div class="message ${type}">${message}</div>`;
    // Clear message after 3 seconds
    setTimeout(() => {
        formMessage.innerHTML = '';
    }, 3000);
}

// Function to create a new URL (POST request)
async function createUrl(url, description) {
    try {
        // Disable button while saving
        saveBtn.disabled = true;
        saveBtn.textContent = 'Saving...';

        const response = await fetch(`http://localhost:5001/api/createUrl`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url, description })
            });

        const data = await response.json();

        if (response.ok) {
            showMessage('✅ URL saved successfully!', 'success');
            // Clear the form
            urlForm.reset();
            // Automatically show updated list
            getAllUrls();
        } else {
            showMessage(`❌ Error: ${data.error || 'Failed to save URL'}`, 'error');
        }
    } catch (error) {
        showMessage(`❌ Error: ${error.message}`, 'error');
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