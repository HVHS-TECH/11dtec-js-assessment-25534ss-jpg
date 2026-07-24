function addItem(name, price) {
    var cart = localStorage.getItem("cart");

    if (cart == null) {
        cart = "";
    }

    cart += name + "," + price + "\n";

    localStorage.setItem("cart", cart);

    updateCartCount();

    alert(name + " added to cart!");
}


function showCart() {
    var cart = localStorage.getItem("cart");

    if (cart == null) {
        return;
    }

    var items = cart.split("\n");
    var output = "";
    var total = 0;

    for (var i = 0; i < items.length; i++) {

        if (items[i] != "") {

            var info = items[i].split(",");
            output += "<div class='cart-item'>";
            output += "<span>" + info[0] + "</span>";
            output += "<span>$" + Number(info[1]).toFixed(2) + "</span>";
            output += "</div>";

            total += Number(info[1]);
        }
    }

    if (document.getElementById("cartItems")) {
        document.getElementById("cartItems").innerHTML = output;
    }

    if (document.getElementById("total")) {
        document.getElementById("total").innerHTML = total.toFixed(2);
    }
}


function clearCart() {
    localStorage.removeItem("cart");
    location.reload();
}


function checkout() {

    var email = document.getElementById("customerEmail").value;

    if (email == "") {
        alert("Please enter your email.");
        return;
    }

    var cart = localStorage.getItem("cart");

    if (cart == null || cart == "") {
        alert("Your cart is empty.");
        return;
    }

    var items = cart.split("\n");
    var receipt = "";
    var total = 0;

    for (var i = 0; i < items.length; i++) {

        if (items[i] != "") {

            var info = items[i].split(",");

            receipt += info[0] + " - $" + info[1] + "\n";

            total += Number(info[1]);
        }
    }


    var templateParams = {
    email: email,
    orders: receipt,
    order_id: "001",
    name: "Artifacts",
    price: total.toFixed(2),
    units: "1"
};

    emailjs.send(
        "service_ab12345",
        "template_zqfaon5",
        templateParams
    )
    .then(function() {

        alert("Receipt sent! Thank you for your purchase.");

        clearCart();

    })
    .catch(function(error) {

        console.log(error);

        alert("Receipt failed to send.");

    });
}


function updateCartCount() {

    var cart = localStorage.getItem("cart");

    if (cart == null) {
        cart = "";
    }

    var items = cart.split("\n");
    var count = 0;

    for (var i = 0; i < items.length; i++) {

        if (items[i] != "") {
            count++;
        }
    }


    if (document.getElementById("navCount")) {
        document.getElementById("navCount").innerHTML = count;
    }
}


var filter = "all";


function filterProducts(type) {

    filter = type;

    searchProducts();

}


function searchProducts() {

    var text = "";

    if (document.getElementById("search")) {

        text = document
            .getElementById("search")
            .value
            .toLowerCase();

    }


    var products = document.querySelectorAll(".card");


    for (var i = 0; i < products.length; i++) {

        var name = products[i]
            .querySelector("h3")
            .innerText
            .toLowerCase();


        var category = products[i].getAttribute("data-type");


        var searchMatch = name.includes(text);


        var filterMatch =
            filter == "all" ||
            category.includes(filter);


        if (searchMatch && filterMatch) {

            products[i].style.display = "block";

        } else {

            products[i].style.display = "none";

        }
    }
}


if (document.getElementById("search")) {

    document
        .getElementById("search")
        .addEventListener("keyup", function() {

            searchProducts();

        });

}
function calculateBalance(){

    var payment = Number(document.getElementById("paymentAmount").value);

    var total = Number(document.getElementById("total").innerHTML);


    if(payment <= 0){

        alert("Enter a valid amount.");

        return;

    }


    var balance = payment - total;


    if(balance < 0){

        document.getElementById("balance").innerHTML =
        "You still owe: $" + Math.abs(balance).toFixed(2);

    }

    else{

        document.getElementById("balance").innerHTML =
        "Your balance is: $" + balance.toFixed(2);

    }

}

showCart();
updateCartCount();