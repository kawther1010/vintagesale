const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const { uploadImage, uploadProfilePicture } = require('../config/multer')

// Importing controllers
const getController = require('../controllers/getController');
const userInfoUpdateController = require('../controllers/userInfoUpdateController');
const userPasswordUpdateController = require('../controllers/userPasswordUpdateController')
const objectCreationController = require('../controllers/objectCreationController')
const profilePictureUploadController = require('../controllers/profilePictureUploadController')
const userBidSubmitController = require('../controllers/userBidSubmitController')
const emailConfirmationController = require('../controllers/emailConfirmationController')

// GET Sell Page
router.get('/sell', ensureAuthenticated, getController.getSellPage);

// GET Profile Page
router.get('/profile', ensureAuthenticated, getController.getProfilePage);

// GET Account Settings Page
router.get('/account-settings', getController.getAccountSettingsPage)

// GET Email Confirmation Handle
router.get('/confirm/:id', emailConfirmationController.handleEmailConfirmation)

// POST User Info Update Handle
router.post('/info-update', ensureAuthenticated, userInfoUpdateController.handleUpdate);

// POST User Password Update Handle
router.post('/password-update', ensureAuthenticated, userPasswordUpdateController.handleUpdate)

// POST Object Creation Handle
router.post('/sell', ensureAuthenticated, uploadImage, objectCreationController.handleCreation)

// Profile Picture Upload Handle
router.post('/upload-profile-picture', ensureAuthenticated, uploadProfilePicture, profilePictureUploadController.handleUpdate)

// POST User Bid Handle
router.post('/bids/:id', ensureAuthenticated, userBidSubmitController.handleBidSubmit)

// GET Sell Page
router.get('/history', ensureAuthenticated, getController.getHistoryPage);

module.exports = router;