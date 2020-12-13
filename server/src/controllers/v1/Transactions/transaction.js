const {User, Transaction, Product, TransactionProduct, TransactionToping, Toping} = require("../../../../models");

const Joi = require("joi");

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

// get all transactions
exports.getTrasactions = async (req, res) => {
    try {
        const transactions = await Transaction.findAll({
            attributes: {
                exclude: ["userId","createdAt", "updatedAt","UserId"],
            },
            include : [
                {
                    attributes: {
                        exclude: ["password","status","createdAt", "updatedAt"],
                    },
                    model : User,
                    as : "user"
                },
                {
                    attributes: {
                        exclude: ["id","TransactionId","transactionId","ProductId","productId","createdAt", "updatedAt"],
                    },
                    model : TransactionProduct,
                    as : "products",
                    include : [
                        {
                            attributes: {
                                exclude: ["createdAt", "updatedAt"],
                            },
                            model : Product,
                            as :"product"
                        },{
                            attributes: {
                                exclude: ["id","transactionProductId","TransactionProductId","TopingId","createdAt", "updatedAt"],
                            },
                            model : TransactionToping,
                            as :"topings",
                            include : [
                                {
                                    attributes: {
                                        exclude: ["transactionProductId","topingId","TransactionProductId","TopingId","createdAt", "updatedAt"],
                                    },
                                    model : Toping
                                }
                            ]
                        }
                    ]
                }
                
            ]
        });

        res.send({
            status: "Sukses",
            message: "Transactions successfully get",
            data: {
                transaction : transactions,
            },
        });
    } catch (err) {
        resError(err,res)
    }
}

// get detail transactions
exports.getDetailTransaction = async (req,res) => {
    try {
        
        const {id} = req.params;
        const detailTransaction = await Transaction.findOne({
            where : {
                id
            },
            attributes: {
                exclude: ["userId","createdAt", "updatedAt","UserId"],
            },
            include : [
                {
                    attributes: {
                        exclude: ["password","status","createdAt", "updatedAt"],
                    },
                    model : User,
                    as : "user"
                },
                {
                    attributes: {
                        exclude: ["id","TransactionId","transactionId","ProductId","productId","createdAt", "updatedAt"],
                    },
                    model : TransactionProduct,
                    as : "products",
                    include : [
                        {
                            attributes: {
                                exclude: ["createdAt", "updatedAt"],
                            },
                            model : Product,
                            as :"product"
                        },{
                            attributes: {
                                exclude: ["id","transactionProductId","TransactionProductId","TopingId","createdAt", "updatedAt"],
                            },
                            model : TransactionToping,
                            as :"topings",
                            include : [
                                {
                                    attributes: {
                                        exclude: ["transactionProductId","topingId","TransactionProductId","TopingId","createdAt", "updatedAt"],
                                    },
                                    model : Toping
                                }
                            ]
                        }
                    ]
                }
                
            ]

        })

        if (!detailTransaction) {
            return res.status(400).send({
                status : "Transaction Empty",
                data : {Transaction : []}
            })
        }

        res.send({
            status: "Sukses",
            message: "Transaction successfully get",
            data: {
                transaction : detailTransaction
            },
        });


    } catch (err) {
        resError(err, res);
    }
}

