const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
  
const Buyer = require('../models/model.buyer');
const {registerValidation, loginValidation} = require('../validation');


const postlogin = async (req, res) => {
    const {error} = loginValidation(req.body);
    //if(error) return res.status(400).send(error.details[0].message);
    if(error) return res.status(404).send('Error: 404 Page not found');
    const buyer = await Buyer.findOne({email: req.body.email});
    if(!buyer) return res.status(400).send('email or password not correct');
    const validPassword = await bcrypt.compare(req.body.password, buyer.password);
    if(!validPassword) return res.status(400).send('email or password not correct');

    const token = jwt.sign({ email: req.body.email }, process.env.TOKEN_SECRET);
    console.log("token: "+ token);
    
    try{
        return res.cookie("token", token, {
            httpOnly: true,
            secure: true,
        }).status(200).redirect('homepage');
    } catch(err) {
        res.status(404).send('Error 404: Page not found.');
    }

}


const postregister = async(req,res) => {
    const {error} = registerValidation(req.body);
    if( new Date(req.body.birthDate).getFullYear() >= new Date().getFullYear() ) return res.status(400).send('The birthday date is wrong');
    if(req.body.mobile.length < 10) return res.status(400).send('This mobile number is too short')
    const mobileExist = await Buyer.findOne({mobile: req.body.mobile});
    if(mobileExist) return res.status(400).send('This mobile number is already exist');
    const emailExist = await Buyer.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('This email is already exist');
    if(req.body.password != req.body.confirmPassword) return res.status(404).send('The password and the confirm password are not the same.');
    if(req.body.password === "abcdefgh" || req.body.password === "1234567" || req.body.password === "abcd1234") return res.status(400).send('Your password is very weak');
    
    //if(error) return res.status(400).send(error.details[0].message);
    if(error) return res.status(404).send('Error: 404 Page not found');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let buyer = new Buyer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        email: req.body.email,
        mobile: req.body.mobile,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        chart: req.body.chart,
    });
    
    const token = jwt.sign({ firstName: req.body.firstName, lastName: req.body.lastName, birthDate: req.body.birthDate, email: req.body.email, mobile: req.body.mobile }, process.env.TOKEN_SECRET);
    //console.log("token: "+ token);

    try{
        const savedBuyer = await buyer.save();
        return res.cookie("token", token, {
            httpOnly: true,
            secure: true,
        }).status(200).redirect('homepage');
        
    } catch(err) {
        res.status(404).send(err);
    }
}

module.exports = {
    postlogin,
    postregister,
}
