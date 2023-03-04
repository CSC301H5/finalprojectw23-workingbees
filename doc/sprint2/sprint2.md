## Sprint Goal
The sprint goal is to allow the host to create a hive with custom questions for the attendees to answer for matchmaking. We are also looking to enable initial group creation via invitations and the ability for attendees to answer and submit responses to these questions.

## User Stories
In particular, this goal refers to user stories 3 and 10 (for the host to configure hive options), 25 (for attendees to invite each other into groups), and 24 (for matching groups to create a team profile by answering questions made by the host).

## Team Capacity
Our team capacity was generally measured in terms of the features we could implement. As a refined measurement of this, our team decided to make our story points based on a measure of time needed and overall importance (roughly an hour or two per story point). Our team capacity for this sprint was about 21 story points.

## Task Breakdown
Arjun is responsible for setting up WebSockets for real-time notifications from sending, accepting, and rejecting invites.

Calvin is responsible for checking that the configured questions made by the hosts are valid and that submitted responses to these questions are also valid.

Katty is responsible for creating the frontend components needed for matching groups to submit their response.

Morgan is responsible for creating the frontend components needed for the host to configure questions for the hive.

Jeremy is responsible for creating an interface for attendees to send, accept, and reject invites.

Joshua is responsible for styling, updating the logged-in page and creating buttons for publishing responses.

## Spike
A major anticipated spike is learning how to use WebSockets to enable real-time communication between the pages displayed by the frontend team and changes made to the database by the backend.

## Participants
The sprint plan meeting participants include all team members (Calvin, Arjun, Katty, Morgan, Jeremy, and Joshua), and each person has had a say in deciding our overall goals for the sprint.