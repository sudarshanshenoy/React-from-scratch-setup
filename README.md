## SETUP REACTJS FROM SCRATCH USING VARIOUS JAVASCRIPT TOOLS
##### This documentation was done as i was learning from https://egghead.io/courses/modern-javascript-tooling-with-react

##### At egghead.io we can learn the difficult parts of the techologies in a very easy and understandle short video from field leading experts. I am very happy with experience and the things i am learning at egghead.io. [Click here](https://egghead.io/?rc=k8fwwp) to signup now

### 1. Create a project and initialise a git repo
Note: I am assuming you have the git and latest nodejs installed.
Open the terminal and create a folder where you want keep the project code
```
 mkdir react-from-scratch
 cd react-from-scratch
 npm init
```
A list of config questions will be asked. Answer all of them and submit.
Now we have the package.json created in our folder. 
Lets initialize the git now.
```
git init
```
this will initialize the git. Now lets commit the package.json file
```
git status
git add .
git commit -m "Initial commit"
```
We have commited the file locally but not yet pushed to the remote.
Create a repository in your github repository and it will show the details to push the data from a existing local repository. Copy and paste it in your terminal
It will look something like this

```
git remote add origin https://github.com/sudarshanshenoy/React-from-scracth-setup.git
git push -u origin master
```

### 2. Start with Javascript and Webpack
Create a folder with name src and create index.js file with the following content
```
console.log("Hello World");
```
Now to bundle the javascript file we have to install Webpack
```
npm install --save-dev webpack webpack-cli
```
Now you can see node_modules folder and inside that the there is .bin folder
Open the .bin and you can see executable file for webpack
Let run and see what happens.
```
node_modules/.bin/webpack
```
When you run this a bundle javascript file is generated in the dist folder
Lets run the bundle file 'main.js' file
```
node dist/main.js
```
This will output 'Hello World'

Rather than running 'node_modules/.bin/webpack' every time we can add it to the scripts in package.json
```
"scripts": {
    "build": "webpack --mode production",
    "test": "echo \"Error: no test specified\" && exit 1"
 }
```
Now we can run the following command to build the files
```
npm run build
```
Now if we run 'git status' command we can find that there is node_modules, dist and some other files as well.
We dont want to add node_modules and dist to github. 
Create a file called gitignore with the following content to ignore these folders
```
dist/
node_modules/
```
### 3. Add webpack.config.js file
First let add a new js file person.js with following content
```
const person = 'Sudarshan Shenoy'

export default person;
```
and import the file in index.js
```
import person from './person';

console.log(`Hello ${person}`);
```
Create webpack.config.js with following content
the entry attribute should have the path to main path from where the webpack has bundle
Under output we have path attribute which should contain absolute path to the output folder and so we use the path library from node
```
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.bundle.js'
  }
}
```
after this run
```
npm run build
node dist/app.bundle.js
```

### 4. Handle ES6 features with Babel

Let change the index.js and person.js file as follows
```
index.js:

import person from './person';
console.log(person('sudarshan shenoy'));



person.js:

const person = name => `hey ${name}`
export default person;
```
Let install babel
```
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```
Let try executing the babel on our code
```
./node_modules/.bin/babel ./src/person.js --presets=@babel/preset-env
```
This will show that our modern javascript code syntax is transformed

Let put this in webpack.config.js to automate the process of transformation during the build
To do that we will need babel loader

```
npm i -D babel-loader
```


Add new attribute in the webpack.config.js called module as follows
```
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  }
}
```
As you see module contains rules which is a array. Under rules the test key has a regex expression which say get me all the files which match this regex and give that as the input to the babel. Next exlude says not to include the files inside node_modules as metioned. Options has the option we have to give when we run the babel command

### 4. Install React and cofigure babel and HtmlWebpackPlugin
To install react run the following command
```
npm install react react-dom prop-types
```
change index.js to
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

ReactDOM.render(<App/>, document.getElementById('app'))
```
create a new file App.js
```
import React from 'react';

class App extends React.Component {
  render() {
    return <h1>Hello World</h1>
  }
}

export default App;
```
Now if we try to build this it will throw a error as it encounters JSX syntax. To solve this we will need one more loader
```
npm i -D @babel/preset-react
```
add @babel/preset-react to options in the webpack.config.js
```
module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    ]
  }
```
If you run the 'npm run build' the js file is bundled. If you run the build it gives a error as it could not recognise document.getElementById. To solve this we need HtmlWebpackPlugin as dev dependency
```
npm i -D html-webpack-plugin
```
Update the webpack.config.js file as follows
```

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}
```
Create a index.html file in in the src folder
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```
run build and open the index.html generated in the dist folder. You will see that react is installed and up and running

### 5. Run webpack in watch mode

Add the following line under scripts in package.json
```
"dev": "webpack --watch --mode development",
```
and run
```
npm run dev
```
When ever there is a change it will rebuild

### 6. Separate Webpack config for development and production
Install webpack merge
```
npm i -D webpack-merge
```
Instead of one webpack.config.js we will have 3 files
* webpack.config.base.js
* webpack.config.dev.js
* webpack.config.prod.js

Add the following to respective files
```
// webpack.config.base.js:

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}



// webpack.config.dev.js:

const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'development'
})



// webpack.config.prod.js:

const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'production'
})
```
In the package.json change the script like this
```
"scripts": {
    "build": "webpack --config webpack.config.prod.js",
    "dev": "webpack --watch --config webpack.config.dev.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
