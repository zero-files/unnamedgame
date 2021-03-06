if(process.env.NODE_ENV == "development") require("dotenv").config()
const app = require("./server/app")
const {error} = require("./controllers/middlewares")
const routing = require("./routes/routes")

const docsURL = "http://localhost:3000"

async function main(){
    const routes = await routing()
    app.use(routes)
    app.use(error)
    app.use((req, res) => res.status(404).json({error: 'URL not found', message: `The requested url '${req.url}' was not found. Please, read the docs: ${docsURL}`}))

    app.listen(app.get("port"), () => console.log(`Corriendo en puerto ${app.get("port")}.`))
}

main()
