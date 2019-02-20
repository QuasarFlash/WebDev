var http = require('http')
var express = require('express');
var bodyparser = require('body-parser');
var req = require('request');
var fs = require('fs');
var app = express();
var hostname = "localhost";
var port = 8080;
var path = ".";
var mysql = require('mysql');
app.use(express.static(path));
var key = fs.readFileSync('../Sqlkey','utf8').toString().split("\n");
var con = mysql.createConnection({
  host: "localhost",
  user: key[0],
  password: key[1],
  database: "Home5"
});


con.connect(function(err) {
  if (err) {
    console.log("Error connecting to database");
  }
  else {
    console.log("Database successfully connected");
  }
});

app.get('/', function(req,res){
    console.log("I am Here.");
    res.sendFile("rab378_HW5.html", { root: __dirname });
    
});
app.get("/load", function(req,res){
/*load in dropdown data for studentid and term */
  console.log("Load Drops");
  var IDdata =[];
  var Termdata = [];
  con.query("SELECT DISTINCT studentId FROM STUDENT",
    function(err,rows,fields) {
      if (err){
        console.log('Error Load Student during query processing');
      }
      else{
        console.log("Load Student Drop");
        for (var i = 0; i < rows.length; i++) {
          IDdata.push(rows[i].studentId);
        }
      }
  });
    con.query("SELECT DISTINCT term FROM GRADES",
    function(err,rows,fields) {
      if (err){
        console.log('Error Load Grade during query processing');
      }
      else{
        console.log("Load Grade Drop");
        for (var i = 0; i < rows.length; i++) {
          Termdata.push(rows[i].term);
        }
      }
      var json = {Ids: IDdata,terms: Termdata };
      res.write(JSON.stringify(json));
      res.end();
  });
});
app.get("/student", function(req, res) {
  /*Student table data*/
  con.query("SELECT * FROM STUDENT",
    function(err,rows,fields) {
      if (err){
        console.log('Error during query processing');
      }
      else{
        console.log("Student");
        var Student = [["Student ID","First Name","Last Name",
                        "Birth Date","Major"]];
        var data = [];

          for (var i = 0; i < rows.length; i++) {
            data.push(rows[i].studentId, rows[i].firstname, 
                      rows[i].lastname, rows[i].birthdate, 
                      rows[i].major);
            Student.push(data);
            data = [];
          }
          /*Create table of data and sent to client*/
          var StuTable = createTable(Student);
          res.write(""+StuTable); 
          res.end();
      }
  });
});

app.get("/grades", function(req, res) {
  /*Grade table data*/
  con.query("SELECT * FROM GRADES",
    function(err,rows,fields) {
      if (err){
        console.log('Error during query processing');
      }
      else{
        console.log("Grades");
        var Grades = [["Course ID","Student ID","Term","Grade"]];
        var data = [];

          for (var i = 0; i < rows.length; i++) {
            data.push(rows[i].courseId, rows[i].studentId, 
                      rows[i].term, rows[i].grade);
            Grades.push(data);
            data = [];
          }
          /*Create table of data and sent to client*/
          var GraTable = createTable(Grades);
          res.write(""+GraTable); 
          res.end();
      }

  });
});
app.get("/course", function(req, res) {
  /* Course table data*/
  con.query("SELECT * FROM COURSE",
    function(err,rows,fields) {
      if (err){
        console.log('Error during query processing');
      }
      else{
        console.log("Course");
        var Course = [["Course ID","Course Description"]];
        var data = [];

          for (var i = 0; i < rows.length; i++) {
            data.push(rows[i].courseId, rows[i].courseDesc);
            Course.push(data);
            data = [];
          }
          /*Create table of data and sent to client*/
          var CourTable = createTable(Course);
          res.write(""+CourTable); 
          res.end();
      }

  });
});

app.get("/trans", function(req, res) {
  /*Determine if client side data is empty and populate table with everything*/
  var Term = " and GRADES.term= "+"\""+req.query.Term+"\"";
  var Student = " and STUDENT.studentId="+"\""+req.query.Student+"\"";
  if(req.query.Student == "None"){
    Student = "";
  }
  if(req.query.Term == "None"){
    Term = "";
  }
  var SqlQuery = "SELECT DISTINCT STUDENT.studentId,STUDENT.firstname,"+
                 "STUDENT.lastname,GRADES.term,COURSE.courseId,"+
                 "COURSE.courseDesc,GRADES.grade FROM STUDENT,COURSE,GRADES "+
                 "where GRADES.studentId=STUDENT.studentId and "+
                 "COURSE.courseId=GRADES.courseId"+ Student + Term;
  

  con.query(SqlQuery,
      function(err,rows,fields) {
      if (err){
        console.log('Error Trans during query processing');
      }
      else{
        console.log("Transcript");
        var Trans = [["Student ID","First Name","Last Name",
                      "Term/Year","Course ID","Description", "Grade"]];
        var data = [];
          for (var i = 0; i < rows.length; i++) {
            data.push(rows[i].studentId, rows[i].firstname, 
            rows[i].lastname, rows[i].term,rows[i].courseId, 
            rows[i].courseDesc, rows[i].grade);
            Trans.push(data);
            data = [];
          }
          /*Create table of data and sent to client*/
          var TransTable = createTable(Trans);
          res.write(""+TransTable); 
          res.end();
      }

  });
});
app.listen(port, function(){
    console.log("SQL Homework Server Started...");
});

function createTable(TableData){
		    /*Create a table from the given input of 
		    Table Header and Data in  array form */
			var fullTableBody ="";
			var dataTable ="<tbody><tr>";
			var header ="<thead><tr>";
			var i = 0;
			var j = 0;
			var datapriority=1;
			for( i = 0; i < TableData[0].length; i++){
			    
				header += "<th data-priority="+ datapriority +">"+ 
				          TableData[0][i] + "</th>";
				datapriority+=1;
			}
			header += "</tr></thead>";
			fullTableBody += header;
			for(i = 1; i < TableData.length; i++){
				dataTable = "<tr>";
				for(j = 0; j < TableData[i].length; j++){
					dataTable+= "<td>" + TableData[i][j] + "</td><br>";
				}
				dataTable += "</tr><br>";
				fullTableBody += dataTable;
			}
			fullTableBody += "</tbody>";
			return fullTableBody;
			
		}
