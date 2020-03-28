var mongo = require('mongodb');
var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://aliter_db:aliter123@cluster0-4uc8u.mongodb.net/test?retryWrites=true&w=majority";


MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("aliter_db");
    
    // Delete single data via query
//     var myquery = { hobby: 'Cartoonist' };

//     dbo.collection("customers").deleteOne(myquery, function(err, result) {
//       if (err) throw err;
//       console.log("Results are\n "+result);
//       db.close();
//     });
//   });


  // Delete multiple data via query
  var myquery = { hobby: '/^C/' };

  dbo.collection("customers").deleteOne(myquery, function(err, result) {
    if (err) throw err;
    console.log("Results are\n "+result);
    db.close();
  });
});