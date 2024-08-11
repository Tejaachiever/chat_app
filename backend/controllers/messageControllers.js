

const message_model= require("../models/messageModel");

module.exports.addMessage= async (req, res, next) => {
const {to,from,message}= req.body;
const data= await message_model.create(
    {
        message:{text:message},
        users:[to,from],
        sender:from,
    }
)

if(data)
{
    return res.json("msgController=> message added to data base");
}
else{
    return res.json("msgController=> failed to add msg in database")
}
}




module.exports.getMessage= async (req, res, next) => {

    try {
        const {to,from} = req.body;

    //array returned 
    const message = await message_model.find(
        {
            users:{
                $all:[to,from], //array with any order of elements will be searched
            },
        }
    ).sort({updatedAt:1});


    // array containing objects as elements
    //each object has message sent from both current "from" => "to"  and "to"=>"from" 
    // and boolean signifying whther current msg was sent by "from" or not

    const extractedMsg = message.map((msg)=>{
        return {
          
            from_me:msg.sender.toString()===from, //true or false
            message:msg.message.text,

        }
    });

    res.json(extractedMsg);

    } catch (error) {
        next(error);
        
    }

}