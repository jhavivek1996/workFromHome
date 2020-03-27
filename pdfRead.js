
// - PDF read & write
// - XML Read
// - File CUT/COPY/MOVE Rename


const fs = require('fs');
const path = require('path')
const xmlReader = require('read-xml');
const pdf = require('pdf-parse');

// To read PDF 
let dataBuffer = fs.readFileSync('new.pdf');
 
pdf(dataBuffer).then(function(data) {
 
   
    console.log(data.text); 
        
});

// To copy file

fs.copyFileSync("nodemailer.js","jhavivek.js");


// To move 
// fs.rename("oldname and path","newname and path", callback)

let pattt = './uploads/vivek.pdf'
fs.moveFile('./uploads/satish.pdf',pattt,()=>{
    console.log("success");

})
   
// To rename file fs.rename("oldname","newname")


fs.renameSync("data.js","fileOperation.js")
// To read xml file
xmlReader.readXML(fs.readFileSync('vivek.xml'), function(err, data) {
    if (err) {
      console.error(err);
    }
   
    console.log('xml encoding:', data.encoding);
    console.log('Decoded xml:', data.content);
  });