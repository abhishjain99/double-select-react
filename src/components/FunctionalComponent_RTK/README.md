## Install react-redux and reduxjs/toolkit
npm install react-redux @reduxjs/toolkit

## Flow
- `todoThunk` uses `todoAPIs`
- `todoSlice` uses `todoThunk`
- `todoStore` uses `todoSlice`
- `Todolist` uses `todoStore`

## package.json updates
Remember to replace "scripts" of `package.json` following lines:
```
"scripts": {
  "json:server": "json-server --watch ./db.json",
  "react:server": "PORT=3001 react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "start": "npm run react:server & npm run json:server"
},
```