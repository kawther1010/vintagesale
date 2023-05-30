const Object = require('../models/Object');
const User = require('../models/User');
const Faq= require('../models/faq');
const Term= require('../models/term');
const Privacy= require('../models/privacy');

// GET Home Page
exports.getHomePage = (req, res) => {
    const isLoggedIn = req.isAuthenticated();
    res.render('home', {
        isLoggedIn,
        req: req,
    });
}

// GET Category Page
exports.getCategoryPage = async (req, res) => {
    const isLoggedIn = req.isAuthenticated();
    try {
        const objects = await Object.find({ category: req.params.categoryName });
        res.render('category', { objects, isLoggedIn, req: req });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}


// GET Profile Page
exports.getProfilePage = async(req, res) => {
    try {
        //console.log(req.user._id);
        const objects= await Object.find({seller: req.user._id });
        return res.status(200).render('profile', {
            isLoggedIn: true,
            user: req.user,
            req: req,
            objects
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server Error');
    }
}

// GET Account Settings Page
exports.getAccountSettingsPage = (req, res) => {
    res.render('account-settings', {
        isLoggedIn: true,
        user: req.user,
        req: req
    });
}

// GET Sell Page
exports.getSellPage = (req, res) => {
    res.render('sell', {
        isLoggedIn: true,
        req: req
    });
}

// GET FAQs Page
exports.getFAQsPage = async(req, res) => {
    const isLoggedIn = req.isAuthenticated();
    const faqs= await Faq.find({ });
    res.render('faqs', { isLoggedIn, faqs, req: req });
}

// GET Terms of Use Page
exports.getTermsOfUsePage = async (req, res) => {
    const isLoggedIn = req.isAuthenticated();
    const terms= await Term.find({ });

    try{
        return res.status(200).render('terms-of-use', {isLoggedIn, terms, req: req});
    } catch(err) {
        return res.status(404).send("Page 404: Page not found");
    }
}

// GET Privacy Policy Page
exports.getPrivacyPolicyPage = async(req, res) => {
    try{
        const isLoggedIn = req.isAuthenticated();
        const privacy= await Privacy.findOne({ });
        return res.status(200).render('privacy-policy', {isLoggedIn, privacy, req: req});
    } catch(err) {
        return res.status(404).send("Page 404: Page not found");
    }
}

// GET Login Page
exports.getLoginPage = (req, res) => {
    res.render('login');
};

// GET Register Page
exports.getRegisterPage = (req, res) => {
    res.render('register');
};

// GET Buy Page
exports.getBuyPage = async (req, res) => {
    const isLoggedIn = req.isAuthenticated();
    try {
        const object = await Object.findById(req.params.id);
        if (!object) {
            return res.status(404).send('Object not found');
        }
        // Render the buy.ejs page and pass in the object data
        res.render('buy', { object, isLoggedIn, currentUser: req.user, req: req });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

// GET Dashboard Page
exports.getDashboardPage= (req, res) => {
    try{
        return res.render('dashboard');
    } catch(err) {
        console.log(err);
        return res.status(404).send("Page 404: Page not found");
    }
}

// GET Objects Page
exports.getObjectsAdminPage= async(req, res) => {
    try{
        const objects = await Object.find({ });
        return res.render('objects', {objects});
    } catch(err) {
        console.log(err);
        return res.status(404).send("Page 404: Page not found.");
    }
}

// GET Users Page
exports.getUsersAdminPage= async(req, res) => {
    try{
        const users = await User.find({ });
        return res.render('users', {users});
    } catch(err) {
        console.log(err);
        return res.status(404).send("Page 404: Page not found.");
    }
}

// GET BuyAdmin Page
exports.getBuyAdminPage = async (req, res) => {
    //const isLoggedIn = req.isAuthenticated();
    try {
        const object = await Object.findById(req.params.id);
        if (!object) {
            return res.status(404).send('Object not found');
        }
        // Render the buyAdmin.ejs page and pass in the object data
        return res.render('buyAdmin', { object}); // , isLoggedIn, currentUser: req.user 
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
}

// GET ProfileAdmin Page
exports.getProfileAdminPage = async (req, res) => {
    //const isLoggedIn = req.isAuthenticated();
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        // Render the buyAdmin.ejs page and pass in the object data
        return res.render('profileAdmin', { user}); // , isLoggedIn, currentUser: req.user 
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
}

// GET FAQsAdmin Page
exports.getFAQsAdminPage = async(req, res) => {
    try{
    //const isLoggedIn = req.isAuthenticated();
    const faqs= await Faq.find({ });
    res.render('faqsAdmin', {faqs}); //, { isLoggedIn }
    } catch(err) {
        console.log(err);
        return res.status(404).send("Page 404: Page not found.")
    }
}

// GET Faq Admin Delete
exports.getFaqAdminDelete = async (req, res) => {
    try {
        const faq = await Faq.findOne({_id: req.params.id});
        return res.status(200).render('faqsAdminDelete', {faq});
    } catch (err) {
        console.error(err);
        return res.status(404).send('Page 404: page not found');
    }
}

// GET Faq Admin Update
exports.getFaqAdminEdit = async (req, res) => {
    try {
        const faq = await Faq.findOne({_id: req.params.id});
        return res.status(200).render('faqsAdminEdit', {faq});
    } catch (err) {
        console.error(err);
        return res.status(404).send('Page 404: page not found');
    }
}

// GET Terms of Use Page for Admin
exports.getTermsOfUseAdminPage = async(req, res) => {
    try{
        const terms= await Term.find({ });
        return res.status(200).render('terms-of-use-admin', {terms}); // isLoggedIn
    } catch(err) {
        return res.status(404).send("Page 404: Page not found");
    }
}

// GET Terms of Use Delete Page for Admin
exports.getTermsOfUseAdminDeletePage = async(req, res) => {
    const term= await Term.findOne({_id: req.params.id});
    try{
        return res.status(200).render('terms-of-use-admin-delete', {term}); // isLoggedIn
    } catch(err) {
        return res.status(404).send("Page 404: Page not found");
    }
}

// GET Privacy Policy Page for Admin
exports.getPolicyPrivacyAdminPage = async (req, res) => {
    try{
        const privacy= await Privacy.findOne({ });
        return res.status(200).render('privacy-policy-admin', {privacy});
    } catch(err) {
        return res.status(404).send("Page 404: Page not found");
    }
}

// GET Terms of Use Delete Page for Admin
exports.getTermsOfUseAdminEditPage = async(req, res) => {
    const term= await Term.findOne({_id: req.params.id});
    try{
        return res.status(200).render('terms-of-use-admin-edit', {term}); // isLoggedIn
    } catch(err) {
        return res.status(404).send("Page 404: Page not found");
    }
}

// GET Search Page
exports.getSearchPage = async(req, res) => {
    try{
        const objects= await Object.find({ });
        const isLoggedIn = await req.isAuthenticated();
        return res.status(200).render("search", {objects ,isLoggedIn});
    } catch(err) {
        console.log(err);
        return res.status(404).send("Page 404: not found");
    }
}

// GET Search Page
exports.getHistoryPage = async(req, res) => {
    try{
        const objects= await Object.find({seller: req.user._id });
        const objectsForBids= await Object.find({bids: { $elemMatch: { bidder: req.user._id } } });

        return res.status(200).render("history", {
            isLoggedIn: true,
            user: req.user,
            req: req,
            objects,
            objectsForBids
        });
    } catch(err) {
        console.log(err);
        return res.status(404).send("Page 404: not found");
    }
}
