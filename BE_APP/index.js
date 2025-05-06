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

const IngredientRouter = require("./routes/IngredientRouter")
app.use('/api/ingredients', IngredientRouter)

const CartRouter = require("./routes/CartRouter")
app.use('/api/cart', CartRouter)

const ReviewRouter = require("./routes/ReviewRouter")
app.use('/api/reviews', ReviewRouter)

const FavoriteRouter = require("./routes/FavoriteRouter")
app.use('/api/favorites', FavoriteRouter)

const OrderRouter = require("./routes/OrderRouter")
app.use('/api/order', OrderRouter)

const SupplierRouter = require("./routes/SupplierRouter")
app.use('/api/suppliers', SupplierRouter)

const UploadRouter = require("./utils")
app.use('/api/upload', UploadRouter)

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('Server running...')
})