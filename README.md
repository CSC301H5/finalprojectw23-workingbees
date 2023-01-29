"# finalprojectw23-workingbees" 

## Info

- React server is configured to run on port 3000 by default.
- Express server is configured to run on 3030.
- Test site is available at the react URL. It provides one button for querying the database, and one for inserting a document (just inserts a timestamp of when you pressed the button.)

## Setup instructions

1. Install Node.js: https://nodejs.org/en/
2. Clone the repository.
3. Run `npm install` in both the `/server` and `/client` directories.
4. [Install MongoDB](https://www.mongodb.com/try/download/community) or create your own cloud instance on [MongoDB Atlas](https://www.mongodb.com/atlas/database), and get your connection URL. [Tutorial](https://www.youtube.com/watch?v=oVHQXwkdS6w).
5. Create a file called ".env" in /server with the following line: `MONGO_CONNECTION_URL="YOURURLHERE"`, replacing `YOURURLHERE` with your MongoDB connection URL.
6. Run the backend express server by executing `npm start` in `\server`. 
7. In another terminal, run the frontend react server by executing `npm start` in `\client`.
8. Visit `localhost:3000` in your browser.