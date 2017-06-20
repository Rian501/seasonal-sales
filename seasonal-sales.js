(function getProducts() {
	let productsRequest = new XMLHttpRequest();
	productsRequest.open("GET", "data/products.json")
	productsRequest.send();
	productsRequest.addEventListener("load", setProducts)
	productsRequest.addEventListener("error", executeThisIfXHRFails);
}());

function getCategories () {
	let categoriesRequest = new XMLHttpRequest();
	categoriesRequest.open("GET", "data/categories.json")
	categoriesRequest.send();
	categoriesRequest.addEventListener("load", setCategories);
	categoriesRequest.addEventListener("error", executeThisIfXHRFails);
};

//keep this outside so it doesn't repeat and reach in every time in the repetetive map function
let productWrapperDiv = document.getElementById('product-wrapper');

function displayProducts(productArray) {
	let cardArray = productArray.map( function(product) {
		return buildCard(product);
		})
	console.log("product card array?", cardArray);
	cardArray.forEach( function(card){
//create an HTML element, then inject card string into that dom element, then append that new element to the DOM with the card in it
	let cardWrapper = document.createElement("article");
	cardWrapper.innerHTML = card;
	productWrapperDiv.appendChild(cardWrapper);
	})
}

function buildDOMObj() {
	// loop through products AND categories and make a new set of objects grabbing the prod name and dept and price and season/catID
	//use MAP to make us an array
	let productArr = products.map( function(currentProduct) {
		//inside this loop we need to loop again but this time through the categories array only to find the one category object whose id matches the category-id of the currentProduct. Maybe a .filter()?
		//that returned array will contain one object. we can set 'dept' on the new object we are making with the 'name' property of that one object.
		let categoryItem = categories.filter (function(category) {
			return category.id === currentProduct.category_id;
		})
		let prodObj = {
			dept: categoryItem[0].name,
			name: currentProduct.name,
			price: currentProduct.price,
			catId: currentProduct.category_id
		}
		return prodObj
	});
	displayProducts(productArr);
}

let products = null;
let categories = null;
function setProducts () {
	products = JSON.parse(event.target.responseText).products;
	getCategories();
};

function setCategories () {
	categories = JSON.parse(event.target.responseText).categories;
	buildDOMObj();
};

//provide for failure:
function executeThisIfXHRFails() {
  console.log("An error occurred while transferring the data");
}



// loop
	function buildCard (prodObj) {
		let card = 	`
			<div class="prodCard">
				<h2>${prodObj.name}</h2>
				<h3>${prodObj.dept}</h3>
				<p>$${prodObj.price}</p>
			</div>
		`;
		return card;
	}
//endloop

// let tempObj = {name: "Furby", dept: "toys", price: 40.00}
// console.log("card", buildCard(tempObj));



//this happens before the load event triggers the rest of the shit
console.log("can I see?", products);