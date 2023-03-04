# Motivation

HiveMind aims to solve the issue of quickly and efficiently forming cohesive groups of like-minded individuals on a large scale, where the physical forming of groups is infeasible or impractical. Modern groupmaking systems often do not give group members power over who they work with, or simply do not facilitate exposure to a majority of their potential candidates. Due to the inefficiencies introduced by alternatives, such as randomized group making or grouping via a slow and unreliable online forum, groupwork often becomes a tedious and dreaded part of life. HiveMind solves this issue by filtering the pool of potential teammates to the ones who would work best with you, and giving you the power to pick which of the recommended teammates you would prefer to work with.

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
5. Create a file called ".env" in /server with the following lines: 
- `MONGO_CONNECTION_URL="YOURURLHERE"`, replacing `YOURURLHERE` with your MongoDB connection URL.
- `JWT_SECRET="SOME_SECRET"`, replacing `SOME_SECRET` with any string of your choice (preferably long and secret for use with authentication).
6. Run the backend express server by executing `npm start` in `\server`. 
7. In another terminal, run the frontend react server by executing `npm start` in `\client`. (In the case that an "Invalid options object" error is encountered, follow the instructions [here](https://stackoverflow.com/questions/70374005/invalid-options-object-dev-server-has-been-initialized-using-an-options-object).)
8. Visit `localhost:3000` in your browser.

# Technical Remarks

- React server is configured to run on port 3000 by default.
- Express server is configured to run on 3030.

# Contribution

We use git flow for this repository. Each feature should have corresponding user stories in PB.md. Feature branches should be created for each user story (or multiple if they are closely related), following the name scheme of `S[N]-[X].[Y].[Z]...-[B/F][K]` where N is the sprint number, X, Y, Z, etc. are unique user story numbers, B/F specifies whether a subtask branch pertains to backend or frontend, and K specifies the subtask number as on trello (exclude the brackets.) For example, story 5 and 6 in sprint 2 would be a feature branch called `S2-5.6`. To branch off of `S2-5.6` to work on backend subtask number 4, the branch would be named `S2-5.6-B4`. Subtask branches can be merged back into their feature branch via a pull request.. Feature branches can be merged into the `develop` branch for testing via a pull request. Once a release is ready in `develop`, it can be merged into `main` as a release via pull request.

There is an active [Trello board](https://trello.com/invite/b/5JuJEXhe/ATTI00d30d0f1e90294d75fa0d18df1ff0e1A9B0C005/hivemind) being used for ticketing.

Backend API documentation can be found [here](https://fork-baryonyx-771.notion.site/Backend-api-v1-documentation-86b8c007cc114fa7ba5507ae83f7b172).

Websocket documentation can be found [here](https://fork-baryonyx-771.notion.site/Websocket-Documentation-38374367ce3f40cca5d9ddca44ee8e22).

The "ConfigOptions" standard docs can be found [here](https://fork-baryonyx-771.notion.site/roomConfigOptions-Documentation-38f7112aec6d43b3bb9a3031eaa17771).

Frontend documentation can be found [here](https://fork-baryonyx-771.notion.site/Frontend-Documentation-63fba7073c87477c9223a9586e3df1b0).
