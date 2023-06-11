
import userModel from "../models/user.js";

export default class UserManagerMongo {

    
    createUser = (user) =>{
       return userModel.create(user);
    }
    getUser = (user) => {
        return userModel.findOne(user);
     }  
}

