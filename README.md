# movie-rating-app
This is a frontend and backend decoupled full-stack **practice** web app with MongoDB + Express + Vue + Vuetify. 

## Features
**Server-Side**
- [Express](https://github.com/expressjs/express)
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://github.com/Automattic/mongoose)
- [Passport](http://passportjs.org/)
  + [passport-local](http://www.passportjs.org/packages/passport-local/) strategy for authenticating
- [bcryptjs](github.com/dcodeIO/bcrypt.js) hash and check a password
- [cors](https://github.com/expressjs/cors) handle cross-origin requests between frontend and backend

**Client-Side**
- [Vue 2.x](https://github.com/vuejs/vue)
- [Vuetify 2.x](https://github.com/vuetifyjs/vuetify)
- [axios](github.com/axios/axios)
- Login Form
- Pagination

## Getting Started
- Install [Nodejs](https://www.nodejs.org) and [MongoDB](https://docs.mongodb.com/guides/server/install)
- Open your terminal, run `mongod` 
- Navigate to the project
- Import MongoDB data 
  + `mongoimport --db=movie_rating --collection=movies --file=movies.json`
- Start backend
  + `cd backend`
  + `npm install`
  + `npm run start`
- Start frontend
  + `cd ../frontend`
  + `npm install`
  + `npm run serve`
- Open your browser, and type `http://localhost:8080`

## Reference
[Full-Stack Web Development with Vue.js and Node](https://www.packtpub.com/web-development/full-stack-web-development-vuejs-and-node)
## License
MIT (see [LICENSE](https://github.com/mazhiyu/movie-rating-app/blob/master/LICENSE) file)
