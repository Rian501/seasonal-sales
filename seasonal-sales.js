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



function buildDOMObj() {
	let productArr = products.map( function(currentProduct) {
		let categoryItem = categories.filter (function(category) {
			return category.id === currentProduct.category_id;
		})
		let prodObj = {
			dept: categoryItem[0].name,
			name: currentProduct.name,
			price: currentProduct.price,
			catId: currentProduct.category_id,
			discountedPrice: calculateDiscountPrice(currentProduct.price,categoryItem[0].discount)
		}
		return prodObj
	});
	displayProducts(productArr);
}


// loops because it is called in a map method
	function buildCard (prodObj) {
		let card = 	`
			<div class="prodCard" data-catId=${prodObj.catId}>
				<h2>${prodObj.name}</h2>
				<h3>${prodObj.dept}</h3>
				<p>$${prodObj.price}</p>
				<p class="isHidden">$${prodObj.discountedPrice}</p>
			</div>
		`;
		return card;
	}
//endloop

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


function calculateDiscountPrice(origPrice, discountAmt) {
	//if you put a plus sign in front of a number-string, it turns it into a number
	return +(origPrice * (1.00-discountAmt)).toFixed(2);
	//do the calc, make it 2-decimal, turn into number
}



document.getElementById('season-selector').addEventListener("change", function() {
	let selectedSeason = event.target.value;
	let seasonCategory = categories.filter( function(category) {
		return category.season_discount.toLowerCase() === selectedSeason.toLowerCase()
	});
	let catId = seasonCategory[0].id
	//grab all the product cards from the DOM
	let prodCards = document.getElementsByClassName("prodCard")
	//can't run forEach on DOM collections
	for (let i=0; i<prodCards.length; i++) {
		if (parseInt(prodCards[i].getAttribute("data-catId")) === catId){
			let pTags = prodCards[i].getElementsByTagName('p');
			for (let i=0; i< pTags.length; i++){
				pTags[i].classList.toggle("isHidden");
			}
		}
	}
});

