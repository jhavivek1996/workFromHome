var mongo = require('mongodb');
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://aliter_db:aliter123@cluster0-4uc8u.mongodb.net/test?retryWrites=true&w=majority";




MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("aliter_db");
    
    //To insert Single data in Table 
//     var myobj = { name: "Company Inc", address: "Highway 37" };
//     dbo.collection("customers").insertOne(myobj, function(err, res) {
//       if (err) throw err;
//       console.log("1 document inserted");
//       db.close();
//     });
//   });

   //To insert Multiple data in Table
  var myobj = [{ name: "Seshachalam", address: "PWC Digital Labs" },
               { name: "Mayankbhai", address: "CloudSwift.io" }];
  dbo.collection("customers").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});