# WordPress Username Checker Plugin

This WordPress plugin allows you to verify usernames by fetching data from a Google Sheets document using the Google Sheets API. On the front end, users can input a username to check if it's present in the list from Google Sheets.

## Features
- Fetch usernames from a specific column in Google Sheets.
- Simple input field on the front end to check the presence of a username.
- Secure API connection to Google Sheets, with API key, Sheet ID, and Range configured in the `wp-config.php` file.

## Installation
1. Clone the repository or download the plugin files.
2. Upload the plugin folder to the `/wp-content/plugins/` directory.
3. Activate the plugin through the 'Plugins' menu in WordPress.
4. **Configure the API**: In the `wp-config.php` file of your WordPress installation, add the following lines:
    ```php
    define('GOOGLE_SHEETS_API_KEY', 'your-API-key-here');
    define('GOOGLE_SHEET_ID', 'your-google-sheet-id-here');
    define('GOOGLE_SHEET_RANGES', 'your-range-here'); // Example: 'Sheet1!A1:A100'
    ```
5. Ensure your Google Sheets has proper permissions for access via API.

## Usage
1. On the front end, users will see an input field where they can enter a username.
2. Once a username is entered, the plugin checks the Google Sheets document and returns whether the username is present or not.

## Requirements
- WordPress version 5.0 or higher.
- Google Sheets API access with the required credentials.

## License
This project is licensed under the MIT License.

## Contributing
Feel free to open issues or contribute to the project via pull requests.

## Author
Nazim Ali
