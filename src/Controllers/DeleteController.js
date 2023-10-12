const { default: mongoose } = require('mongoose');
const {userModel} = require('../Models/Student')

const DeleteController = async (req,res) => {
    console.log("params ",req.params)
    const result = await userModel.deleteOne({_id: req.params.id})
    // const response = {status: 200, messages: ["Deleted the user !"]}
    res.send(JSON.stringify(result));
}

module.exports = DeleteController;