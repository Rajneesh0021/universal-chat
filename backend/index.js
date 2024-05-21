const cors = require('cors');
require('dotenv').config()
const {connection} = require('./db/MongoDb');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const { verifyToken } = require('./middleware/auth');
const {server, app}=require('./services/socketConnection')





app.use(cors());


app.use('/api', authRoutes);
app.use('/api', verifyToken, chatRoutes);



const PORT = process.env.PORT || 5000;
server.listen(PORT, async() => {
  await connection
  console.log(`Server running on port ${PORT}`);
});
