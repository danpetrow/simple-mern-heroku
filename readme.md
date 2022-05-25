# Mysql Node Express Project
Currently deployable to heroku with a mysql backend hosted with clouddb
you can run this app anywhere with 
> $ docker-compose up

There are three components currently

- email form for collecting user data
- api|register/login/get-user routes  
- login/registration form

TODO
- on login save the jwt to cookies, redirect to POST get-user route with jwt in body => redirect to a logged in user homepage 

https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/
https://dev.to/franciscomendes10866/using-cookies-with-jwt-in-node-js-8fn
https://www.freecodecamp.org/news/learn-react-basics-in-10-minutes/