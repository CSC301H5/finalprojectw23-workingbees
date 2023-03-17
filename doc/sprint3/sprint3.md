## Sprint Goal
The sprint goal is to set time limits for the various phases of the application and enable matching groups to accept or reject recommendations (of other matching groups) given to them by an algorithm. We are also looking to provide the host with a view of how many people have joined the hive and how many have finished responding to their recommendations.

## User Stories
In particular, this goal refers to user stories 5, 7, and 9 (for timers and skipping to the next phase) and 8, 26, and 27 (for responding to given recommendations and updating the host's view).

## Team Capacity
Our team capacity was generally measured in terms of the features we could implement. As a refined measurement of this, our team decided to make our story points based on a measure of time needed and overall importance (roughly an hour or two per story point). Our team capacity for this sprint was about 22 story points, which equates to 3-4 story points per member.

## Task Breakdown
Arjun is responsible for setting up timers for the server and writing the endpoint for the host to skip to the next phase.

Calvin is responsible for constructing an algorithm to recommend matching groups to one another and allowing matching groups to respond to these recommendations.

Katty is responsible for creating waiting pages for the host where they can see how many users have joined and finished responding to their recommendations.

Morgan is responsible for setting up web sockets for the client (attendees) to alert them if the next phase has started early.

Jeremy is responsible for enabling the host to skip to the next phase using a button and finishing the group creation page from sprint 2.

Joshua is responsible for displaying the timer on the client side and styling the frontend pages.

## Spike
A significant anticipated spike is learning how to use effectively implement timers and handle states of inconsistency (like starting the next phase if some matching groups have not finished responding).

## Participants
The sprint plan meeting participants include all team members (Calvin, Arjun, Katty, Morgan, Jeremy, and Joshua), and each person has had a say in deciding our overall goals for the sprint.