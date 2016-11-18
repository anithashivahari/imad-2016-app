var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool=require('pg').pool;
var crypto = require('crypto');
var config={
    user:'anithashivahari',
    database: 'anithashivahari',
    host: 'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD
    
};
var app = express();
app.use(morgan('combined'));

var articles={
    'article-one' :{
    
  title: 'article One Anitha',
  heading: 'Article One',
  date: 'sep 5, 2016',
  content: ` 
   <p>
                This is the content for my first article, this is the content of my first article, this is the content of my first article
            </p>
            <p>
                this is the conttent of my first article ,this is the content of my first articld
                
            </p>` 
},
    'article-two' :{
        title: 'article two Anitha',
  heading: 'Article two',
  date: 'sep 5, 2016',
  content: ` 
   <p>
                This is the content for my second article, this is the content of my second article, this is the content of my second article
            </p>
            <p>
                this is the conttent of my second article ,this is the content of my second articld
                
            </p>`
        
    },
    'article-three':{
        title: 'article three Anitha',
  heading: 'Article three',
  date: 'sep 10, 2016',
  content: ` 
   <p>
                This is the content for my third article, this is the content of my third article, this is the content of my third article
            </p>
            <p>
                this is the conttent of my third article ,this is the content of my third articld
                
            </p>`},
    

};
function createTemplate(data){
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;

var htmlTemplate=`
<html>
    <head>
        <title>
        ${title}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
        <div>
            <a href="/">Home</a>
        </div>
        <hr/>
        <h3>
           ${heading}
        </h3>
        <div>
            ${date.toDateString() }
        </div>
        <div>
            ${content}
        </div>
        </div>
        
    </body>
</html>`
   ;
   return htmlTemplate;
   }
   app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
 
});
function hash(input,salt){
    // how do we create hash
    var hashed= crypto.pbkdf2Sync(input,salt,10000,512,'sha512'); 
    return hashed.toString('hex') ;
}

app.get('/hash/:input', function(req,res){
   var hashedString = hash(req.params.input,'this-is-some-random-string');
   res.send(hashedString);
});
    var pool=new Pool(config);
    app.get('/test-db', function(req,res){
        //make a seleect request 
        //return response with results
        pool.query('SELECT * FROM test',function(err,result)
        {
            if(err){
                res.status(500).send(err.toString());
                
            }else
            {
                res.send(JSON.stringify(result.rows));
            }
        });
        
    });
var counter=0;
   app.get('/counter', function(req,res){
       counter = counter+1;
       res.send(counter.toString());
       
   });
   var names=[];
app.get('/submit-name',function(req,res){//URL:/submit-name?name=xxxx
    //get the name from the request
    var name=req.query.name; //1000
    
    names.push(name);
    //JSON;java script notation
    res.send(JSON.stringify(names));//1000
});


app.get('/article/:articleName',function(req,res){
    //articleName == article-one
    //articles[aarticleName] =={};
    //select * from article where article='article-one'
    pool.query("SELECT * FROM article WHERE title=$1" + [req.params.Name],function(err,result)
    {
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            if(result.rows.length===0){
                res.status(404).send('article not found');
            }else{
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
   });

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
