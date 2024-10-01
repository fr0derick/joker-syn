# joker-syn
Filters the best Jokers based on what you already have 

## Requirements

- Python 
- Node.js & npm


### backend
backend provides API en
point for joker data and synergies

### modules

#### python

- flask
- flask-cors

#### react

- tailwindcss
- react-dom
- react-router-dom
- framer-motion 
- @hello-pangea/dnd
- dotenv
- 
#### backend

Need to run list-app.py (backend) alongside frontend,

serves synergies at `http://localhost:5000`.
manage connections at `http://localhost:5000/dev-tools`

### UPDATE: moved backend to server.js
still need backend and frontend simultaneously. 

### 2. Frontend


#### modules

idk what modules but to install modules

```
npm install
``` 

#### running the frontend
to run frontend
```
npm start
```

then navigate to `http://localhost:3000` in your web browser

Frontend and backend need to run simultaneously

![image](https://github.com/user-attachments/assets/bbb96d27-1cb2-4955-bfbe-fd4b7815d217)



![image](https://github.com/user-attachments/assets/e7965ef5-0805-4133-8ad5-f4a6808c1055)


# Known Issues

- animation code has a lot of conflicts
- managing synergies needs to be vice versa
- Selecting a joker and then immediately removing it causes the jokers to still appear on the right until the next update
- drag and drop animations are inconsistent
- Not sure how this would look on other resolutions from 2560x1440
- adding a joker to your collection from the synergies panel results in huge issues, especially with drag and drop and removing jokers
- drag and drop visual is fucked. you can still drag and drop, but the joker your dragging now goes invisible

# To Do

- ~~replace grid elements with joker card images~~
- ~~make jokers overlap each other like in Balatro when you have too many jokers~~
- ~~add more animations to grid elements to reflect balatro style~~
  - added animations with great customizability, but they sometimes bug, I think because there's conflicts with `framer motion` and `hello-pangea/dnd` 
- add balatro swirl background
- Introduce better UI
- maybe add logic for copying jokers like blueprint to copy the ID of the joker to the right
- ~~drag and drop to rearrange Your Jokers panel~~
- ~~sort joker search panel alphabetically~~
- show stats for each joker on hover or right 

- **stop accidentally uploading the README of react**
