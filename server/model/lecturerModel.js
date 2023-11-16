const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const lecturerSchema = mongoose.Schema({

    nic: {
        type: String,
        required: [true, 'Please Enter NIC'],
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'Please Enter the User Name'],
        unique: true,
    },
    firstName: {
        type: String,
        required: [true, 'Please Enter the First Name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please Enter the Last Name'],
    },
    email: {
        type: String,
        required: [true, 'Please Enter email address'],
    },
    phone: {
        type: String,
        required: [true, 'Please enterthe  phone'],
    },
    branch: {
        type: String,
        required: [true, 'Please select a branch'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a value'],
    },
},
    {
        timestamps: true,
    });

    lecturerSchema.statics.login = async function (username, password) {
        if(!username || !password){
            throw Error("All fields must be filled");
        }
    
        const lecturer = await this.findOne({ username });
    
        if (!lecturer) {
            throw Error("Incrorrect username or password");
          }
        
          const match = await bcrypt.compare(password, lecturer.password);
        
          if (!match) {
            throw Error("Incorrect username or password");
          }
        
          return lecturer;
        
    }


module.exports = mongoose.model('Lecturer', lecturerSchema);