// data product form models
const {Product} = require("../../../../models") 

const Joi = require("joi");

// delete file
const fs = require('fs');

// output error
const resError = (err,res) => {
    console.log(err);
    return res.status(500).send({
        status : "Request Failed",
        error : {
            message : "Server Error"
        }
    })
}


// get all products
exports.getProducts = async (req, res) => {
    try {

        const products = await Product.findAll({
            attributes : {
                exclude : ['createdAt','updatedAt']
            }
        })

        if (!products) {
            return res.status(400).send({
                status : "Products Empty",
                data : {products : []}
            })
        }

        res.send({
            status : "Success",
            data : {products}
        })


    } catch (err) {
        resError(err, res);
    }
}

// detail product
exports.getDetailProduct = async (req, res) => {
    try {
        const {id} = req.params;

        const product = await Product.findOne({
            where : {
                id
            },
            attributes : {
                exclude : ['createdAt','updatedAt']
            }
        })

        if (!product) {
            return res.status(400).send({
                status : "Product Empty",
                data : {Product : []}
            })
        }

        res.send({
            status : "Success",
            data : {product}
        })

    } catch (err) {
        resError(err, res);
    }
}

// create product
exports.createProduct = async (req, res) => {
    try {
        // tambah file
        //body merupakan data yang kita peroleh dari client
        //body ada pada request
        //files = array of object / hanya didapat jika melewati upload middleware

        const {body,files} = req;
        const fileName = files.photo[0].filename

        const schema = Joi.object({
            name : Joi.string().min(5).required(),
            price : Joi.number().integer().required(),
        });

        const { error } =schema.validate(body, {
            // option untuk menmapilkan pesan error lebih dari 1
            abortEarly : false
        });

        if (error) {
            return res.status(400).send({
                status : "validation error",
                error : {
                    message : error.details.map((error) => error.message)
                }
            })
        }

        const product = await Product.create({...body, photo: fileName });

        res.send({
            status : "Success",
            message : "Product Success Created",
            data : {
                product
            }
        });


    } catch (err) {
        resError(err, res);
    }
}

// update product
exports.updateProduct = async (req, res) => {
    try {
        // tangkap id dari req params
        const {id} = req.params;
        
        // tangkap seluruh inputan user
        const {body} = req;

        const getProductById = await Product.findOne({
            where : {
                id
            }
        });

        if (!getProductById) {
            return res.status(400).send({
                status : "Resource Not Found",
                message : `Product id ${id} not found`, 
                data : {product : null}
            })
        };

        const product = await Product.update(body, {
            where : {
                id
            }
        })


        const getProductAfterUpdate = await Product.findOne({
            where : {
                id
            }
        });

        res.send({
            status : "Success",
            message : "Product Success Update",
            data : {
                product : getProductAfterUpdate
            }
        });


    } catch (err) {
        resError(err, res);
    }
}

// delete product
exports.deleteProduct = async (req,res) => {
    try {
        const {id} = req.params;

        const getProductById = await Product.findOne({
            where : {
                id
            }
        });

        if (!getProductById) {
            return res.status(400).send({
                status : "Resource Not Found",
                message : `Product id ${id} not found`, 
                data : {product : null}
            })
        };


        // delete a file
        fs.unlink(`uploads/${getProductById.photo}`, (err) => {
            if (err) {
                throw err;
            }
        });

        // delete data
        await Product.destroy({
            where : {
                id
            }
        });

        res.send({
            status : "Success",
            message : `Product id ${id} deleted`,
            data : {
                id
            }
        });


    } catch (err) {
        resError(err, res);
    }
}