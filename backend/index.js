const cors = require('cors');
require('dotenv').config()
const path =require('path')
const {connection} = require('./db/MongoDb');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const { verifyToken } = require('./middleware/auth');
const {server, app, express}=require('./services/socketConnection')

const __Dirname=path.resolve()



app.use(cors());


app.use('/api', authRoutes);
app.use('/api', verifyToken, chatRoutes);

app.use(express.static(path.join(__Dirname, '/frontend/build')))

app.get("*",(req,res)=>{
  res.sendFile(path.join(__Dirname, "frontend","build","index.html"))
})
const PORT = process.env.PORT || 5000;
server.listen(PORT, async() => {
  await connection
  console.log(`Server running on port ${PORT}`);
});
