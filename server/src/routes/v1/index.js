const express = require('express');

const router = express.Router();


const {uploadFile} = require('../../middleware/upload');

// auth
const {auth : authentication, adminAuth} = require('../../middleware/auth');


const {
    register,
    login,
    checkAuth
} = require('../../controllers/v1/Auth/auth');

// controller 
// controller users
const {
    getUsers,
    deleteUser
} = require('../../controllers/v1/Users/user');

// controller product
const {
    getProducts,
    getDetailProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../../controllers/v1/Products/product");
const { required } = require('joi');

// controller Toping
const  {
    getTopings,
    getDetailToping,
    createToping,
    updateToping,
    deleteToping
} = require('../../controllers/v1/Topings/toping');

// controller tracsaction
const {
    createTransaction,
    getTrasactions,
    getDetailTransaction,
    deleteTransaction,
    updateTransaction,
    myTransaction
}= require('../../controllers/v1/Transactions/transaction');

// route 

// Auth account
router.post('/register', register);
router.post('/login', login);
router.get("/check-auth", authentication, checkAuth);

// route users
router.get('/users',authentication,getUsers);
router.delete('/user/:id',authentication,adminAuth,deleteUser);

// route products
router.get('/products/' , getProducts);
router.get('/product/:id' , getDetailProduct);
router.post('/product',authentication,adminAuth, uploadFile("photo"), createProduct);
router.patch('/product/:id',authentication,adminAuth , updateProduct);
router.delete('/product/:id',authentication,adminAuth , deleteProduct);

// route toping
router.get('/topings',getTopings);
router.get('/toping/:id',getDetailToping);
router.post('/toping',authentication,adminAuth, uploadFile("photo"),createToping);
router.patch('/toping/:id',authentication , adminAuth, updateToping);
router.delete('/toping/:id',authentication , adminAuth, deleteToping);

// route transaction
router.get('/transactions',authentication,getTrasactions);
router.get('/transaction/:id',authentication,getDetailTransaction);
router.post('/transaction',authentication,uploadFile("photo"),createTransaction);
router.delete('/transaction/:id',authentication,adminAuth,deleteTransaction);
router.get('/my-transaction',authentication,myTransaction);
router.patch('/transaction',authentication,updateTransaction);

module.exports= router;