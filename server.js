
const express = require("express");
const app = express();

const { MongoClient, ServerApiVersion } = require("mongodb");

const PORT = process.env.PORT;
const connectionUri = process.env.connectionString;

const client = new MongoClient(connectionUri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


async function runClient() {

    try {
        await client.connect(); //connect to DB(optional)
        console.log('Connected to Le Database!');
    
        const db = client.db("to-do-app"); //database
        const taskCollection = db.collection("tasks") //returns reference/creates a new db colleciton

        app.get("/", async (req, res) => {
            // await taskCollection.deleteMany({}); // deletes all the documents in the collection > quick way to reset the collection
            const data = await taskCollection.find().toArray(); //finds all the quotes and returns an array
            console.log("DATA: ", data);
            res.render("index.ejs", { tasks: data}); //used to render the .ejs file
        })

        app.post("/addTask", async (req, res) => {
            try {
                await taskCollection.insertOne(req.body); //adds one item into a collection (vs insertMany())
                // console.log("REQ.BODY: ", req.body);
                // console.log("POST result: ", insertResult);
                console.log("Task added");
                res.redirect("/");
            }catch(err) {
                console.err(err);
            }  
        })

        app.put('/addOneLike', (request, response) => {
            db.collection('rappers').updateOne({stageName: request.body.stageNameS, birthName: request.body.birthNameS,likes: request.body.likesS},{
                $set: {
                    likes:request.body.likesS + 1
                }
            },{
                sort: {_id: -1},
                upsert: true
            })
            .then(result => {
                console.log('Added One Like')
                response.json('Like Added')
            })
            .catch(error => console.error(error))

        })

        app.delete('/deleteRapper', (request, response) => {
            db.collection('rappers').deleteOne({stageName: request.body.stageNameS})
            .then(result => {
                console.log('Rapper Deleted')
                response.json('Rapper Deleted')
            })
            .catch(error => console.error(error))

        })

        } catch (error) {
            console.error(error)
        }

}

runClient();


app.listen(PORT, () => {
    console.log(`Server running on PORT# ${PORT}. You better go catch it!`);
})