# joker-syn
Filters the best Jokers based on what you already have 

## Requirements

- Python 
- Node.js & npm


### backend
backend provides API en
point for joker data and synergies

#### modules

- flask
- flask-cors


#### backend

Need to run list-app.py (backend) alongside frontend,

serves synergies at `http://localhost:5000`.
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


# Known Issues

- code is very bloated and definitely could do with a clean up
- some jokers (eg The Duo, the Trio) will be listed as synergies, which needs to be fixed
- Selecting a joker and then immediately removing it causes the jokers to still appear on the right until the next update

- Not sure how this would look on other resolutions from 2560x1440
- grid element sometimes clips with the column divider when hovering over it
- could probably set width to some factor of vw as well 
