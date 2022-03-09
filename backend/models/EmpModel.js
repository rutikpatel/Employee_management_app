const mongoose = require('mongoose');
require('mongoose-type-email');

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const empSchema = new mongoose.Schema({
    addOrEditBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    EmployeeName: {
        type: String,
        required: [true, 'Please enter Employee name'],
        trim: true,
        lowercase: true
    },
    Designation: {
        type: String,
        required: [true, 'Please enter Designation'],
        trim: true,
        lowercase: true
    },
    salary: {
        type: Number,
        required: [true, 'Please enter salary'],
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
});

const emp = mongoose.model("employee", empSchema);
module.exports = emp;