// create transaction
exports.createTransaction = async (req,res) => {
    try {
        // tambah file
        //body merupakan data yang kita peroleh dari client
        //body ada pada request
        //files = array of object / hanya didapat jika melewati upload middleware

        const {body} = req;
        // const {body,files} = req;
        // const fileName = files.photo[0].filename

        const schema = Joi.object({
            name : Joi.string().min(1).required(),
            email : Joi.string().email().required(),
            phone : Joi.string().min(11).max(14).required(),
            address : Joi.string().required(),
            posCode : Joi.string().min(1).max(6).required(),
            attachment : Joi.string().required(),
            status : Joi.string().required(),
            income : Joi.number().integer().required(),
            products : Joi.array()
        });

        // console.log(req.user);
        
        const { name, email, phone, address, posCode, attachment, status, income, products, topings } = body;
        const { id: userId } = req.user;
        const transaction = await Transaction.create({
            userId,
            name,
            email,
            phone,
            address,
            posCode,
            attachment,
            status: "Waiting Approve",
            income
        });

        products.map(async (product) => {
            // console.log("hasil produk : " +product.amount);// id transaksi terbaru : "+ transaction.id
            const { id, amount } = product;
            const addTransactionProduct = await TransactionProduct.create({
                transactionId : transaction.id,
                productId : id,
                amount : amount
            })
            
            
            // console.log(product.topings);
            let dataTopings = product.topings;
            dataTopings.map(async (toping) => {
                await TransactionToping.create({
                    transactionProductId : addTransactionProduct.id,
                    topingId : toping.id
                })
            })
        })

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

        // menampilkan data product yang dibeli
        const transactionAfterAdd = await Transaction.findOne({
            where : {
                id : transaction.id
            },
            attributes: {
                exclude: ["userId","createdAt", "updatedAt","UserId"],
            },
            include : [
                {
                    attributes: {
                        exclude: ["password","status","createdAt", "updatedAt"],
                    },
                    model : User,
                    as : "user"
                },
                {
                    attributes: {
                        exclude: ["TransactionId","transactionId","ProductId","productId","createdAt", "updatedAt"],
                    },
                    model : TransactionProduct,
                    as : "products"
                }
                
            ]

        })

        res.send({
            status : "Success",
            message : "Transaction Success Created",
            data : {
                transaction : transactionAfterAdd
            }
        });

    } catch (err) {
        resError(err,res)
    }
}

// update transaction
exports.updateTransaction = async (req, res) => {
    try {
        // tangkap id dari req params
        const {id} = req.params;
        
        // tangkap seluruh inputan user
        const {body} = req;

        const schema = Joi.object({
            status : Joi.string().required()
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

        const getTransactionById = await Transaction.findOne({
            where : {
                id
            }
        });

        if (!getTransactionById) {
            return res.status(400).send({
                status : "Resource Not Found",
                message : `Transaction id ${id} not found`, 
                data : {transactions : null}
            })
        };

        // hanya bisa update status transaction
        const transaction = await Transaction.update({
            status : body.status
        }, {
            where : {
                id
            }
        })


        const getTransactionAfterUpdate = await Transaction.findOne({
            where : {
                id
            }
        });

        res.send({
            status : "Success",
            message : "Transaction Success Update",
            data : {
                transactions : getTransactionAfterUpdate
            }
        });
    } catch (err) {
        resError(err,res)
    }
}

// Delete Transaction
exports.deleteTransaction = async (req, res) => {
    try {
        
        const {id} = req.params;

        // delete data
        const dataTransaction = await Transaction.destroy({
            where : {
                id
            }
        });

        if (!dataTransaction) {
            return res.status(400).send({
                status : "Transaction Empty",
                data : {Transaction : []}
            })
        }

        res.send({
            status : "Success",
            message : `Transaction id ${id} deleted`,
            data : {
                id
            }
        });

    } catch (err) {
        resError(err, res);
    }
}

// my transactions
exports.myTransaction = async (req,res) => {
    try {
        
        const {id} = req.user;
        console.log(id)
        const myTransaction = await Transaction.findAll({
            where : {
                userId : id
            },
            attributes: {
                exclude: ["userId","createdAt", "updatedAt","UserId"],
            },
            include : [
                {
                    attributes: {
                        exclude: ["password","status","createdAt", "updatedAt"],
                    },
                    model : User,
                    as : "user"
                },
                {
                    attributes: {
                        exclude: ["id","TransactionId","transactionId","ProductId","productId","createdAt", "updatedAt"],
                    },
                    model : TransactionProduct,
                    as : "products",
                    include : [
                        {
                            attributes: {
                                exclude: ["createdAt", "updatedAt"],
                            },
                            model : Product,
                            as :"product"
                        },{
                            attributes: {
                                exclude: ["id","transactionProductId","TransactionProductId","TopingId","createdAt", "updatedAt"],
                            },
                            model : TransactionToping,
                            as :"topings",
                            include : [
                                {
                                    attributes: {
                                        exclude: ["transactionProductId","topingId","TransactionProductId","TopingId","createdAt", "updatedAt"],
                                    },
                                    model : Toping
                                }
                            ]
                        }
                    ]
                }
                
            ]

        })

        if (!myTransaction) {
            return res.status(400).send({
                status : "Transaction Empty",
                data : {Transaction : []}
            })
        }

        res.send({
            status: "Sukses",
            message: "Transaction successfully get",
            data: {
                transaction : myTransaction
            },
        });


    } catch (err) {
        resError(err, res);
    }
}