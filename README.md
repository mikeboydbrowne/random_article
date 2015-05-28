# flapper_news
This project is my first foray into the MEAN stack. Instructions for MEAN stack installation can be found at [mean.io](http://mean.io/). The tutorial that I followed to complete this project can be found [here](https://thinkster.io/mean-stack-tutorial/).

## Usage
Once you've cloned the repo use the following commands to install the node modules.
```
cd flapper-news
npm install
```
Once you've installed the node modules, you can run the application using the following commands.
```
mongod &    # run in one terminal window
npm start   # run in a second terminal window
```
Now that the application is running, navigate to [localhost:3000](http://localhost:3000) in your browser.

## Directory Structure
```
└── flapper-news
    ├── bin
    ├── config
    ├── models
    │   ├── Comments.js         # Comments DB schema
    │   ├── Posts.js            # Posts DB schema
    │   └── Users.js            # User DB schema
    ├── public
    │   ├── images
    │   ├── javascripts
    │   │   └── angularApp.js   # Angular logic
    │   └── stylesheets
    ├── routes
    │   └── index.js            # Express logic
    ├── views
    │   └── index.ejs           # HTML templates
    └── app.js                  # Node app code
```
