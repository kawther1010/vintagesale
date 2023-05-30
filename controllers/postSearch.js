const Object= require('../models/Object');


exports.postSearchPage = async(req, res) => {
    try{
        const isLoggedIn = await req.isAuthenticated();
        
        const minimumStartingPrice= req.body.minimumStartingPrice;
        const maximumStartingPrice= req.body.maximumStartingPrice;

        const objects= await Object.find({title: req.body.title, startingPrice: {$gt:req.body.minimumStartingPrice}, startingPrice: {$lt:req.body.maximumStartingPrice}});
        return res.status(200).render('search',{isLoggedIn, objects});

    } catch(err) {
        console.log(err);
        return res.status(404).send('Page not found');
    }
}
