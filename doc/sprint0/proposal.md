# Project Objectives

Our project specifically aims to solve the issue of quickly and efficiently forming suitable groups of like-minded individuals on a large scale, where the physical forming of groups is infeasible or impractical (generally, this means more than 60-70 people).

This is done by inviting participants to an online (code-guarded) room opened by the “host,” who then creates a temporary profile based on criteria specified by the host. These criteria may consist of numerical values (ex: target grade in a university setting), list selections (ex: business or personal interests, project topics, or professions), or timetables (schedule availability), and participants may choose not to answer some questions (interpreted as “no preference”).

Based on inputted fields, our application algorithmically recommends users other room members they would want through a sorted list (based on calculated preference in decreasing order).

Participants may then choose to accept, reject, or remain indifferent to each recommended person. After this final decision, the groups are formed, and members are invited to their respective groups with a simple group chat for any necessary communication.

In the end, our software guarantees each person a group, where the groups are optimized with respect to mutual interest.

Remarks:

- Participants are given a fixed time limit to create their profiles and swipe through their recommendations.
- The host may specify how large each group is, either a fixed value or a range.
- Hosts are recommended to think of 4-6 parameters for their participants (enough data to form strong opinions, but not too much to become tedious for participants to answer)
- In an effort to make the process as fast and convenient as possible, we opted for a web application instead of a full application that users download.
- You can join a group with people you know prior to being put into matchmaking.
- There is a dramatic speed improvement. Physically you can only ask one person at a time, but with our site, participants are compared with all possible candidates in one go.
- Where suitable, our algorithm uses a phase space to evaluate relative compatibility, similar to techniques used in machine learning. Now given a numerical preference, our algorithm resembles the Gale-Shapley algorithm, which is used to solve the stable matching problem.
- This addresses the “chicken and egg problem” as its use and value are localized to the group at hand. So long as the host wishes to use the product, group members are automatically required to use the app.

# Key Users

The key users of our software can be categorized into four groups: business organizations, educational instructors, event organizers, and people looking to meet others of similar interests. That said, our main target demographic for the initial release will be educators looking to group students in their classes.

# Scenarios

Our software is especially useful in the following three scenarios:

1. Each group must be **relatively large** (generally, this means over five people per group).
2. Some participants are **inaccessible** or difficult to invite physically.
3. Participants are in a new environment where **no one knows each other**.

- Business project:

  - You are a business organization looking at how to best group people for a new project. Each portion of the project is significantly large, so you need at least **6-7 members for each group**. You have hundreds of employees, and while you could manually group each person based on their resume and spoken preference, this problem is much better suited to be solved computationally on a collective level.

- University student groups:

  - You are a professor running a class of over 100 students with multiple lecture sections and looking to split students into groups of five. While most students usually have a small social circle within a class, this often includes only 2-3 others at most. Filling in the empty spot becomes tricky and tedious: there is incomplete information about who is already in a group and each person’s interests and goals. Moreover, **searching for members outside their own lecture section is difficult**. Our software synthesizes this crucial information on a collective scale and saves the hassle of searching and interviewing each person directly.

- Networking Event:
  - You are hosting a networking event of 200 participants where business owners of different sectors can meet one another in search of potential collaboration. **No one knows one another** (the whole reason they are here), but they want to quickly find others with a similar vision and aspirations while, at the same time, people of different skill sets so that each person brings something new to the table. With our software, people spend less time hunting for the right partner and more time discussing plans for the future.

Other applicable scenarios include forming groups for volunteering based on tasks of interest and recruiting members for school clubs.

# Principles

Our core principles of this project are:

- Satisfaction and user experience (at the end of the day, the goal is so that everyone ends up in a group they are happy in without taking too much time or causing headaches)
- Speed (should not take too long to complete the process)
- Ease of use (clean interface, and must be casual with low effort needed)
- Flexibility (users can customize groups later if needed)

# Market Research

Investigating the available solutions that exist for this problem reveals disappointing results. They either provide no “optimization” for group cohesiveness or are too specific to be used in a general setting while giving members little to no say in whom they are grouped. This realization presents a dilemma of choosing no better than random chance or a different app for every scenario.

As a sample of the solutions that currently exist, below are the results found when searching “group creator.”

- [https://www.classtools.net/random-group-generator/](https://www.classtools.net/random-group-generator/)
- [https://commentpicker.com/team-generator.php](https://commentpicker.com/team-generator.php)
- [https://pickerwheel.com/tools/random-team-generator/](https://pickerwheel.com/tools/random-team-generator/)
- [https://www.randomlists.com/team-generator](https://www.randomlists.com/team-generator)

Searching for more specific tools like “group management” also did not help. They are either completely irrelevant or, as mentioned, provide little personal control.

- [https://doublethedonation.com/group-management-software/](https://doublethedonation.com/group-management-software/)
- [https://www.scoro.com/blog/best-team-management-software/](https://www.scoro.com/blog/best-team-management-software/)

This community is quite a niche, and it is clear that the market for it has yet to reach its fullest potential. And yet, there is no doubt that this is a pressing issue. Our greatest commodity is time, and at that, time well spent. The loss of potential exacted by bad team forming is a significant, albeit largely unseen, issue. But just how many people are looking for this kind of product?

The most popular solutions on the market include “Team Maker” on Google Play which has over 10,000+ downloads despite having an abysmal 2.0-star rating. “Group Maker,” another random group generator, has over 50,000+ downloads with a not much better rating of 3.0. Evidently, this kind of group-making product is in high demand, and no product delivers a satisfying user experience.

# Feasibility

Many of the components we want to incorporate already exist in other apps as proof of concept. Kahoot allows room-based interactions, tinder allows swiping, and chat-based applications are plentiful. Moreover, we plan to make our website design clean and minimalistic, so creating the user interface should be quick.

The only main concern, then, is the actual algorithm used for matching. Fortunately, phase spaces have already been used extensively to solve real-world problems regarding “similarity.” Ultimately, this boils down to computing each person’s relative distance in phase space, a manageable task once we get our database working. Furthermore, we have a guiding trail in solving this matching problem by following the Gale-Shapley algorithm.

# Novelty

As mentioned in the market research section, there are no tools that both (1) use personal preference as a means of group making and (2) guarantee each person is in a group. Our software makes this dream outcome possible for any situation that involves forming teams.

# Business Potential

Similar to zoom, our first users would be professors in a university setting and networking event organizers. Once the idea of group matching in this way becomes commonplace, we can expand outwards and pitch the product to businesses and everyday people (for social purposes), where it can reach and impact a much larger audience.

As for profitability, we can extend features that may be useful for those committed and happy with the product. For instance, a free plan that allows X amount of participants (say 150) and a paid version that allows for more. We can also add extra features for the formed groups, such as cosmetic enhancements, to their profiles.
