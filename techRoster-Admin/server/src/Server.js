let express = require("express");
let cors = require('cors');
let MongoClient = require("mongodb").MongoClient;
let bodyParser = require("body-parser");
let sanitizer = require("express-sanitizer");
let objectId = require("mongodb").ObjectId;

// MongoDB constants
const URL = "mongodb://localhost:27017/";
const DB_NAME = "dbTechs";

// construct application object via express
let app = express();
// add cors as middleware
app.use(cors());
// add body parser middleware to parse up any JSON coming in with request
app.use(bodyParser.json());
// add sanitizer to clean all JSON incoming data
app.use(sanitizer());
// express static middleware - setup static files location
app.use(express.static('./dist'));

// construct MongoClient object for working with MongoDB
let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/get", async (request, response) => {
    // construct MongoClient object for working with MongoDB
    let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    // Use connect method to connect to the server
    try {
        await mongoClient.connect(); 
        // convert all documents in technologies collection into array in one awesome statement!
        let techArray = await mongoClient.db(DB_NAME).collection("technologies").find().sort("name",1).toArray();        
        let courseArray = await mongoClient.db(DB_NAME).collection("courses").find().sort("name",1).toArray();
        // close mongoClient (connection to MongoDB server)
        mongoClient.close();
        let json = { "technologies": techArray, "courses": courseArray };

        // set status code to 200 as per RESTful requirements
        response.status(200);
        // serializes sampleJSON to string format
        response.send(json);
    } catch (error) {
        console.log(`>>> ERROR : ${error}`);
        response.status(500);
        response.send({error: `Server error with get : ${error}`});
        throw error;
    }
});

app.post("/post", async (request, response) => {
    // construct MongoClient object for working with MongoDB
    let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    // Use connect method to connect to the server
    try {
        await mongoClient.connect(); 
        // convert all documents in technologies collection into array in one awesome statement!
        let techCollection = mongoClient.db(DB_NAME).collection("technologies");
        
        console.log("incoming JSON!");

        // sanitize our incoming JSON
        request.body.name = request.sanitize(request.body.name);
        request.body.description = request.sanitize(request.body.description);
        request.body.difficulty = request.sanitize(request.body.difficulty);
        request.body.courses.forEach(course => {
            course.code = request.sanitize(course.code);
            course.name = request.sanitize(course.name);            
        });

        // add the new document into MongoDB
        let result = await techCollection.insertOne(request.body);
        mongoClient.close();
        response.status(200);
        // send the result of the insert back to use on client
        response.send(result);

    } catch (error) {
        console.log(`>>> ERROR : ${error}`);
        response.status(500);
        response.send({error: `Server error with get : ${error}`});
        throw error;
    }
});

app.post("/postCourse", async (request, response) => {
    // construct MongoClient object for working with MongoDB
    let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    // Use connect method to connect to the server
    try {
        await mongoClient.connect(); 
        // convert all documents in technologies collection into array in one awesome statement!
        let courseCollection = mongoClient.db(DB_NAME).collection("courses");
        
        console.log("incoming JSON!");

        // sanitize our incoming JSON
        request.body.code = request.sanitize(request.body.code);
        request.body.name = request.sanitize(request.body.name);

        // add the new document into MongoDB
        let result = await courseCollection.insertOne(request.body);
        mongoClient.close();
        response.status(200);
        // send the result of the insert back to use on client
        response.send(result);

    } catch (error) {
        console.log(`>>> ERROR : ${error}`);
        response.status(500);
        response.send({error: `Server error with get : ${error}`});
        throw error;
    }
});

