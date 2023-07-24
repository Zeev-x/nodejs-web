const readline = require("readline").createInterface({
  input : process.stdin,
  output : process.stdout });
const express = require("express");
const fs = require("fs");
const zApio = require("z-apio");
const bmkg = require("zeev-gempa");
const app = express();

readline.question("Insert Port : ",port => {
  app.listen(port, () => {
    console.log("Website runing at http://localhost:"+port);
  });
  readline.close();
});

app.use(express.json());
app.set("json spaces",1);

const creatorName = ["Zeev-x","Zeevalya","Zeev","Zee"];
const creator = creatorName[Math.floor(Math.random()*creatorName.length)];
const user = ["User"];

warn = {
  error : {
    status : false,
    creator : creator,
    message : "Error code 404"
  }
};

//Website

app.get("/", async (req,res,next) => {
  fs.readFile("index.html",(err,data) => {
    res.writeHead(200,{"Content-Type" : "text/html"});
    res.write(data);
    res.end();
  });
});

app.get("/gempa",async (req,res) => {
  bmkg.gempa().then(x => {
    var web = `<!DOCTYPE HTML>
               <html>
                 <head>
                   <meta charset="UTF-8" name="keywords">
                   <title>info-gempa.io</title>
                </head>
                <body>
                  <nav>
                    <a class="logo">Gempa</a>
                  </nav>
                  <br><br><br><br>
                  <fieldset class="content">
                    <div align="center">
                      <h1>Info Gempa</h1><hr>
                      <img src="${x.map}" height="500px">
                    </div><hr>
                    <p>Waktu : ${x.waktu}</p>
                    <p>Lintang : ${x.lintang}</p>
                    <p>Bujur : ${x.bujur}</p>
                    <p>Magnitudo : ${x.magnitudo}</p>
                    <p>Kedalaman : ${x.kedalaman}</p>
                    <p>Wilayah : ${x.wilayah}</p><hr>
                    <div class="waterMark" align="center">
                      <h6>©Copyright Zeev-x 2023</h6>
                    </div>
                  </fieldset>
                  <style>
                    fieldset.content {
                      width: 50%;
                      margin: auto;
                      border-radius: 20px;
                      font-family: Monospace;
                    }
                    nav {
                      display: flex;
                      justify-content: space-between;
                      background-color: white;
                      align-items: center;
                      height: 60px;
                      background-clip: #FFFFFF;
                      box-shadow: 2px 2px 12px rgba(0,0,0,0.2);
                      padding: 0px 5%;
                    }
                    a {
                      text-decoration: none;
                    }
                    .logo {
                      font-family: Courier;
                      color: #000000;
                      font-size: 30px;
                      font-weight: bold;
                    }
                  </style>
                </body>
               </html>`;
     res.send(web);
  });
});

app.get("/image", async (req,res) => {
  var query = req.query.query;
  if(!query) return res.json(warn.error);
  zApio.apio(`https://zeev-x.github.io/js/json/${query}.json`).then(data => {
    var rand = Math.floor(Math.random()*data.length);
    var image = data[rand].img;
    var web = `<!DOCTYPE HTML>
               <html>
                 <head>
                   <meta charset="UTF-8" name="keywords">
                   <title>anime-image.io</title>
                </head>
                <body>
                  <nav>
                    <a class="logo">Anime Image</a>
                  </nav>
                  <br><br><br><br>
                  <div align="center">
                    <h1>Refresh untuk mendapatkan gambar baru</h1>
                    <a href="${image}"><img src="${image}" height="720"></a>
                  </div>
                  <style>
                    nav {
                      display: flex;
                      justify-content: space-between;
                      background-color: white;
                      align-items: center;
                      height: 60px;
                      background-clip: #FFFFFF;
                      box-shadow: 2px 2px 12px rgba(0,0,0,0.2);
                      padding: 0px 5%;
                    }
                    a {
                      text-decoration: none;
                    }
                    .logo {
                      font-family: Courier;
                      color: #000000;
                      font-size: 30px;
                      font-weight: bold;
                    }
                  </style>
                </body>
               </html>`;
     res.send(web);
  });
});

//website api

app.get("/gempa/api",async (req,res) => {
  bmkg.gempa().then(data => {
    res.json(data);
  });
});

app.get("/kiwora/api",async (req,res) => {
  zApio.apio("https://zeev-x.github.io/js/json/kiwora.json").then(data => {
    var rand = Math.floor(Math.random()*data.length);
    var image = data[rand].img;
    var jsonData = {
      status : true,
      type : 'image',
      url : image,
      creator : creator
    };
    res.json(jsonData);
  });
});

app.get("/anime/api",async (req,res) => {
  zApio.apio("https://zeev-x.github.io/js/json/stars.json").then(data => {
    var rand = Math.floor(Math.random()*data.length);
    var image = data[rand].img;
    var jsonData = {
      status : true,
      type : 'image',
      url : image,
      creator : creator
    };
    res.json(jsonData);
  });
});