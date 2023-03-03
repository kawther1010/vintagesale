const express = require('express');
const routes = express.Router();

const postpage = require('../controlers/postpage');


routes.post('/homepage/profile/sellPage', postpage.postproduct);
routes.post('/homepage/profile/editProfile', postpage.posteditProfile);


module.exports = routes;