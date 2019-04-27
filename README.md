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


