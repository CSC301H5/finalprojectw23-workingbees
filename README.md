# Motivation

TODO from proposal.

# Usage overview
Below is a simple 10-step overview of how the application works.

1. To begin, a host creates a room and configures room-specific parameters used in matching, e.g. target goal for final grade.
2. The host publishes the room and is given a code which they can provide to other users (attendees.)
## Phase 0
3. Attendees join the room with the code and fill out their basic profile (username, very short biography.)
4. Attendees are given the option to pre-group with people they know who are also in the room.
5. Attendees fill out room-specific parameters (if they are in a team, they collaborate on this to not cause issues in groupmaking via huge disparities.)
## Phase 1
6. Host begins phase 1 of matchmaking. Attendees are given recommendations for other users in the room who have compatible parameters selected.
7. Attendees accept or reject recommendations for teammates. They are presented in order of best match to worst match to improve efficiency.
## Phase 2
8. Host begins phase 2 of matchmaking once enough attendees have made progress in phase 1. Based on how many people are in the room, the host can select a group size for the algorithm top use.
9. The algorithm creates groups of the specified size as optimally as possible.
10. Users are put into simple chatrooms with their teammates so they can coordinate, meet, and get started.

# Installation

1. Install Node.js: https://nodejs.org/en/
2. Clone the repository.
3. Run `npm install` in both the `/server` and `/client` directories.
4. [Install MongoDB](https://www.mongodb.com/try/download/community) or create your own cloud instance on [MongoDB Atlas](https://www.mongodb.com/atlas/database), and get your connection URL. [Tutorial](https://www.youtube.com/watch?v=oVHQXwkdS6w).
5. Create a file called ".env" in /server with the following line: `MONGO_CONNECTION_URL="YOURURLHERE"`, replacing `YOURURLHERE` with your MongoDB connection URL.
6. Run the backend express server by executing `npm start` in `\server`. 
7. In another terminal, run the frontend react server by executing `npm start` in `\client`.
8. Visit `localhost:3000` in your browser.

# Technical Remarks

- React server is configured to run on port 3000 by default.
- Express server is configured to run on 3030.
- Test site is available at the react URL. It provides one button for querying the database, and one for inserting a document (just inserts a timestamp of when you pressed the button.)

# Contribution

We use git flow for this repository. Each feature should have a corresponding user story in PB.md. Feature branches should be created for each user story, following the name scheme of `S[N]-[XYZ]` where N is the sprint number and XYZ is the unique user story number (exclude the brackets.) For example, story 5 in sprint 2 would be a branch called `S2-5`. Feature branches can be merged into the `develop` branch for testing via a pull request. Once a release is ready in `develop`, it can be merged into `main` as a release via pull request.

There is an active [Trello board](https://trello.com/invite/b/5JuJEXhe/ATTI00d30d0f1e90294d75fa0d18df1ff0e1A9B0C005/hivemind) being used for ticketing.