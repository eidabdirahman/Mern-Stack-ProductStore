import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import ProductsRouter from './routes/ProudctRoute.js'
dotenv.config()
connectDB();

const app = express()
const PORT = process.env.PORT || 5010
const __dirname = path.resolve();


app.use(express.json())

//  routes
app.use('/api/', ProductsRouter);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
