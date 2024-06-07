## Installations
- npm install react-redux @reduxjs/toolkit
  - ( If you already have typescript installed, npm uninstall ts-node typescript @types/node )
- npm install express @types/express 
- npm install --save-dev nodemon 
- npm install cors
- npm install --save typescript @types/node @types/react @types/react-dom @types/jest
- npm install jsonwebtoken

## CONSTANTS in server.js
- PORT: We are using `3000`. But if needed, change `PORT` in `server.js` as well as `todoAPIs.tsx`.
- Read Write Paths:
  - We have 2 different paths as these are relative paths wrt the read and write directories.
  - Reading is done from `src/components/TFCRTK_express_jwt/BackEnd/server.js` .
  - Writing is done from `react-todolist` where the node is running.

## Flow
- `todoAPIs` uses `todoInterfaces`
- `todoThunk` uses `todoAPIs` and `todoInterfaces`
- `todoSlice` uses `todoThunk` and `todoInterfaces`
- `todoStore` uses `todoSlice` and `todoThunk`
- `Todolist` uses `todoStore`, `todoInterfaces`, `TodolistItem`, and `todoThunk`

## package.json updates
Remember to replace "scripts" of `package.json` following lines:
```
"scripts": {
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "start": "node ./src/components/TFCRTK_express_jwt/BackEnd/server.js",
  "express:server": "nodemon ./src/components/TFCRTK_express_jwt/BackEnd/server.js",
  "react:client": "react-scripts start",
  "dev": "npm run express:server & npm run react:client"
},
```

## Add tsconfig.json in root directory
```
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}
```