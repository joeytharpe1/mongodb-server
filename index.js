const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null); //if error and null to handle errors

    console.log(`connect correctly to server`);

    const db = client.db(dbname);

    db.dropCollection('campsites', (err, result) => { //delete collection
        assert.strictEqual(err, null);
        console.log(`Dropped collection`, result);

        //recreated collection
        const collection = db.collection('campsites');
        collection.insertOne({ name: 'Breadcrum Trail Campground', description: 'test' }, (err, result) => {
            assert.strictEqual(err, null);
            console.log(`insert document:`, result.ops);

            collection.find().toArray((err, docs) => { //console.log all documents
                assert.strictEqual(err, null);
                console.log(`found document:`, docs);

                client.close(); //close clients
            });
        });
    });
});
