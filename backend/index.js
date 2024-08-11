const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config(); 
const cors = require('cors');
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const socket = require("socket.io");
const path = require('path');

const port =4500;

const app = express();
app.use(cors(
  {
      // credentials:true,
      origin:"http://localhost:3000"
  }
))  //position matters
app.use(express.json()); 
app.use("/api/auth",userRoutes);
app.use("/api/message",messageRoutes);


const server = http.createServer(app);


mongoose.connect(process.env.MONGO_URL

  ).then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error);
});

const io= socket(server,{
  cors:{
    origin:"http://localhost:3000",
    credentials:true,
  }
})

global.onlineUsers= new Map();

io.on("connection",(socket)=>{
  global.chatSocket=socket;

  socket.on("add-user",(userId)=>{
    onlineUsers.set(userId,socket.id);

  })

  socket.on("send-msg",(data)=>{
    const sendUserSocket= onlineUsers.get(data.to);
    //data.to is userID that acts as a field name to fetch value that is socketID
    if(sendUserSocket)
    {
      socket.to(sendUserSocket).emit("msg-received",data.message);
    }

  });
})

//-----------code for deployment
if(process.env.NODE_ENV === "production"){
  const dirPath= path.resolve();
  app.use(express.static("./front/build"));
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(dirPath,"./front/build","index.html"));
  })
}


server.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});

// app.listen(port, () => {
//     console.log(`server is running at port ${port}`);
//   });