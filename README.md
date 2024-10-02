# Joker Syn
**Joker Syn** filters and suggests the best Jokers based on your current collection. This was achieved scraping synergy data from the Balatro Wiki (https://balatrogame.fandom.com/wiki/Balatro_Wiki)
It's essentially a joker synergy finder - I made it so that I didn't have to search for jokers on the balatro wiki every time.

However, this means that the synergy database will require some serious tweaks, because there are a fair few incorrect synergies. I'm probably going to do this as I play the game - hopefully it'll even out.

The back end is hosted on Render, on the free plan. This means that if you open the vercel app, you might need to wait and refresh a few times for the backend to wake up and begin loading the joker db. I'm going to transition to a CSV database and remove the need for a back end eventually, but this is how my project was written when I first started it, and I just kinda built everything from there.

## Features
- Add and remove jokers from your collection
- Automatically suggest synergetic jokers based on your collection
- Filter and sort jokers
- Rearrange your joker collection using drag and drop

## Requirements
Ensure you have the following installed on your system:
- **Node.js** (with npm)
- **SQLite** (for database management)

## Project Structure

### Backend
The backend provides API endpoints for joker data and synergies using a Node.js + Express server with SQLite as the database. The backend serves synergies and joker data at `http://localhost:3001`.

#### Key Routes
- **GET `/get_all_jokers`** - Retrieves all available jokers.
- **POST `/find_synergies`** - Finds synergies based on the jokers in your collection.
- **POST `/add_synergy`** - Adds synergy between two jokers (requires API key).
- **POST `/delete_synergy`** - Removes synergy between two jokers (requires API key).

### Frontend
The frontend is built with React. It runs at `http://localhost:3000`.

#### Synergy Management
- You can make changes to database (removing/adding synergies) at `http://localhost:3000/dev-tools`.

## Modules

### Frontend Modules (React)
- **react**
- **react-dom**
- **react-router-dom**
- **tailwindcss**
- **framer-motion**
- **@hello-pangea/dnd**

### Backend Modules (Node.js)
- **express**
- **cors**
- **dotenv**
- **sqlite3**

### Installing Dependencies
To install the required modules for both the frontend and backend, run:

`npm install`


## Running the Project

### Running the Backend
1. Rrquires the SQLite database
2. Run the backend (server.js):

`node server.js`

3. Backend server will be running at `http://localhost:3001`.

### Running the Frontend
1. Start the development server:

`npm start`

2. Available at `http://localhost:3000`.

### Both the frontend and backend need to run simultaneously in order for the app to work.

## Environment Variables
Managing synergies requires you to make a **.env** file with following:

`API_KEY=your_secret_api_key`

I added this just so that people couldn't modify the database at will on the vercel app. You could remove the API key functionality when you're running on local machine.

## Screenshots
### Joker Management
![Joker Management Screenshot](https://github.com/user-attachments/assets/bbb96d27-1cb2-4955-bfbe-fd4b7815d217)

### Dev Tools
![Dev Tools Screenshot](https://github.com/user-attachments/assets/e7965ef5-0805-4133-8ad5-f4a6808c1055)

## Known Issues
- Selecting a joker and immediately removing it causes the jokers to still appear until the next update.
- Tested on 2560x1440 resolution, but not sure how it looks on other screen sizes, not even sure if mobile is supported (probably not.)
- Some jokers will be listed as synergetic even though they are not. This was a result of poor scraping from the Balatro Wiki. (ie, the X2 mult collection of jokers such as the family, the duo, are listed as synergies with each other.)

## To-Do List
- Add a swirl background to match the Balatro style.
- Improve UI design for a better user experience.
- Add logic for copying joker data (like `Blueprint` functionality).
- Show stats for each joker on hover or right-click.
- Add colorblind mode
