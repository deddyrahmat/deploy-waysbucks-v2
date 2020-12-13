// data user from models
const {User} = require("../../../../models");

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


// get all data users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes : {
                exclude : ["createdAt","updatedAt","password"]
            }
        });
    
        if (!users) {
            return res.status(400).send({
                status : "Data Users Empty",
                data : {users : []}
            })
        }

        console.log(req.user)

        res.send({
            status : "Get Data Users Success",
            data : {users}
        })
    } catch (err) {
        resError(err,res);
    }

}

// delete data user
exports.deleteUser = async (req,res) => {
    try {
        
        const {id} = req.params;

        const getUserById = await User.findOne({
            where : {
                id
            },attributes : {
                exclude : ["createdAt","updatedAt"]
            }
        })
        
        if (!getUserById) {
            return res.status(400).send({
                status : "Data User Empty",
                data : {User : null}
            })
        }

        await User.destroy({
            where : {
                id
            }
        })

        res.send({
            status : "Delete Data User Success",
            data : {
                id
            }
        });
        
    } catch (err) {
        resError(err,res);
    }
}
