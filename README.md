*This project has been created as part of the 42 curriculum by dbakker, egrisel, mgroos, mvan-rij.*

# Gotta type(bike) fast!

## Description
[//]: <> (A “Description” section that clearly presents the project, including its goal and a brief overview.)
[//]: <> (section should also contain a clear name for the project and its key features.)

This project is a web application for a (multiplayer) typing speed game.
"Hit keys on keyboard to type characters faster than the competition"

### Features
[//]: <> (Brief description of each feature’s functionality.)

- Simple single player.
- Multiplayer rooms.
- User login for result logging.
- User page to view results and progress.
- Public leaderboard.
- API for getting user results.


## Instructions
[//]: <> (An “Instructions” section containing any relevant information about compilation, installation, and/or execution.)
[//]: <> (The “Instructions” section should mention all the needed prerequisites (software, tools, versions, configuration like .env setup, etc.), and step-by-step instructions to run the project.)

### Requirements
- [Docker](https://www.docker.com/) For containerization.
- [OpenSSL](https://openssl-library.org/) To create secure certs for https.
- [npm](https://www.npmjs.com/) As package manager for development and to run setup/start scripts.

### Installation steps
1. `git clone <project_url> [local_folder_name]`
2. `cd [local_folder_name]`
3. Create a .env (an .env.example is provided with all neccecary information).
3. `npm run prod`


## Technical Stack
[//]: <> (Todo add better justification.)

| Architechture | Tech Stack | Justification |
| :------------ | :--------- | :------------ |
| Frontend      | React + TypeScript is used as the primary framework. For our styling solution we are using Tailwind CSS. To serve the static compiled pages we are using NGINX as the webserver. We are using Socket.io for the client side handling of the WebSockets. Npm is used as package manager for development and to run setup/start scripts. | Industry standard and suitable for our usecase. |
| Backend       | Express + TypeScript is used as the primary framework. We are using Prisma ORM as our bridge to the database. To document our API we use OpenAPI for the specification and Swagger to create our documentation pages. We are using Socket.io for the server side handling of the WebSockets. Npm is used as package manager for development and to run setup/start scripts. | Industry standard and suitable for our usecase. |
| Database      | A default postgress installation is used as the database. | Industry standard and suitable for our usecase. |
| Webserver | NGINX is used as the primary webserver to route traffic from outside to each of our containers. | Industry standard and suitable for our usecase. |

### Database Schema
[//]: <> (Visual representation or description of the database structure.)
[//]: <> (Tables/collections and their relationships.)
[//]: <> (Key fields and data types.)

## Subject Modules
[//]: <> (◦ Which team member(s) worked on each module)
[//]: <> (◦ todo better justification)

| Modules | Points | Implementation | Justification | Contrubuted |
| :------ | :----- | :------------- | :------------ | :---------- |
| **WEB** Use a framework for both the frontend and backend. | 2 | We are using React for the frontend and Express for the backend. | Justification | All team members have contributed/worked with both frameworks. |
| **WEB** Implement real-time features using WebSockets or similar technology. | 2 | The game logic communicates via WebSockets to receive and send updates to clients and the server. | Justification | egrisel and mvan-rij have implemented and worked with the backend logic for the sockets. mgroos and mvan-rij have implemented and worked with the socket for the frontend. |
| **WEB** use ORM for the database. | 1 | Prisma is used for an ORM compatible database. | Justification | All team members have contributed/worked with the ORM database. |
| **WEB** A public API to interact with the database with a secured API key, rate limiting, documentation, and at least 5 endpoints. | 2 | The api has secure hashed API tokens, rate limiting middleware, industry standard Swagger documentation and enough endpoints. | Justification | dbakker and egrisel have implemented API endpoints. egrisel has implemented the API key, rate limiting and documentation. |
| **Accessibility and Internationalization**  Support for additional browsers. | 1 | During delopment only browser features that are industry standard and widely supported. | Justification | All team members have worked on keeping the code flexable across browsers. |
| **User Management** Game statistics and match history. | 1 | We track the users wins, losses and wpm(words per minute). These are displayed on their profile. This is also where a user can access their match history and wpm progression over time. | Justification | All team members have contributed/worked with the user game statistics and history. |
| **Gaming and user experience** Implement a complete web-based game where users can play against each other. | 2 | We made a realtime multiplayer typing speed game. You win by typing the prompt the fastest without errors. | Justification | egrisel, mgroos and mvan-rij contributed/worked on the implementation of the game. |
| **Gaming and user experience** Remote players — Enable two players on separate computers to play the same game in real-time. | 2 | Multiple players from within the same network can play together. With propper setup like DNS and portforwarding remote players from different networks is also possible. | Justification | egrisel and mvan-rij have worked on the project configuration to make this possible. egrisel, mgroos and mvan-rij have implemented code logic for this module to work. |
| **Gaming and user experience** Multiplayer game (more than two players). | 2 | The game supports up to a server side configurable amount of players (default 100) per lobby that are all playing against each other. | Justification | egrisel and mvan-rij have worked on the project configuration to make this possible. egrisel, mgroos and mvan-rij have implemented code logic for this module to work. |
| **Gaming and user experience** Implement spectator mode for games. | 1 | You can join a room as spectator at any time and get updates about the players in thar room. | Justification | egrisel and mvan-rij have implemented the code logic for this module to work. |
| | **Total points: 16** | | |

## The Team

| Member    | Roles                     |
| :-------- | :------------------------ |
| dbakker   | Developer                 |
| egrisel   | Developer, Technical Lead |
| mgroos    | Developer, PM             |
| mvan-rij  | Developer, PO             |

| Role                 | Brief description of their responsibilities |
| :------------------- | :------------------------------------------ |
| Developer            | Write code for assigned features. Participate in code reviews. Test their implementations. Document their work. |
| Technical Lead       | Defines technical architecture. Makes technology stack decisions. Ensures code quality and best practices. |
| PM (Product Manager) | Organizes team meetings and planning sessions. Tracks progress and deadlines.  Ensures team communication. |
| PO (Pruduct Owner)   | Maintains the product backlog. Makes decisions on features and priorities. Validates completed work. |

### Project Management

The team organized the work by dividing the work into smaller tasks. These were then distributed to the team by preference per team member. These tasks were mamnaged using GitHub Issues to keep track of progress and responsibility. For communucations a mix of in-person (impromptu) meetings and Slack. A small progress meeting (standup) was held almost daily, in these meeting the progress and any roadblocks were discussed.

### Individual Contributions
#### dbakker
This team member has contributed/worked with the following modules:
- **WEB** Use a framework for both the frontend and backend.
- **WEB** use ORM for the database.
- **WEB** A public API to interact with the database with a secured API key, rate limiting, documentation, and at least 5 endpoints.
- **Accessibility and Internationalization**  Support for additional browsers.
- **User Management** Game statistics and match history.

and the following features:
- User page to view results and progress.
- Public leaderboard.
- API for getting user results.

Personal challenged faced and overcome:
// todo dbakker

#### egrisel
This team member has contributed/worked with the following modules:
- **WEB** Use a framework for both the frontend and backend.
- **WEB** Implement real-time features using WebSockets or similar technology.
- **WEB** use ORM for the database.
- **WEB** A public API to interact with the database with a secured API key, rate limiting, documentation, and at least 5 endpoints.
- **Accessibility and Internationalization**  Support for additional browsers.
- **User Management** Game statistics and match history.
- **Gaming and user experience** Implement a complete web-based game where users can play against each other.
- **Gaming and user experience** Remote players — Enable two players on separate computers to play the same game in real-time.
- **Gaming and user experience** Multiplayer game (more than two players).
- **Gaming and user experience** Implement spectator mode for games.

and the following features:
- Simple single player.
- Multiplayer rooms.
- User login for result logging.
- User page to view results and progress.
- API for getting user results.

Personal challenged faced and overcome:
// todo dbakker

#### mgroos
This team member has contributed/worked with the following modules:
- **WEB** Use a framework for both the frontend and backend.
- **WEB** Implement real-time features using WebSockets or similar technology.
- **WEB** use ORM for the database.
- **Accessibility and Internationalization**  Support for additional browsers.
- **User Management** Game statistics and match history.
- **Gaming and user experience** Implement a complete web-based game where users can play against each other.
- **Gaming and user experience** Multiplayer game (more than two players).

and the following features:
- Simple single player.
- Multiplayer rooms.
- User login for result logging.
- User page to view results and progress.
- Public leaderboard.

Personal challenged faced and overcome:
// todo dbakker

#### mvan-rij
This team member has contributed/worked with the following modules:
- **WEB** Use a framework for both the frontend and backend.
- **WEB** Implement real-time features using WebSockets or similar technology.
- **WEB** use ORM for the database.
- **Accessibility and Internationalization**  Support for additional browsers.
- **User Management** Game statistics and match history.
- **Gaming and user experience** Implement a complete web-based game where users can play against each other.
- **Gaming and user experience** Remote players — Enable two players on separate computers to play the same game in real-time.
- **Gaming and user experience** Multiplayer game (more than two players).
- **Gaming and user experience** Implement spectator mode for games.

and the following features:
- Simple single player.
- Multiplayer rooms.
- User login for result logging.
- User page to view results and progress.
- API for getting user results.

Personal challenged faced and overcome:
// todo dbakker

## Resources
[//]: <> (A “Resources” section listing classic references related to the topic (documentation, articles, tutorials, etc.), as well as a description of how AI was used — specifying for which tasks and which parts of the project.)

### Special mentions
Inspiration:
[TypeRacer](https://play.typeracer.com/)
[monkeytype](https://monkeytype.com/)

### AI Usage
AI was used for ideation, researching, explanation and debugging. In some cases example snippets of code provided by AI were used and adapted to our use case. AI was NOT used to create complete features, only provide examples and feedback.