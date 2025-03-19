const express = require('express');
const cors = require('cors');
const app = express()

app.use(cors())
app.use(express.json())


const UserRouter = require("./routes/UserRouter");
app.use('/api/users', UserRouter)

const PostRouter = require("./routes/PostRouter")
app.use('/api/posts', PostRouter)

const CommentRouter = require("./routes/CommentRouter")
app.use('/api/comments', CommentRouter)

const RecipeRouter = require("./routes/RecipeRouter")
app.use('/api/recipes', RecipeRouter)

const RecipeIngredientRouter = require("./routes/RecipeIngredientRouter")
app.use('/api/recipe-ingredient', RecipeIngredientRouter)

const IngredientRouter = require("./routes/IngredientRouter")
app.use('/api/ingredients', IngredientRouter)

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('Server running...')
})