const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fileUpload = require('express-fileupload');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const pdfDocument = require('pdfkit');




app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// app.use(cors());



var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:'Aliter_db'
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("MySql Connected!");
  });


  


app.post('/register',(req,res,err)=>{
   let data = {
               name:req.body.name,
               designation:req.body.designation,
               email:req.body.email,
               phone:req.body.phone,
               username:req.body.username,
               password:req.body.password
              };
    var sql = "INSERT INTO register SET ?";
    console.log(req.body);
    let query = con.query(sql,data,(err, results) => 
            {
            if(err) throw err;
            else{
                //
                let transporter = nodemailer.createTransport({
                  service:'gmail',
                  auth:{
                      user:"example@gmail.com",
                      pass:"password123"
            
                  }
              });
             
              let mailOptions = {
                  from:'jhaviveksud@gmail.com',
                  to:data.email,
                  subject : `Hi ${data.name} this is Node js mailing service`,
                  text : `Hii Name : ${data.name}, Designation: ${data.designation} email: ${data.email}, phone: ${data.phone}, username: ${data.username}`
              }
            
              let transp = transporter.sendMail(mailOptions,(err,data)=>{
                if(err){
                  console.log("Error"+err);

                }else{
                  console.log("Mail Sent")
                }
              })
             
           } 

           

                //



                res.send(JSON.stringify({"status": 200, "error": null, "response": results}));

            }
            

             
          );
          
          
         
       
});


app.get('/show',(req,res,err)=>{
    let sql  = "SELECT * from register";
    console.log(req.query)
    let query = con.query(sql,(err, results) => {
        if(err) throw err;
         res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  
      
      });

});


let verifyToken=(req,res,next)=>{
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ');
    
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }else{
    res.sendStatus(403);
  }
  
}

//In this i have tried to take username from database but facing some bugs.
app.post('/api/login',(req,res)=>{
 // console.log(req.body)
 let sql = "Select username,password from register";
 let query = con.query(sql,(err, results) => {
    
      console.log(results)
      var pdata = JSON.parse(results)

      console.log(pdata)
      console.log(user)
      jwt.sign({username:username,password:password},'secretkey',(err,token)=>{

        for(let i=0;i<=user.length;i++){
          if(user.username && user.password){
            res.json({token});
            console.log(token)
          }
    
        }
   });
   
  
  // console.log(user)
 
    
    
    
  });
 
  
});

app.post('/api/posts',verifyToken,(req,res)=>{
  jwt.verify(req.token,'secretkey',(err,authData)=>{
    if(err){
      res.sendStatus(403);
    }
    else{
      
      let selectData = `SELECT id,name,designation,email,phone,username from register`;
      let query = con.query(selectData,(err,result)=>{
        res.send(JSON.stringify({"status": 200, "error": null,"result":result}));
      })
      
    }
  })

})

// In this data is coming from database and after the pdf is generated
app.get('/api/pdf',(req,res,err)=>{
  let query_fire=`SELECT * from register`;
  console.log(req.query)
  let query = con.query(query_fire,(err,results)=>{
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    
    let dat=results.map((e)=>{
      return e.name
     });
     
  const doc = new pdfDocument();
 

    
    
   
  
    doc.pipe(fs.createWriteStream(`report.pdf`));


doc
  .fontSize(25)
  .text(dat[0], 100, 100);


  doc.image('image.jpeg', {
    fit: [250, 300],
    align: 'center',
    valign: 'center'
  });

  doc
  .addPage()
  .fontSize(25)
  .text(dat[0], 100, 100);

  doc
  .save()
  .moveTo(100, 150)
  .lineTo(100, 250)
  .lineTo(200, 250)
  .fill('#FF3300');

  doc
  .scale(0.6)
  .translate(470, -380)
  .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
  .fill('red', 'even-odd')
  .restore();

  doc
  .addPage()
  .fillColor('blue')
  .text('Here is a link!', 100, 100)
  .underline(100, 100, 160, 27, { color: '#0000FF' })
  .link(100, 100, 160, 27, 'http://google.com/');

  doc.end();

  
    
  });
  
})

// app.get('/show',(req,res,err)=>{
//   let sql  = "SELECT * from register";
//   console.log(req.query)
//   let query = con.query(sql,(err, results) => {
//       if(err) throw err;
//        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));

    
//     });

// });

// This is the static api to generate PDF

app.get('/createpdf',  (req,res)=>{
  const doc = new pdfDocument();

doc.pipe(fs.createWriteStream('satish.pdf'));

doc
  .fontSize(25)
  .text("Vivek Jha", 100, 100);


  doc.image('image.jpeg', {
    fit: [250, 300],
    align: 'center',
    valign: 'center'
  });

  doc
  .addPage()
  .fontSize(25)
  .text('Here is some vector graphics...', 100, 100);

  doc
  .save()
  .moveTo(100, 150)
  .lineTo(100, 250)
  .lineTo(200, 250)
  .fill('#FF3300');

  doc
  .scale(0.6)
  .translate(470, -380)
  .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
  .fill('red', 'even-odd')
  .restore();

  doc
  .addPage()
  .fillColor('blue')
  .text('Here is a link!', 100, 100)
  .underline(100, 100, 160, 27, { color: '#0000FF' })
  .link(100, 100, 160, 27, 'http://google.com/');

  doc.end();

  
res.sendStatus(200);
  
})








app.listen(8000)


