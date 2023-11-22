const portal_admin=require("../models/PortalAdmin")

const auth_admin=async (req,res,next)=>{
    try{
        if(req._id!=null){
            const user=await portal_admin.find({_id:req._id})
            if(!user){
                res.json({err:"username access denied"})
            }
            next()
            
        }
    }
    catch(err){
         res.status(500).send("User access denied")
    }
}
