## react-recipe-search-buddy

A web app (single page application) created with react.js free edamam api.

### Features

- Search recipe by name and meal type
- Add to favorites individual recipe
- Compare up to 3 recipes
- Recent query searches history
- Recently viewed recipes

(all favorites,compare, recent query search history and recently viewed recipes are save in browser localstorage)

### Overview

![recipe-search-buddy-ss1](https://user-images.githubusercontent.com/16351223/134060187-0d06e1bd-95a3-44cf-af21-131b98d0636e.png)

## Project setup

for local development create an .env.local file outside the src folder and copy the key below:

REACT_APP_RECIPE_APP_ID = 'add your edamam app id here'
REACT_APP_RECIPE_APP_KEY = 'add your edamam app key here'

---

for production create an .env file outside the src folder and copy the key below:

RECIPE_APP_ID = 'add your edamam app id here'
RECIPE_APP_KEY = 'add your edamam app key here'

---

```
npm install
```

### Compiles and hot-reloads for development

```
npm start
```

### Compiles and minifies for production

```
npm run build
```

### Edamam API page

https://developer.edamam.com/edamam-docs-recipe-api
