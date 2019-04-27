## SETUP REACTJS FROM SCRATCH USING VARIOUS JAVASCRIPT TOOLS
##### This documentation was done as i was learning from https://egghead.io/courses/modern-javascript-tooling-with-react

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
