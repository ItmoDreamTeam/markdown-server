module.exports = function (app, db) {
    //get all
    app.get('/api/md', (req, res) => {
        db.collection('md').find({}).toArray(function (error, result) {
            if (error) {
                res.status(400);
                res.send(error);
            } else {
                res.status(200);
                res.send(result);
            }
        });
    });

    //create
    app.post('/api/md', (req, res) => {
        db.collection('md').findOne({'_id': req.body.name}, (error, result) => {
            if (result) {
                res.status(409);
                res.send("MD with name '" + req.body.name + "' already exists");
            } else {
                db.collection('md').insertOne({_id: req.body.name, content: ''}, (error, result) => {
                    if (error) {
                        res.status(400);
                    } else {
                        res.status(201);
                    }
                    res.send(error);
                });
            }
        })
    });

    //edit
    app.put('/api/md/:name', (req, res) => {
        db.collection('md').findOne({'_id': req.params.name}, (error, result) => {
            if (result) {
                db.collection('md').updateOne({'_id': req.params.name}, {$set: {'content': req.body.content}}, (error, result) => {
                    if (error) {
                        res.status(400);
                    } else {
                        res.status(200);
                    }
                    res.send(error);
                });
            } else {
                res.status(404);
                res.send("MD with name '" + req.params.name + "' not found");
            }
        })
    });

    //delete
    app.delete('/api/md/:name', (req, res) => {
        db.collection('md').findOne({'_id': req.params.name}, (error, result) => {
            if (result) {
                db.collection('md').deleteOne({'_id': req.params.name}, (error, result) => {
                    if (error) {
                        res.status(400);
                    } else {
                        res.status(200);
                    }
                    res.send(error);
                });
            } else {
                res.status(404);
                res.send("MD with name '" + req.params.name + "' not found");
            }
        })
    });
};
