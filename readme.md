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