//constants 
const database = require('./connection.js'); 
const Table = require('cli-table2');
 

//PERFORMS A GET REQUEST TO THE DATABASE AND PRINTS OUT THE INFORMATION TO THE CLI  
let  getAllItems = function(table) {
		database.connection.query('SELECT * FROM '+ table ,(err,res)=>{
		
		if(err)console.err(err)
		//ties the response to the local variable results 
		let results = res;

		// initializes a new table and sets parameters 
		let table = new Table({
		    head: ['ID', 'Item-name', 'Department' ,'Price', 'Stock QTY'], 
		    colWidths: [5, 25, 25, 10 , 12]
		});


       //pushes the response obj items into the new table that was created 
		results.forEach((item) => {
			table.push(
	    	[ item.itemID, item.productName , item.departmentName , item.price , item.stockQuantity] 

			);
		})
 		
 		//prints out the table to the command line 
		console.log(table.toString());
		
	})
}; 


//ENDS THE CURRENT MYSQL CONNECTION 
let endConnection = function() {

		database.connection.end(function(err) {
	  	
	  	if(err) throw err; 

	  	console.log('connection terminated'); 

	});
}; 


//MAIN 
getAllItems('products'); 





