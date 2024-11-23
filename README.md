# Joker Syn
**Joker Syn** filters and suggests the best Jokers based on your current collection. This was achieved scraping synergy data from the Balatro Wiki (https://balatrogame.fandom.com/wiki/Balatro_Wiki)
It's essentially a joker synergy finder - I made it so that I didn't have to search for jokers on the balatro wiki every time.

However, this means that the synergy database will require some serious tweaks, because there are a fair few incorrect synergies. I'm probably going to do this as I play the game - hopefully it'll even out.

The back end is hosted on Render, on the free plan. This means that if you open the vercel app, you might need to wait and refresh a few times for the backend to wake up and begin loading the joker db. I'm going to transition to a CSV database and remove the need for a back end eventually, but this is how my project was written when I first started it, and I just kinda built everything from there.

# README is a WIP 

## Features
- Add and remove jokers from your collection
- Automatically suggest synergetic jokers based on your collection
- Filter and sort jokers
- Rearrange your joker collection using drag and drop

## Project Structure

### Frontend
The frontend is built with React. It runs at `http://localhost:3000`.

#### Synergy Management
- You can make changes to database (removing/adding synergies) at `JokerData.js`. 

### Frontend Modules (React)
- **react**
- **react-dom**
- **react-router-dom**
- **tailwindcss**
- **framer-motion**
- **@hello-pangea/dnd**

### Installing Dependencies
To install the required modules:

`npm install`

## Screenshots
### Joker Management
![Joker Management Screenshot](![image](https://github.com/user-attachments/assets/06be36a5-2e25-4e69-a56d-211bc9511fd5)

