
const mongoose= require("mongoose");


    
    const messageSchema= new mongoose.Schema(

        { 
            message:{
             type:{
                 text:String,
                
             }
            },
            users:Array,
            sender:{
             type:mongoose.Schema.Types.ObjectId,
             ref:"Users",
          
            },
         },
         {
             timestamps:true,
         }
    
    );

    


module.exports= mongoose.model("messages",messageSchema);