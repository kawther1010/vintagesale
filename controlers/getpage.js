const express = require('express');
//const Buyer = require('../models/model.buyer');
//const Sale = require('../models/model.sale');

const gethome = (req, res) => {
    try{
        res.status(200).render('home');
    } catch(err){
        res.status(404).send('Error 404: Page not found.');
    }
}

const getlogin = (req, res) => {
    try{
        res.status(200).render('login');
    } catch(err){
        res.status(404).send('Error 404: Page not found.');
    }
}

const getregister = (req, res) => {
    try{
        res.status(200).render('register');
    } catch(err){
        res.status(404).send('Error 404: Page not found.');
    }
}

const gethomepage = (req, res) => {
    try{
        res.status(200).render('homepage');
    } catch(err){
        res.status(404).send('Error 404: Page not found.');
    }
}

module.exports ={
    gethome,
    getlogin,
    getregister,
    gethomepage,
}