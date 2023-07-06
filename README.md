# BookNest App

The Personal Book App is a web application that allows you to search for books using the Google Books API, add books to your personal database, change the status of the books (read, unread, in progress), rate books, take notes while reading, and delete books. The app is developed using Spring Boot, PostgreSQL, and React.

## Features

- Search for Books: Utilize the Google Books API to search for books based on keywords, titles, authors, or other criteria.

- Add Books to Personal Database: Add books from the search results to your personal database by saving their details such as title, author, description, cover image, etc.

- Change Book Status: Update the status of a book to mark it as read, unread, or in progress based on your reading progress.

- Rate Books: Assign a rating to the books to track your overall impression or rating.

- Take Notes: Add notes while reading books to jot down important points, quotes, or personal thoughts.

- Delete Books: Remove books from your personal database if you no longer wish to track them.

## Technologies Used

- Frontend: React (JavaScript/TypeScript)
- Backend: Spring Boot (Java)
- Database: PostgreSQL

## Prerequisites

- Node.js and npm (Node Package Manager)
- Java Development Kit (JDK)
- PostgreSQL database server

## Setup

### Frontend (React)

1. Navigate to the `frontend` directory:
   
   cd frontend
   

2. Install the required dependencies:
   
   npm install
   

3. Update the configuration:
   - Open `src/config.js` and update the API endpoint to match your backend server's URL.

4. Start the development server:
   
   npm run dev
   

5. Access the app at `http://localhost:5173` in your web browser.

### Backend (Spring Boot)

1. Open the backend project in your preferred IDE (e.g., IntelliJ IDEA).

2. Update the database configuration:
   - Open `src/main/resources/application.properties` and configure your PostgreSQL database connection details.

3. Build and run the application.

4. The backend server will start running on `http://localhost:3000`.

5. Make sure the backend server is running while using the frontend application.

## Usage

1. Open the Book Nest Book App in your web browser at `http://localhost:5173`.

2. Use the search functionality to find books from the Google Books API.

3. Add books to your personal database by clicking the "Add" button on the search results.

4. View your saved books in the personal database section.

5. Update the status of a book by selecting the desired status (read, unread, in progress) from the dropdown.

6. Rate a book by selecting the appropriate number of stars.

7. Add or edit notes for a book using the notes icon.

8. To delete a book, click the delete icon.

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to modify and customize the application according to your needs.



## Contributing

Contributions are welcome! If you have any ideas, improvements, or bug fixes, please submit a pull request or open an issue.

Please follow the code of conduct and contribute following the guidelines outlined in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## Contact

For any inquiries or questions, please contact [your-email@example.com](mailto:atufa.shabnam@gmail.com).