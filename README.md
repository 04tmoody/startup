# startup
CS 260 Startup Project

## Specification Deliverable

### Elevator Pitch

Drawing is fun! Drawing alone is less fun. Connect with the world in Retro Renditions: An online grid-based art board where everywhere can contribute their ideas to one global work of art! Save the board at any time to capture your masterpiece, and see who's editing with you to join together in fun. Feel free to draw a tic tac toe board or anything else to play games with others too! The options are limitless with Retro Renditions.

### Design

![Design](StartupDesign.jpg)

Here's a sequence diagram showing how to people can interact with the backend to draw.

![Sequence diagram](SequenceDiagram.jpg)

### Key Features

- Secure login over HTTPS
- Ability to choose what color you're using
- Ability to change the color of a square in the global grid
- Display the grid, including everyone's changes in realtime
- Ability to save the board as an image
- Shows people joining and changing the board in realtime
- Simple chat functionality
- Global board is stored persistantly

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses proper HTML structure for all webpages. Three pages: homepage with info, account creation page, and main drawing page. Hyperlinks between pages.
- **CSS** - Styling webpages consitently throughout to match the retro style of the created images. Good spacing and a neutral color pallete. Styling works on different device types and sizes.
- **JavaScript** - Provides login, drawing board display, drawing board changes, color choice, backend endpoint calls.
- **Service** - Backend service with endpoints for:
  - login
  - retrieving global board
  - submitting changes to board
- **DB/Login** - Store users, and the global board in database. Create new users and login existing users. Securely store credentials in database. Can't draw without being authenticated.
- **WebSocket** - Push out simple broadcast such as joining, reaching coloring milestones, and simple chat.
- **React** - Application ported to use the React web framework.
