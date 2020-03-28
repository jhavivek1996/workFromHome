var mongo = require('mongodb');
var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://aliter_db:aliter123@cluster0-4uc8u.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("aliter_db");
    
    //To Fetch single data from Database with query 
  
  //   var myquery = {name:"Gautam Prajapati"}
  //   dbo.collection("customers").findOne(myquery, function(err, result) {
  //     if (err) throw err;
  //     console.log("Results are"+JSON.stringify(result)+"\n");
  //     db.close();
  //   });
  // });

  //To Fetch single data from Database without query 
  // var myquery = {name:"Gautam Prajapati"};
  //   dbo.collection("customers").findOne({}, function(err, result) {
  //     if (err) throw err;
  //     console.log("Results are"+JSON.stringify(result)+"\n");
  //     db.close();
  //   });
  // });


  //To Fetch Multiple data from Database without query

//   dbo.collection("customers").find({}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log("Results are"+JSON.stringify(result));
//     db.close();
//   });
// });

 //To Fetch Multiple data from Database with query

var myquery = {projection:{college:'MSU'}};
dbo.collection("customers").find({},myquery).toArray(function(err, result) {
      if (err) throw err;
      console.log("Results are "+JSON.stringify(result));
      db.close();
    });
});