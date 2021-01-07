// data Toping form models
const {Toping} = require("../../../../models") 

const Joi = require("joi");

const cloudinary = require("../../../middleware/cloudinary");

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
exports.getTopings = async (req, res) => {
    try {

        const topings = await Toping.findAll({
            attributes : {
                exclude : ['createdAt','updatedAt']
            }
        })

        if (!topings) {
            return res.status(400).send({
                status : "Topings Empty",
                data : {topings : []}
            })
        }

        res.send({
            status : "Success",
            data : {topings}
        })


    } catch (err) {
        resError(err, res);
    }
}

// detail Toping
exports.getDetailToping = async (req, res) => {
    try {
        const {id} = req.params;

        const toping = await Toping.findOne({
            where : {
                id
            },
            attributes : {
                exclude : ['createdAt','updatedAt']
            }
        })

        if (!toping) {
            return res.status(400).send({
                status : "Toping Empty",
                data : {toping : []}
            })
        }

        res.send({
            status : "Success",
            data : {toping}
        })

    } catch (err) {
        resError(err, res);
    }
}

// create Toping
exports.createToping = async (req, res) => {
    try {
        // tambah file
        //body merupakan data yang kita peroleh dari client
        //body ada pada request
        //files = array of object / hanya didapat jika melewati upload middleware

        const {body,files} = req;
        const fileName = files.photo[0].filename
        const path = files.photo[0].path

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

        // const result = await cloudinary.uploader.upload(files.photo[0].path);//harus path karna menangkap data path saja

        const toping = await Toping.create({...body,photo: path, cloudinary_id: fileName });
        // const toping = await Toping.create({...body, photo: fileName });

        res.send({
            status : "Success",
            message : "Toping Success Created",
            data : {
                toping
            }
        });


    } catch (err) {
        resError(err, res);
    }
}

// update Toping
exports.updateToping = async (req, res) => {
    try {
        // tangkap id dari req params
        const {id} = req.params;
        
        // tangkap seluruh inputan user
        const {body} = req;

        const getTopingById = await Toping.findOne({
            where : {
                id
            }
        });

        if (!getTopingById) {
            return res.status(400).send({
                status : "Resource Not Found",
                message : `Toping id ${id} not found`, 
                data : {toping : null}
            })
        };

        const toping = await Toping.update(body, {
            where : {
                id
            }
        })


        const getTopingAfterUpdate = await Toping.findOne({
            where : {
                id
            }
        });

        res.send({
            status : "Success",
            message : "Toping Success Update",
            data : {
                toping : getTopingAfterUpdate
            }
        });


    } catch (err) {
        resError(err, res);
    }
}

// delete Toping
exports.deleteToping = async (req,res) => {
    try {
        const {id} = req.params;

        const getTopingById = await Toping.findOne({
            where : {
                id
            }
        });

        if (!getTopingById) {
            return res.status(400).send({
                status : "Resource Not Found",
                message : `Toping id ${id} not found`, 
                data : {toping : null}
            })
        };


        // delete a file
        fs.unlink(`uploads/${getTopingById.photo}`, (err) => {
            if (err) {
                throw err;
            }
        });

        // delete data
        await Toping.destroy({
            where : {
                id
            }
        });

        res.send({
            status : "Success",
            message : `Toping id ${id} deleted`,
            data : {
                id
            }
        });


    } catch (err) {
        resError(err, res);
    }
}