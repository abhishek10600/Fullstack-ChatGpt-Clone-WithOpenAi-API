import dotenv from "dotenv"
dotenv.config()

const port = process.env.PORT || 4001

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

import app from "./app.js"
