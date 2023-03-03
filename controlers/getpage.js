const express = require('express');
const Buyer = require('../models/model.buyer');
const Product= require('../models/model.product')
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
    Product.find({ }, (err, docs) => {
        try{
            return res.status(200).render('homepage', {
                productList: docs,
                name: Product.name,
                bides: Product.bides,
            });
        } catch(err) {
            return res.status(404).send('Error 404: Page not found');
        }
    });
}

const getproductdetails= (req, res) => {
    //console.log(req);
    //return res.status(404).send('Error 404: Page not found');
    /*
    Product.findById({_id: ObjectId(req.params.id)}, (err, docs) => {
        try{
            return res.status(200).render('details', {
                email: docs.email,
                name: docs.name,
                quantity: docs.quantity,
                description: docs.description,
                sales: docs.sales,
                stars: docs.stars,
            })

        } catch(err){
            return res.status(404).send('Error 404: Page not found');
        }
    });
    */
}

//working on displaying profile picture on client profile's
const getprofile = (req, res) => {
    Buyer.findOne({email: req.cookies.email}, (err, docs) => {
        try{
            return res.status(200).render('profile', {
                //profile picture
                firstName: docs.firstName,
                lastName: docs.lastName
            });
        } catch(err) {
            res.status(404).send('Error 404: Page not found');
        }
    });
}

const geteditProfile = (req, res) => {
    Buyer.findOne({email: req.cookies.email}, (err, docs) => {
        try{
            return res.status(200).render('editProfile', {
                //profile picture
                firstName: docs.firstName,
                lastName: docs.lastName,
                birthDate: docs.birthDate,
                email: docs.email,
                mobile: docs.mobile,
                password: docs.password
            });
        } catch(err) {
            res.status(404).send('Error 404: Page not found');
        }
    });
}

const getsellPage = (req, res) => {
    try{
        res.status(200).render('sellPage');
    } catch(err){
        res.status(404).send('Error 404: Page not found.');
    }
}



const getsalesList = (req, res) => {
    try{
        res.status(200).render('salesList');
    } catch(err){
        res.status(404).send('Error 404: Page not found.');
    }
}
/*
const getsalesList = (req, res) => {
    Sale.find({email: req.cookies.email}, (err, docs) => {
        try{
            return res.status(200).render('salesList', {
                salesList: docs,
                /*
                product: sale.product,
                quantity: sale.quantity,
                delivered: sale.delivered,
                */
               /*
            });
        } catch(err) {
            return res.status(404).send('Error 404: Page not found');
        }
    });
}

FROM THE EJS PAGE
<!--
                <% salesList.forEach(sale => {%>
                    <div class="col-md-5 border m-5 p-2 text-center">
                        <form action="/homepage/salesList" method="post">
                            <p>Product: <%= sale.product %> </p> 
                            <p>Quantity: <%= sale.quantity %> </p> 
                            <p>Delivered: <%= sale.delivered %> </p>
                        </form>
                    </div>
                <% }) %>
                -->

*/

const getbill = (req, res) => {
    try{
        res.status(200).render('bill');
    } catch(err){
        res.status(404).send('Error 404: Page not found.');
    }
}



const getlogout = (req, res) => {
    try{
        return res.cookie("token", null, {maxAge: 1}).status(200).redirect('/');
    } catch (err){
        return res.status(403).send('Error 403: Forrebiden');
    }
}


module.exports ={
    gethome,
    getlogin,
    getregister,

    gethomepage,
    getproductdetails,

    getprofile,
    geteditProfile,
    getsellPage,

    getsalesList,
    getbill,
    
    getlogout,
}