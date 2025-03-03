const express = require('express');
const cors = require('cors');
const app = express()

app.use(cors())
app.use(express.json())


const UserRouter = require("./routes/UserRouter");
app.use('/api/users', UserRouter)


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('Server running...')
})