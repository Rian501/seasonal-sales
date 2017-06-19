let productsRequest = new XMLHttpRequest();
let categoriesRequest = new XMLHttpeRequest();

productsRequest.addEventListener("load", );
categoriesRequest.addEventListener("load", )

//provide for failure:
productsRequest.addEventListener("error", executeThisIfXHRFails);
categories.Request.addEventListener("error", executeThisIfXHRFails);
function executeThisIfXHRFails() {
  console.log("An error occurred while transferring the data");
}