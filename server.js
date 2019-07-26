var express=require('express');
var app=express();
const session = require('express-session');


var path=require('path');
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');

app.use(session({secret:'max',saveUninitialized:true,resave:false}));
app.listen(3000,(request,response)=>{
  console.log("server started:3000");
});

app.get('/',(request,response)=>{
//  response.setHeader("Content-Type","text/html");
//  response.end("<h1>Hello from NodeJS</h1>");
response.render('index',{'headmsg':'Login Form'});
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));

var con=require('./db');

app.post('/loginCheck',(request,response)=>{
 var uid=request.body.uid;
 var pass=request.body.pwd;
 var sql="select * from login where uid='"+uid+"' and password='"+pass+"'";
 con.query(sql,(err,result)=>{
console.log(result)
      if(err) throw err;
      else if(result.length>0)
      {
        request.session.views=uid;
        console.log(">>>"+request.session.views);
         response.render('home',{user:request.session.views});
    }else
      response.render('index',{'msg':'Login Fail'});
 });
});

app.get('/logout',(request,response)=>{
  request.session.views=null;
response.render('index');
});

app.get('/createEmp',(request,response)=>{
response.render('createEmp');
});

app.get('/viewEmp',(request,response)=>{
  var sql="select * from employee";
  con.query(sql,(err,result)=>{
       if(err) throw err;
       else{
         console.log(result);
       response.render('viewEmp',{'list':result});
          }
  });
});


app.get('/updateEmp',(request,response)=>{
  var eid=request.query.eid;
  var sql="select * from employee where eid="+eid;
  con.query(sql,(err,result)=>{
       if(err) throw err;
       else{
         console.log(result);
         response.render('viewOneEmp',{'emp':result});
          }
  });
});


app.post('/empInsert',(request,response)=>{
  var eid=request.body.eid;
var ename=request.body.ename;
var salary=request.body.salary;
var sql="insert into Employee values("+eid+",'"+ename+"',"+salary+")";
con.query(sql,(err,result)=>{
console.log(result)
     if(err) throw err;
     else
     response.render('createEmp',{'msg':'Data Inserted Successfully...'});
});
});

app.get('/deleteEmp',(request,response)=>{
  var eid=request.query.eid;
  var sql="delete from employee where eid='"+eid+"'";
  console.log(sql);
  con.query(sql,(err,result)=>{
       if(err) throw err;
       else
      {
        var sql="select * from employee";
        con.query(sql,(err,result)=>{
             if(err) throw err;
             else{
               console.log(result);
             response.render('viewEmp',{'list':result,'msg':'Data Deleted...'});
                }
        });

      }
  });
});


app.post('/empUpdateAction',(request,response)=>{
  var eid=request.body.eid;
var ename=request.body.ename;
var salary=request.body.salary;
var sql="update  Employee set ename='"+ename+"', salary="+salary+" where eid="+eid;
con.query(sql,(err,result)=>{
console.log(result)
     if(err) throw err;
     else{
            var sql="select * from employee";
            con.query(sql,(err,result)=>{
            if(err) throw err;
            else{
                  console.log(result);
                  response.render('viewEmp',{'list':result,'msg':'Data Updated...'});
               }
              });
          }
});
});
