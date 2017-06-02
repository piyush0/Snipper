# Snipper

This is a simple desktop app that lets you save your most frequently used Code Snippets with syntax highlighting.

## Screenshots
![](./screenshots/Screen%20Shot%202017-06-02%20at%206.07.20%20PM.png)
![](./screenshots/Screen%20Shot%202017-06-02%20at%206.07.34%20PM.png)


## How to install
```
git clone https://github.com/piyush0/Snipper

cd Snipper

npm install
```
Install mongodb if you haven't already, For mac : ``` brew install mongodb ```

Setup Mongodb
```
mkdir db

mongod --dbpath="./db"

```
## How to run

```
npm start
```
## Technologies involved

+ Electron
+ Nodejs
+ Mongo DB
+ Ace Editor for Syntax Highlighting 

## TODO

- [ ] Add a sort by functionality so that snippets can be sorted on the basis of language, title or date.

- [ ] Creating installation packages for Windows, Mac and Linux

- [ ] Optimise ace and bootstrap packages to reduce size

- [ ] UI improvements
