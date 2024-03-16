// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Create mood dropdown for mood selection
    createMoodDropdown('mood1', ['Content', 'Calm', 'Happy', 'Sad', 'Angry', 'Anxious', 'Worried', 'Other']);

    // Load entries from localStorage and display them
    loadEntries();

    // Form submission event listener
    document.getElementById('cbtDiary').addEventListener('submit', event => {
        event.preventDefault();

        const date = document.getElementById('todayDate').value;
        const mood1 = document.getElementById('mood1').value;
        const story = document.getElementById('story').value;
        const distortion = document.getElementById('distortion').value;
        const rewrite = document.getElementById('rewrite').value;
        const mood2 = document.getElementById('mood2').value;

        // Add data to the table and save the entry to localStorage
        addToTable(date, mood1, story, distortion, rewrite, mood2);
        saveEntry(date, mood1, story, distortion, rewrite, mood2);

        // Reset the form after submission
        document.getElementById('cbtDiary').reset();
    });
});

// Function to create mood dropdown
function createMoodDropdown(selectID, moods) {
    const select = document.createElement('select');
    select.className = 'form-control';
    select.id = selectID;
    select.required = true;

    // Add default and mood options
    select.add(new Option('Select Mood', ''));
    moods.forEach(mood => select.add(new Option(mood, mood)));

    // Append the dropdown to its container
    document.getElementById(`${selectID}Dropdown`).appendChild(select);
}

// Function to add a new row to the table
function addToTable(date, mood1, story, distortion, rewrite, mood2) {
    const tableBody = document.querySelector('table.table tbody');
    const newRow = tableBody.insertRow();

    // Add cells and set their content
    newRow.insertCell(0).textContent = date;
    newRow.insertCell(1).textContent = mood1;
    newRow.insertCell(2).textContent = story;
    newRow.insertCell(3).textContent = distortion;
    newRow.insertCell(4).textContent = rewrite;
    newRow.insertCell(5).textContent = mood2;
}

// Function to save form data to localStorage
function saveEntry(date, mood1, story, distortion, rewrite, mood2) {
    // Create an entry object
    const entry = { date, mood1, story, distortion, rewrite, mood2 };
    
    // Retrieve existing entries from localStorage, if any
    let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    
    // Add the new entry
    entries.push(entry);
    
    // Save back to localStorage
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
}

// Function to load and display entries from localStorage
function loadEntries() {
    // Retrieve and display entries from localStorage
    let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    entries.forEach(entry => {
        addToTable(entry.date, entry.mood1, entry.story, entry.distortion, entry.rewrite, entry.mood2);
    });
}
