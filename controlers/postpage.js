const express = require('express');
const { updateOne } = require('../models/model.buyer');
const Buyer = require('../models/model.buyer');
const Product = require('../models/model.product');


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {registerValidation, loginValidation} = require('../validation');


const postproduct = (req, res) => {
    Buyer.findOne({email: req.cookies.email}, async(err, docs) => {
        try{
            let newProduct = await new Product({
                email: req.cookies.email,
                name: req.body.name,
                quantity: req.body.quantity,
                description: req.body.description,
            });
            const savedproduct = await newProduct.save();
            return res.status(200).send("saved successfully.");
        } catch(err){
            console.log(err);
            res.status(404).send("Error 404: Page not found");
        }
    });
}

const posteditProfile = (req, res) => {
    Buyer.findOne({email: req.cookies.email}, async(err, docs) => {
        try{

            const {error} = registerValidation(req.body);
            if( new Date(req.body.birthDate).getFullYear() >= new Date().getFullYear() ) return res.status(400).send('The birthday date is wrong');
            if(req.body.mobile.length < 10) return res.status(400).send('This mobile number is too short')
    
            //if(error) return res.status(400).send(error.details[0].message);
            //if(error) return res.status(404).send('Error: 404 Page not found');

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);


            const firstName = { firstName: docs.firstName };
            const lastName = { lastName: docs.lastName };
            const birthDate = { birthDate: docs.birthDate };
            const email = { email: docs.email };
            const mobile = { mobile: docs.mobile };
            const password = { password: docs.password };
            
            let changefirstName= await Buyer.updateOne(firstName, {firstName: req.body.firstName});
            let changelastName= await Buyer.updateOne(lastName, {lastName: req.body.lastName});
            let changebirthDate= await Buyer.updateOne(birthDate, {birthDate: req.body.birthDate});
            let changeemail= await Buyer.updateOne(email, {email: req.body.email});
            let changemobile= await Buyer.updateOne(mobile, {mobile: req.body.mobile});
            let changepassword= await Buyer.updateOne(password, {password: hashedPassword});

            return res.status(200).redirect('/homepage/profile');
        } catch(err){
            console.log(err);
            return res.status(404).send("Page 404: page not found.");
        }
    });
}



module.exports ={
    postproduct,
    posteditProfile
}