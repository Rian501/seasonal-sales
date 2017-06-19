console.log("The JS is loaded", );
let productsRequest = new XMLHttpRequest();
let categoriesRequest = new XMLHttpRequest();

productsRequest.addEventListener("load", displayProducts);
categoriesRequest.addEventListener("load", displayCategories);

//provide for failure:
productsRequest.addEventListener("error", executeThisIfXHRFails);
categoriesRequest.addEventListener("error", executeThisIfXHRFails);
function executeThisIfXHRFails() {
  console.log("An error occurred while transferring the data");
}


productsRequest.open("GET", "data/products.json")
categoriesRequest.open("GET", "data/categories.json")

productsRequest.send();
categoriesRequest.send();

function displayProducts () {
	let prodArray = JSON.parse(event.target.responseText).products;

	console.log("products array", prodArray);
};

function displayCategories () {
	let categoryArray = JSON.parse(event.target.responseText).categories;
	console.log("Categories array", categoryArray);
};