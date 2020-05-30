var dbConn = null;

function connectToMongo() {
    // Reuse existing connection if exist
    if (dbConn) return Promise.resolve(dbConn);
    const MongoClient = require('mongodb').MongoClient;
    
  
    const url = 'mongodb+srv://pressDbUser1:pressUserPass1232@cluster0-kwagc.mongodb.net/test?retryWrites=true&w=majority';
    const dbName = 'pressDB';  
    
    const client = new MongoClient(url, { useNewUrlParser: true ,useUnifiedTopology: true }, );

    return client.connect()
        .then(client => {
            console.log('Connected to MongoDB');
            // If we get disconnected (e.g. db is down)
            client.on('close', ()=>{
                console.log('MongoDB Diconnected!');
                dbConn = null;
            })
            dbConn = client.db(dbName)
            return dbConn;
        })
}

module.exports = {
    connect : connectToMongo
}
