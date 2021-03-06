const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

const {
    catchErrors
} = require('../handlers/errorHandlers');

// Do work here

router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/stores/page/:page', catchErrors(storeController.getStores));
router.get('/add',
    authController.isloggedIn,
    storeController.addStore
);
router.post('/add/:id',
    storeController.upload,
    catchErrors(storeController.resize),
    catchErrors(storeController.updateStore));

router.post('/add',
    storeController.upload,
    catchErrors(storeController.resize),
    catchErrors(storeController.createStore));

router.get('/stores/:id/edit', catchErrors(storeController.editStore));


router.get('/store/:slug', catchErrors(storeController.getStorebySlug));
router.get('/tags', catchErrors(storeController.getStorebyTag));
router.get('/tags/:tag', catchErrors(storeController.getStorebyTag));

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);


// 1) Need to validate the register form
// 2) register the user
// 3) we need to log them

router.post('/register',
    userController.validateRegister,
    userController.register,
    authController.login
);

router.get('/logout', authController.logout);

router.get('/account',
    authController.isloggedIn,
    userController.account
);

router.post('/account', catchErrors(userController.updateAccount));
router.post('/account/forgot', catchErrors(authController.forgot));

router.get('/account/reset/:token', catchErrors(authController.reset));

router.post('/account/reset/:token',
    authController.confirmedPasswords,
    catchErrors(authController.update)
);


/*
 *
 * API
 *
 * */

router.get('/api/search', catchErrors(storeController.searchStores));
router.get('/api/stores/near', catchErrors(storeController.mapStores));

router.get('/map', storeController.mapPage);

router.post('/api/stores/:id/heart', catchErrors(storeController.heartStore));
router.post('/reviews/:id',
    authController.isloggedIn,
    catchErrors(reviewController.addReview));

router.get('/hearts', authController.isloggedIn, catchErrors(storeController.getHearts));
router.get('/top', catchErrors(storeController.getTopStores));


module.exports = router;