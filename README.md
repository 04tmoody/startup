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
  
  
### HTML deliverable  
  
For this deliverable I built out the structure of my application using HTML.  
  
- **HTML pages** - Three TML pages: One main one with the message log and main art board, one for creating an account and one with information on the project.  
- **Links** - The login bar on all pages, and the create account button, automatically link to the main art board. The login bar also has an optional link to the create an account page. The logo in the top left of all pages links to the main art board. Additionally the footer links to my github and the about page.  
- **Text** - The about page has text describing the project. The input forms for login, account creation, and the footer all use text as well. The message log utilizes text to display messages.  
- **Images** - The site uses an image for a favicon, and as the logo in the top left of all pages.  
- **DB/Login** - Input box and submit button for login. The art board represents data pulled from the database.  
- **WebSocket** - The message log results represents the messages sent out from realtime interaction with the board.  
