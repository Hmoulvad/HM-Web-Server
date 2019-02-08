import express = require("express");

const app = express();
app.set("port", process.env.port || 3000);

app.get('/', (req, res) => {
    res.send("Welcome to IMPACT Holiday Planner");
})

export default app;