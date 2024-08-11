const user_model= require("../models/userModels");
const bcrypt= require("bcrypt");


module.exports.register= async (req, res, next) => {

try {
    
    const { username, email, password,prostr } = req.body;

    const user_check = await user_model.findOne({ username });
    if(user_check)
    {
        return res.json({msg:"username already taken ",status:false})
    }
    const email_check = await user_model.findOne({ email });
    if(email_check)
    {
        return res.json({msg:"Email already taken ",status:false})
    }
   
    const hashed_password=await  bcrypt.hash(password,10);

    let check_image=false;

   if(prostr!=""){
    check_image=true;
   }

   console.log("prostr at back ",prostr);

  
    const user= await user_model.create(
        {
            username:username,
            email:email,
            password:hashed_password,
            is_profile_image_set:check_image,
            profile_image:prostr,
        })
   
        delete user.password;

        return res.json({user,status:true});
} catch (ex) {
   next(ex);

}

    };

// for login

    module.exports.login= async (req, res, next) => {

        try {
            
            const { username, password } = req.body;
        
            const user = await user_model.findOne({ username });

            //user is null if username not found
            //else returns whole document

            //if user null
            if(!user)
            {
                
                return res.json({msg:"username not registered ",status:false})
            }

            //comparing password
            const decrypted_password=await bcrypt.compare(password,user.password);

            //if password not same
            if(!decrypted_password)
            {
                return res.json({msg:"Wrong Password ",status:false})
            }

            delete user.password;// isnt working
            return res.json({status:true,user});

        } catch (ex) {
           next(ex);
        
        }
        
            };

            module.exports.allContacts= async (req, res, next) => {

              try {
                const users= await user_model.find({
                    _id:{$ne:req.params.id}
                }).select(
                    [
                        "email",
                        "username",
                        "id"

                    ]
                );
                return res.status(201).json(users);


              } catch (error) {
                console.log("error of allContacts=>",error);
                res.json("not working")
                next(error)
              }
            }