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
}
