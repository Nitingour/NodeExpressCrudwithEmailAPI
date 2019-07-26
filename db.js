var mysql=require('mysql');
var con=mysql.createConnection({
  host:'localhost',
  port:'3307',
  user:'root',
  password:'root',
  database:'Emsdb'
});
con.connect(function(err){ //Anonymous function
    if(err) throw err;  //exception handling
    else
    console.log("MySQL Database connected Successfully");
});
//var sql="insert into employee values(102,'Sumit',12000.00)";
/*var sql="select * from login ";
con.query(sql,(err,result)=>{
     if(err) throw err;
     else
       console.log(result);
});
*/
module.exports=con;
