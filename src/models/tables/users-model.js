'use strict';
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || '00962789334963';

const userSchema = (sequelize, DataTypes) => {
  const model = sequelize.define('user', {
    userCode: { type: DataTypes.STRING, allowNull: false,unique: true },
    userName: { type: DataTypes.STRING, allowNull: false ,unique: true},
    userPassword: { type: DataTypes.STRING, allowNull: false },
    userEmail: { type: DataTypes.STRING, allowNull: false, unique: true },
    userRole: { type: DataTypes.ENUM('Admin','Storekeeper','Employee'), defaultValue: 'Employee' },
    userAddress: { type: DataTypes.STRING, allowNull: false },
    userIsActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    userPhone: { type: DataTypes.STRING, allowNull: true },
    userRemark: { type: DataTypes.STRING, allowNull: true },
    token: { type: DataTypes.VIRTUAL },
    actions: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          Employee:         ['employee','read','create','update'],
          Admin:            ['admin','read','create', 'update', 'delete'],
          Storekeeper:      ['storeKeeper','read','create', 'update', 'delete'],
        }
        return acl[this.userRole];
      }
    }
  });

  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.userPassword, 10);
    user.userPassword = hashedPass;
    console.log(user);
  });

  // attach a function to our Users Model
  model.authenticateBasic = async(userName, password)=> {
    // get the user form the database 
    const user = await model.findOne({ where: { userName } }); // select * from Users where username='amr';
    // compare the users password from the DB with the on that was submitted in the form
    const valid = await bcrypt.compare(password, user.userPassword);
    // if the user is validated, we will create a new token for that user using the jsonwebtokenlibaray
    if (valid) {
      let newToken = jwt.sign({ userName: user.userName }, SECRET);
      user.token = newToken;
      return user;
    } else {
      throw new Error('Invalid User');
    }
  }

  model.authenticateBearer = async function (token) {
    // check with the jwt if the token is proper
    const parsedToken = jwt.verify(token, SECRET); 
    // the parsed token payload, we are parsing the data using the Secret Key.
    // then find a user that has the data from the payload
    console.log(parsedToken);
    const user = await this.findOne({ where: { userName: parsedToken.userName } });////###################
    // if there is, then get the user model
    if (user) {
      return user;
    } else {
      // if not, throw error
      throw new Error('Invalid Token');
    }
  }

  return model
}
module.exports = userSchema;