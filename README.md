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

- react-dom
- react-router-dom


#### backend

Need to run list-app.py (backend) alongside frontend,

serves synergies at `http://localhost:5000`.
manage connections at `http://localhost:5000/dev-tools`

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

![image](https://github.com/user-attachments/assets/dc418071-0d7c-4699-9694-f5d9798f8195)


![image](https://github.com/user-attachments/assets/e7965ef5-0805-4133-8ad5-f4a6808c1055)


# Known Issues

- code is very bloated and definitely could do with a clean up
- some jokers that are part of a collection of jokers will be listed as potential synergies, which is incorrect (ie the family, the duo, the trio)
- Selecting a joker and then immediately removing it causes the jokers to still appear on the right until the next update

- Not sure how this would look on other resolutions from 2560x1440
- grid element sometimes clips with the column divider when hovering over it
- could probably set width to some factor of vw as well 

# To Do

- replace grid elements with joker card images
- add more animations to grid elements to reflect balatro style
- add balatro swirl background 
