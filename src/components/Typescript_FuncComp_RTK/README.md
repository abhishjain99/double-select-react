## Installations
- npm install react-redux @reduxjs/toolkit
- npm install --save typescript @types/node @types/react @types/react-dom @types/jest

## Flow
- `todoThunk` uses `todoAPIs`
- `todoSlice` uses `todoThunk`
- `todoStore` uses `todoSlice` and `todoThunk`
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