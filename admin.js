
// IT UPDATES 
let update = function(item){

	connection.query('UPDATE products SET ? WHERE ?', {item:item}, (err,res)=>{

		if(err)console.err(err); 

	})
}


// IT DELETES 
let del = function(item){
	connection.query('DELETE FROM products WHERE ?', {item:item}, (err, res)=>{

		if(err)console.error(err); 

	 
	})
}



// IT CREATES 
let post = function(item) {
	var flavor = {item:item}; 

	connection.query('INSERT INTO products SET ?', flavor, (err,res)=>{

		if(err)console.error(err)
			
			
	})

}

