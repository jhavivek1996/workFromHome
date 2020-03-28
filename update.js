var mongo = require('mongodb');
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://aliter_db:aliter123@cluster0-4uc8u.mongodb.net/test?retryWrites=true&w=majority";

// Update Single Data


MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("aliter_db");

//     var myquery = { name:"Satish" };
//     var newvalues = { $set: {name: "Mickey", designation: "Rat Cartoon",place:"HongKong",college:"Walt Disney",hobby:"Cartoonist" } };
//     dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
//       if (err) throw err;
//       console.log("1 document updated");
//       db.close();
//     });
//   });




//   Update Multipe data


    var myquery = { name: /^Viv/ };
    var newvalues = {$set: {name: "Satish Pal"} };
    dbo.collection("customers").updateMany(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log(res.result.nModified + " document(s) updated");
      db.close();
    });
  });