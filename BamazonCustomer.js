const MYSQL = require('mysql'); 

//initializes connection to the MYSQL database 
const connection = MYSQL.createConnection({
	host: 'localhost', 
	port: 3306, 
	user: 'root',
	password: '',
	database:'bamazon_db' 
})

//displays if the connection is successful 
connection.connect((err)=>{

	if(err)console.error(err); 

	console.log("connected as id", connection.threadId); 
}); 


let 

// 		IT CREATES 
function post(item){
	var flavor = {item:item}; 

	connection.query('INSERT INTO products SET ?', flavor, (err,res)=>{

		if(err)console.error(err)
			
			
	})

}


// IT UPDATES 
function update(item){

	connection.query('UPDATE products SET ? WHERE ?', {item:item}, (err,res)=>{

		if(err)console.err(err); 

	})
}


//IT DELETES 

function delete(item){
	connection.query('DELETE FROM products WHERE ?', {item:item}, (err, res)=>{

		if(err)console.error(err); 

	 
	})
}


//IT READS 
let  get= () => {
		connection.query('SELECT * FROM flavors' ,(err,res)=>{
		var results = []

		if(err)console.err(err)
		
		results = res;


		results.filter((item)=>{
			console.log('Item '+item['item']); 

		}); 
	})
}


//ends the connection to the database
let endConnection = ()=>{

		connection.end(function(err) {
	  	if(err)console.error(err)

	  	console.log('connection terminated'); 

	});
}






