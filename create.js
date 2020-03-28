var mongo = require('mongodb');
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://aliter_db:<password>@cluster0-4uc8u.mongodb.net/test?retryWrites=true&w=majority";

// To create table in database

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("aliter_db");
    dbo.createCollection("customers", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });