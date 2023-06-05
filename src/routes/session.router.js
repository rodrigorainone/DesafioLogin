import {Router} from "express"
import userModel from "../dao/mongo/models/user.js";
import UserManagerMongo from "../dao/mongo/Managers/UserManagerMongo.js";
import { privacy } from "../middlewares/auth.js";


const router = Router();

const user = new UserManagerMongo();

router.post('/register',async(req,res)=>{
     const result = await user.createUser(req.body);
     res.send({status:"success",payload:result});
})
    
router.post('/login',async (req,res)=>{
    const {email,password} = req.body;    
    if (email==='adminCoder@coder.com' &&   password==='adminCod3r123' ){
        req.session.user = {
            name: `Admin`,
            email: "...",
            role:'admin'
         }
        return res.status(200).send({status:"success",payload:"Admin"});
    }
    const userAux = await user.getUser({email,password})
    console.log("llega")
    if (!userAux) return res.status(400).send({status:"error",error:"Credenciales incorrectas"});
    
    
    req.session.user = {
        name: `${userAux.first_name} ${userAux.last_name}`,
        email: userAux.email,   
        role:userAux.role     
     }   
    
    
    return res.status(200).send({status:"success",payload:"Credenciales Correctas"});

})

router.get('/logout',(req,res)=>{
    req.session.destroy(err=>{
        if(err) return res.status(500).send({status:'error',error})  
        res.redirect('/login');     
    })
   
})


export default router;