PROPOSAL DRAFT - JAN 20 2023 - NEED FEEDBACK

# Problem: 
Making groups for courses where you don't know people well is difficult, and the provided means of getting into groups (being autoassigned by the prof, using piazza and risking getting no responses/ghosted, or simply "talking to people") are not always viable.


# Solution: 
Groupmaking Application (name undecided, though considering "HiveMind"?)


# How it works (general idea, will likely be tweaked):
Essentially the prof creates a "room" with a code and provides it to the class, similarly to how Kahoot has a code that lets everyone in the class join a singular game room.
Once you join, the idea is to customize a temporary profile and then swipe through the people in the class like Tinder for who you want to work with (alternatively, use scores from 1-5 if yes/no is too restrictive in our algorithm? undecided.) We would give options to match fields such as goals for final grades in the course, preferred topics for the project (e.g. if the prof has a set list of topics and each group must pick one), what days of the week you are available to work, etc. so you get matched with people who provide optimal cohesiveness in your group. We haven't thought all the way through about specifics, but we would likely let the prof have some control over which matching fields are included in profiles in their room.


# Remarks
1. We believe this overcomes the chicken egg problem since the prof would simply say "open the app and use this code" and 50+ people in the lecture section would be forced to join. This also aids collaboration across lecture sections since you would be able to group up/meet with people you would otherwise never meet in other sections.
2. This application will not be useful to everyone, but the people who use it will probably love it, which is one of the goals from lecture.


# Key users (see "Scalability" section below for more information)
1. Hosts - people running activities that need attendees to be in groups
2. Participants


# Scalability:
1. This has a significant potential for growth; think of how many courses there are with groupwork components, sometimes with multiple group assignments per semester. This can scale to other academic institutions as well.
2. The premise of the idea is not restricted to educational contexts only. For example, consider an event or workshop you attend that requires some degree of collaboration; this application would provide a quick and easy way to group up if we allow hosts to configure the fields used to match people. 


# Architecture
Not completely sure but leaning towards a "three-tiered" architecture based on our limited reading. We are quite inexperienced with full stack development and web development so we are open to ideas/recommendations for architectures, stacks, etc.


# Market research
We were unable to find any tools that gave the level of control and optimization that we are seeking to offer.

1. One of the common platforms we found were simple sites that partition n participants into x roughly similar-sized groups, however, there is no "optimization" here of group cohesiveness. Simply searching "group creator" brings up several results:
    https://www.classtools.net/random-group-generator/
    https://www.randomlists.com/team-generator
    https://pickerwheel.com/tools/random-team-generator/
    https://commentpicker.com/team-generator.php

2. Broadening our search query for more professional/complex sounding titles, like "group management" also did not help. All of these applications for grouping people are either completely unrelated to what we are trying to accomplish (e.g. partitioning a customer base for PR communications - https://doublethedonation.com/group-management-software/), or too corporate (e.g. managers controlling their team members below them, with team members naturally having minimal control over who they work with - https://www.scoro.com/blog/best-team-management-software/).