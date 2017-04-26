var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://postgres:@localhost:5432/assessbox";

var app = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb){
    //console.log(localdb);
    db = localdb;
     app.set('db', db);
    
     db.user_create_seed(function(){
       console.log("User Table Init");
     });
     db.vehicle_create_seed(function(){
       console.log("Vehicle Table Init")
     });
})

app.get('/api/users', function(req, res) {
  db.get_users(function(err, products){
      res.status(200).send(products);
  })
})

app.get('/api/vehicles', function(req, res) {
  db.get_vehicles(function(err, products){
      res.status(200).send(products);
  })
})

app.post('/api/users', function(req,res) {
  //console.log("POST USER:::", req.body);
  db.add_user(req.body.firstname, req.body.lastname, req.body.email, function(err, products){
      res.status(200).send(products);
  })
})

app.post('/api/vehicles', function(req,res) {
  //console.log("POST VEHICLE:::", req.body);
  db.add_vehicle(req.body.make, req.body.model, req.body.year, req.body.ownerId, function(err, products){
      res.status(200).send(products);
  })
})

app.get('/api/user/:userID/vehiclecount', function(req,res) {
  db.vehicle_count(req.params.userID, function(err, products){
      //console.log("count output", products[0]);
      res.status(200).send(products[0]);
  })
})

app.get('/api/user/:userID/vehicle', function(req,res) {
  db.user_vehicles(req.params.userID, function(err, products){
      res.status(200).send(products);
  })
})

app.get('/api/vehicle', function(req,res) {
  console.log("by email params", req.params, req.query);
  if (req.query.UserEmail) {
    console.log("searching by email");
    db.get_by_email(req.query.UserEmail, function(err, products){
      res.status(200).send(products);
    })
  }
  if (req.query.userFirstStart) {
    console.log("searching by partial user name");
    db.get_by_partial_name(req.query.userFirstStart + '%', function(err, products){
      res.status(200).send(products);
    })
  }
})

app.get('/api/newervehiclesbyyear', function(req,res) {
  db.get_newer_vehicles(function(err, products){
      res.status(200).send(products);
  })
})

app.put('/api/vehicle/:vehicleId/user/:userId', function(req,res) {
  db.new_owner(req.params.vehicleId, req.params.userId, function(err, products){
      res.status(200).send(products);
  })
})

app.delete('/api/user/:userId/vehicle/:vehicleId', function(req, res) {
  db.delete_ownership(req.params.userId, req.params.vehicleId, function(err, products) {
      res.status(200).send(products);
  })
})

app.delete('/api/vehicle/:vehicleId', function(req, res) {
  console.log("deleting vehicle #", req.params.vehicleId);
  db.delete_vehicle(req.params.vehicleId, function(err, products) {
      res.status(200).send(products);
  })
})


app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
})

module.exports = app;