app.put("/put/:id", async (request, response) => {
    // construct MongoClient object for working with MongoDB
    let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    // Use connect method to connect to the server
    try {
        await mongoClient.connect(); 
        // convert all documents in technologies collection into array in one awesome statement!
        let techCollection = mongoClient.db(DB_NAME).collection("technologies");
        
        // convert url routing parameter to ObjectId format (24 byte hex string)
        let id = objectId(request.params.id);

        // sanitize our incoming JSON
        request.body.name = request.sanitize(request.body.name);
        request.body.description = request.sanitize(request.body.description);
        request.body.difficulty = request.sanitize(request.body.difficulty);
        request.body.courses.forEach(course => {
            course.code = request.sanitize(course.code);
            course.name = request.sanitize(course.name);            
        });

        // building our update query
        let selector = {"_id": id};
        let newValue = {$set: {"name":request.body.name, 
                                "description":request.body.description, 
                                "difficulty":request.body.difficulty, 
                                "courses":request.body.courses} };
        // make it happen! update the document in mongoDB
        let result = await techCollection.updateOne(selector, newValue);        

        mongoClient.close();
        response.status(200);
        // send the result of the insert back to use on client
        response.send(result);

    } catch (error) {
        console.log(`>>> ERROR : ${error}`);
        response.status(500);
        response.send({error: `Server error with get : ${error}`});
        throw error;
    }
});

app.put("/putCourse/:id", async (request, response) => {
    // construct MongoClient object for working with MongoDB
    let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    // Use connect method to connect to the server
    try {
        await mongoClient.connect(); 
        // convert all documents in technologies collection into array in one awesome statement!
        let courseCollection = mongoClient.db(DB_NAME).collection("courses");
        
        // convert url routing parameter to ObjectId format (24 byte hex string)
        let id = objectId(request.params.id);

        // sanitize our incoming JSON
        request.body.code = request.sanitize(request.body.code);
        request.body.name = request.sanitize(request.body.name);

        // building our update query
        let selector = {"_id": id};
        let newValue = {$set: {"code":request.body.code, 
                                "name":request.body.name} };
        // make it happen! update the document in mongoDB
        let result = await courseCollection.updateOne(selector, newValue);        

        mongoClient.close();
        response.status(200);
        // send the result of the insert back to use on client
        response.send(result);

    } catch (error) {
        console.log(`>>> ERROR : ${error}`);
        response.status(500);
        response.send({error: `Server error with get : ${error}`});
        throw error;
    }
});

app.delete("/delete/:id", async (request, response) => {
    // construct MongoClient object for working with MongoDB
    let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    // Use connect method to connect to the server
    try {
        await mongoClient.connect(); 
        // convert all documents in technologies collection into array in one awesome statement!
        let techCollection = mongoClient.db(DB_NAME).collection("technologies");
        
        // convert url routing parameter to ObjectId format (24 byte hex string)
        let id = objectId(request.params.id);

        // building our delete query
        let selector = {"_id": id};
        // make it happen! delete the document in mongoDB
        let result = await techCollection.deleteOne(selector);        

        mongoClient.close();
        
        
        if (result.result.n == 0) {
            response.status(500);
            response.send({error: "id not found"});
        } else {
            response.status(200);
            // send the result of the delete back to use on client
            response.send(result);
        }

    } catch (error) {
        console.log(`>>> ERROR : ${error}`);
        response.status(500);
        response.send({error: `Server error with get : ${error}`});
        throw error;
    }
});

app.delete("/deleteCourse/:id", async (request, response) => {
    // construct MongoClient object for working with MongoDB
    let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    // Use connect method to connect to the server
    try {
        await mongoClient.connect(); 
        // convert all documents in technologies collection into array in one awesome statement!
        let courseCollection = mongoClient.db(DB_NAME).collection("courses");
        
        // convert url routing parameter to ObjectId format (24 byte hex string)
        let id = objectId(request.params.id);

        // building our delete query
        let selector = {"_id": id};
        // make it happen! delete the document in mongoDB
        let result = await courseCollection.deleteOne(selector);        

        mongoClient.close();
        
        
        if (result.result.n == 0) {
            response.status(500);
            response.send({error: "id not found"});
        } else {
            response.status(200);
            // send the result of the delete back to use on client
            response.send(result);
        }

    } catch (error) {
        console.log(`>>> ERROR : ${error}`);
        response.status(500);
        response.send({error: `Server error with get : ${error}`});
        throw error;
    }
});

app.listen(8080, () => console.log("Listening on port 8080"));