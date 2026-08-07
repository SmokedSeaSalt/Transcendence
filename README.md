*This project has been created as part of the 42 curriculum by dbakker, egrisel, mgroos, mvan-rij.*

# Gotta type(bike) fast!

## Description
[//]: <> (A “Description” section that clearly presents the project, including its goal and a brief overview.)
[//]: <> (section should also contain a clear name for the project and its key features.)

This project is a web application for a (multiplayer) typing speed game.
"Hit keys on your keyboard to type characters faster than the competition"

### Features
[//]: <> (Brief description of each feature’s functionality.)

- Simple single player.
- Multiplayer rooms.
- User login for result logging.
- User page to view results and progress.
- Option to view match as non-player
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

| Architecture | Tech Stack | Justification |
| :----------- | :--------- | :------------ |
| Frontend      | React + TypeScript is used as the primary framework. For our styling solution we are using Tailwind CSS. To serve the static compiled pages we are using NGINX as the webserver. We are using Socket.io for the client side handling of the WebSockets. Npm is used as package manager for development and to run setup/start scripts. | ReactJS is industry standard. Reusable components are a useful feature of ReactJS for our project as we have reuse many component like buttons and text fields. Tailwind makes styling much easier than plain css. Typescript helps prevent run time errors by performing type checking at compile time. Socket.io was used because this is a real time game so using sockets is more efficient than sending many separate http requests to the backend. NPM is the most used package manager for JS and has millions of packages. |
| Backend       | ExpressJS + TypeScript is used as the primary framework. We are using Prisma ORM as our bridge to the database. To document our API we use OpenAPI for the specification and Swagger to create our documentation pages. We are using Socket.io for the server side handling of the WebSockets. Npm is used as package manager for development and to run setup/start scripts. Socket.io was used for game logic communication between client and server.| ExpressJS is widely used in industry. It is a simple framework so it is a good first framework to learn. It is a javascript/typescipt framework so the frontend and backend can be in the same language, meaning we only had to learn one new language. Typescript helps prevent run time errors by performing type checking at compile time. Prisma ORM makes interacting with the database easier as we don't have to write raw SQL queries and it has builtin SQL injection protection. Socket.io was used because this is a real time game so using sockets is more efficient than sending many separate http requests to the backend. NPM is the most used package manager for JS and has millions of packages. |
| Database      | A default postgress installation is used as the database. | Industry standard database that integrates seamlessly with prisma ORM.  |
| Webserver | NGINX is used as the primary webserver to route traffic from outside to each of our containers. | Industry standard and makes implemeting https easy. Also some teammates already used nginx in a previous project, so there was less time spent learning how it works. |

### Database Schema
[//]: <> (Visual representation or description of the database structure.)
[//]: <> (Tables/collections and their relationships.)
[//]: <> (Key fields and data types.)

## Subject Modules
[//]: <> (◦ Which team member(s) worked on each module)
[//]: <> (◦ todo better justification)

| Modules | Points | Implementation | Justification | Contributed |
| :------ | :----- | :------------- | :------------ | :---------- |
| **WEB** Use a framework for both the frontend and backend. | 2 | We are using React for the frontend and ExpressJS for the backend. | ReactJS is industry standard. Reusable components are a useful feature of ReactJS for our project as we have reuse many component like buttons and text fields. ExpressJS is widely used in industry. It is a simple framework so it is a good first framework to learn. It is a javascript/typescipt framework so the frontend and backend can be in the same language, meaning we only had to learn one new language. | All team members have contributed/worked with both frameworks. |
| **WEB** Implement real-time features using WebSockets or similar technology. | 2 | The game logic communicates via WebSockets to receive and send updates to clients and the server. | Socket.io was used because this is a real time game so using sockets is more efficient than sending many separate http requests to the backend | egrisel and mvan-rij have implemented and worked with the backend logic for the sockets. mgroos and mvan-rij have implemented and worked with the socket for the frontend. |
| **WEB** use ORM for the database. | 1 | Prisma is used for an ORM compatible database. | Prisma ORM makes interacting with the database easier as we don't have to write raw SQL queries and it has builtin SQL injection protection. | All team members have contributed/worked with the ORM database. |
| **WEB** A public API to interact with the database with a secured API key, rate limiting, documentation, and at least 5 endpoints. | 2 | The api has secure hashed API tokens, rate limiting middleware, industry standard Swagger documentation and enough endpoints. | We wanted to learn how APIs work and how to build them. Also we want to provide a way for users to interact with our service programmatically. | dbakker and egrisel have implemented API endpoints. egrisel has implemented the API key, rate limiting and documentation. |
| **Accessibility and Internationalization**  Support for additional browsers. | 1 | During development only browser features that are industry standard and widely supported were used. | We want users to be able to use different browsers. | All team members have worked on keeping the code flexible across browsers. |
| **User Management** Game statistics and match history. | 1 | We track the users wins, total games, wpm(words per minute) cpm (characters per minute) and accuracy (correctly typed characters out of all typed characters). These are displayed on their profile. This is also where a user can access their match history and wpm/accuracy progression over time. | We want users to be able to see their performance and progression so they know what they need to improve on. | All team members have contributed/worked with the user game statistics and history. |
| **Gaming and user experience** Implement a complete web-based game where users can play against each other. | 2 | We made a realtime multiplayer typing speed game. You win by typing the prompt the fastest, and can't continue until you fix your own errors. | We like online games like typeracer and monkeytype and thought it would be fun to play and technically challenging to implement. | egrisel, mgroos and mvan-rij contributed/worked on the implementation of the game. |
| **Gaming and user experience** Remote players — Enable two players on separate computers to play the same game in real-time. | 2 | Multiple players from within the same network can play together. With proper setup like DNS and port-forwarding, remote players from different networks are also possible. | Due to how the game works, we need multiple computers for multiplayer to work properly. | egrisel and mvan-rij have worked on the project configuration to make this possible. egrisel, mgroos and mvan-rij have implemented code logic for this module to work. |
| **Gaming and user experience** Multiplayer game (more than two players). | 2 | The game supports up to a server side configurable amount of players (default 100) per lobby that are all playing against each other. | We want to be able to play with many friends at the same time to see who can type the fastest. | egrisel and mvan-rij have worked on the project configuration to make this possible. egrisel, mgroos and mvan-rij have implemented code logic for this module to work. |
| **Gaming and user experience** Implement spectator mode for games. | 1 | You can join a room as spectator at any time and get updates about the players in that room. | We want users to be able to watch their friends play if they are not in the mood to play the game themselves. | egrisel and mvan-rij have implemented the code logic for this module to work. |
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

The team organized the work by dividing the work into smaller tasks. These were then distributed to the team by preference per team member. These tasks were mamnaged using GitHub Issues to keep track of progress and responsibility. For communications a mix of in-person (impromptu) meetings and Slack. A small progress meeting (standup) was held almost daily, in these meeting the progress and any roadblocks were discussed.

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
- User API for getting user results and information.
- Admin API for getting users, deleting users and API keys.

Personal challenges faced and overcome:
- The challenge to learn Typescript was overcome with the power of the internet.


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

Personal challenges faced and overcome:
// todo egrisel

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

Personal challenges faced and overcome:
Documentation was less helpful than usual due to the combination of languages/styling/etc used (example: ReactJS solutions only work once also transposed to TypeScript). I had to rely more on forum posts and help from peers.

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

Personal challenges faced and overcome:
// todo mvan-rij

## Resources
[//]: <> (A “Resources” section listing classic references related to the topic (documentation, articles, tutorials, etc.), as well as a description of how AI was used — specifying for which tasks and which parts of the project.)

ReactJS:
- https://www.geeksforgeeks.org/reactjs/reactjs-classname-attribute/
- https://react.dev/reference/react/useState
- https://dev.to/madv/usecontext-with-typescript-23ln
- https://lovetrivedi.medium.com/unlocking-the-full-potential-of-react-context-with-custom-hooks-f3d7e3a3d403
- https://medium.com/@kimtai.developer/react-typescript-authentication-guide-using-context-api-5c82f2530eb1

Tailwind / CSS
- https://github.com/tailwindlabs/tailwindcss/discussions/1507
- https://www.reddit.com/r/tailwindcss/comments/14cc9m1/tailwind_styles_not_working_when_passed_as_a/?solution=423c8a6a6c39a0c5423c8a6a6c39a0c5&js_challenge=1&token=7afd7253fec22262ff1c52b1703fe9eccb9064a97031e5cc54bfc1a0ca9f0e4b&jsc_orig_r=
- https://www.geeksforgeeks.org/css/how-to-add-a-box-shadow-on-one-side-of-an-element-using-css/
- https://www.material-tailwind.com/docs/react/table

ExpressJS
- https://www.youtube.com/watch?v=SccSCuHhOw0


### Special mentions
Inspiration:
[TypeRacer](https://play.typeracer.com/)
[monkeytype](https://monkeytype.com/)

### AI Usage
AI was used for ideation, researching, explanation and debugging. In some cases example snippets of code provided by AI were used and adapted to our use case. AI was NOT used to create complete features, only provide examples and feedback.