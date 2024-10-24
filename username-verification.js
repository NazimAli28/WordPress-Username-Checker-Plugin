document.addEventListener('DOMContentLoaded', function () {
    var API_KEY = usernameData.api_key; // Get API Key from localized data
    var SHEET_ID = usernameData.sheet_id; // Get Sheet ID from localized data
    var RANGES = JSON.parse(usernameData.ranges); // Get ranges from localized data
    var isDataLoaded = false;

    // Load the Google Sheets API
    function loadClient() {
        gapi.load('client', function () {
            gapi.client.setApiKey(API_KEY); // Use localized data from PHP
            gapi.client.load("https://sheets.googleapis.com/$discovery/rest?version=v4")
                .then(function () {
                    console.log("Google Sheets API loaded successfully");
                    getUsernamesFromSheet();
                },
                    function (err) {
                        console.error("Error loading Google Sheets API", err);
                    });
        });
    }

    // Wait for the DOM to be fully loaded before calling loadClient
    document.addEventListener('DOMContentLoaded', function () {
        loadClient();
    });

    // Fetch usernames from Google Sheets
    function getUsernamesFromSheet() {
        var batchGetRequest = {
            spreadsheetId: SHEET_ID,
            ranges: RANGES
        };

        gapi.client.sheets.spreadsheets.values.batchGet(batchGetRequest)
            .then(function (response) {
                var allUsernames = [];

                response.result.valueRanges.forEach(function (range) {
                    if (range.values) {
                        var usernames = range.values.map(function (row) {
                            if (row[0]) {
                                return row[0].toLowerCase(); // Convert to lowercase
                            }
                            return null;
                        }).filter(Boolean); // Remove empty usernames
                        allUsernames = allUsernames.concat(usernames);
                    }
                });

                window.usernames = allUsernames;
                isDataLoaded = true; // Data loaded, enable search button

                // // Debugging to see fetched usernames
                // console.log(allUsernames);

                document.getElementById("searchButton").disabled = false;
            }, function (response) {
                console.error("Error fetching data from Google Sheets", response);
            });
    }

    // Search for username
    document.getElementById('searchButton').addEventListener('click', function () {
        var input = document.getElementById("searchInput").value.trim().toLowerCase();
        var modalMessage = document.getElementById("modalMessage");
        var modal = document.getElementById("myModal");
        var modalContent = document.querySelector(".modal-content");

        if (!isDataLoaded || !window.usernames || window.usernames.length === 0) {
            modalMessage.textContent = "Usernames not loaded yet, please try again later!";
            modalContent.classList.add("error");
            modal.style.display = "block";
            return;
        }

        var found = window.usernames.find(function (username) {
            return username === input;
        });

        if (found) {
            modalMessage.textContent = input + " is verified!";
            modalContent.classList.remove("error");
        } else {
            modalMessage.textContent = "Username " + input + " not found!";
            modalContent.classList.add("error");
        }

        modal.style.display = "flex";
    });

    // Close modal
    document.querySelector('.close').addEventListener('click', function () {
        document.getElementById("myModal").style.display = "none";
    });

    // Initialize the Google API client
    gapi.load("client", loadClient);
});