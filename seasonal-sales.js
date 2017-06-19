console.log("The JS is loaded", );


(function getProducts() {
	let productsRequest = new XMLHttpRequest();
	productsRequest.open("GET", "data/products.json")
	productsRequest.send();
	productsRequest.addEventListener("load", displayProducts)
	productsRequest.addEventListener("error", executeThisIfXHRFails);
}());

(function getCategories () {
	let categoriesRequest = new XMLHttpRequest();
	categoriesRequest.open("GET", "data/categories.json")
	categoriesRequest.send();
	categoriesRequest.addEventListener("load", displayCategories);
	categoriesRequest.addEventListener("error", executeThisIfXHRFails);
}());

function displayProducts () {
	let prodArray = JSON.parse(event.target.responseText).products;
	console.log("products array", prodArray);
};

function displayCategories () {
	let categoryArray = JSON.parse(event.target.responseText).categories;
	console.log("Categories array", categoryArray);
};

//provide for failure:
function executeThisIfXHRFails() {
  console.log("An error occurred while transferring the data");
}

let outputDiv = document.getElementById('output');

function productCard () {
	prodArray.forEach
}


