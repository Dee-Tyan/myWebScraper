const Data = require("../models/dataModels")

async function getData(req, res){
    try {

        const data = await Data.find()

        res.writeHead(200, { "Content-Type": "database/json" });
        res.end(JSON.stringify(data));

    } catch (error){
        console.log(error)
    }
}

async function getEach(req, res, id){
    try {

        const eachEntry = await Data.findById(id)
        
        
        if (!eachEntry){
            res.writeHead(404, { "Content-Type": "database/json" });
            res.end(JSON.stringify({message: 'Record Not Found'}));
        }else {
            res.writeHead(200, { "Content-Type": "database/json" });
            res.end(JSON.stringify({eachEntry}));
        }

    } catch (error){
        console.log(error)
    }
}

module.exports = {
    getData,
    getEach
}