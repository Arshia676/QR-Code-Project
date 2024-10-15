import inquirer from 'inquirer';
import qr  from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
        type:"input",
        name:"url",
        message:"Enter the URL you want to generate a QR code for:",
    },
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const url = answers.url;
    const qr_svg = qr.image(url, { type: 'png' });
    const qrImagePath = "qrcode_img.png";
     qr_svg.pipe(fs.createWriteStream(qrImagePath));
  
    fs.writeFile("user_url.txt",url,(err)=>{
      if (err)  throw err;
      console.log(`The Url "${url}"has been saved to user_url.text and a QR code has been generated as ${qrImagePath}`);
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
    console.error('An error occurred:', error);
    } else {
     console.log("Something else went wrong") ;
    }
  });

