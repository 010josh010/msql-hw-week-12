//constants 
const database = require('./connection.js'); 
const Table = require('cli-table2');
const inquirer = require('inquirer'); 



//DISPLAYS THE ITEM TABLE TO THE COMMAND LINE 
let displayItem = function(item){ 

		let table = new Table({
		    head: ['ID', 'Item-name', 'Department' ,'Price', 'Stock QTY'], 
		    colWidths: [5, 25, 25, 10 , 12]
		});

		//adds thet items information into the table 
		table.push(
	    	[ item.itemID, item.productName , item.departmentName , item.price , item.stockQuantity] 

			);

		//prints out the table to the command line 
		console.log(table.toString());


};

// //UPDATES THE DATABASE AND INFORMS THE USER THAT THIER PRODUCT HAS ORDERED!; 
let processOrder = function(item , qty){

	console.log('processing order...'); 

	let adjustedQty = item.stockQuantity - qty; 

	database.connection.query('UPDATE products SET ? WHERE ?',[{stockQuantity:adjustedQty }, {itemID:item.itemID}], (err,res)=>{

		if(err) {
			throw err ; 
		} else{

			/*sets the items qty to the adjusted qty for sending to display item. Another sql query would be needed if 
			multiple users were using the app */
			item.stockQuantity = adjustedQty; 

			//call to display the item in a table view 
			displayItem(item); 

			console.log('order successful:','Qty:'+ qty , item.productName ,'Total: $'+ item.price * qty);
			
		}; 

	});
};


//PERFORMS A GET REQUEST TO THE DATABASE FOR ALL ITEMS AND STARTS A NEW ORDER PROMPT
let  newOrder = function(table) {
		database.connection.query('SELECT * FROM '+ table ,(err,res)=>{
		
		if(err) throw err;  
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


		//initializes prompt to ask for the customers product and qty 
		inquirer.prompt([
			{
				type:'input',
				name:'id', 
				message:'Enter the item id of what you\'d like to buy'
			} ,

			{
				type:'input', 
				name:'qty', 
				message: 'Please enter the qty you\'d like to purchase'
			}

			])
				.then(function(entry){
					//sets the item  based on the selected id from the user 
					let item = results.filter((item) => entry.id === item.itemID.toString())[0];  
					
					//checks qty  , returns sold out to the console if the qty is 0 
					if(item.stockQuantity === 0){

						let message = 'Sorry , product is sold out!'; 

						console.log(message); 

						//restarts the order menu 
						newOrder('products');  
					}
					else if(entry.qty > item.stockQuantity ){

						let message = 'Insufficient quantity! Only '+item.stockQuantity +' left in stock'; 

						console.log(message); 

						//restarts the order menu 
						newOrder('products');  

					//call to process the order after the item is confirmed to be in stock 
					}else{

						processOrder(item, entry.qty); 

					}

				}); 

	});
}; 


//ENDS THE CURRENT MYSQL CONNECTION 
let endConnection = function() {

		database.connection.end(function(err) {
	  	
	  	if(err) throw err; 

	  	console.log('connection terminated'); 

	});
}; 


//MAIN 
newOrder('products'); 








