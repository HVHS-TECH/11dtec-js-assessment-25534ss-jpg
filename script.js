function addItem(name,price){
    var cart=JSON.parse(localStorage.getItem("cart"));

    if(cart==null){
        cart=[];
    }

    var found=false;

    for(var i=0;i<cart.length;i++){

        if(cart[i].name==name){

            cart[i].quantity++;
            found=true;

        }

    }

    if(found==false){

        cart.push({
            name:name,
            price:price,
            quantity:1
        });

    }

    localStorage.setItem("cart",JSON.stringify(cart));

    updateCartCount();

    alert(name+" added to cart!");
}

function filterProducts(selectedFilter) {
    const cards = document.querySelectorAll('.grid .card');

    cards.forEach(card => {
        const cardTypes = card.getAttribute('data-type');

        if (selectedFilter === 'all' || cardTypes.includes(selectedFilter)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}


function showCart(){

    var cart=JSON.parse(localStorage.getItem("cart"));

    if(cart==null){
        return;
    }

    var output="";
    var total=0;

    for(var i=0;i<cart.length;i++){

        var itemTotal=cart[i].price*cart[i].quantity;

        output+="<div class='cart-item'>";
        output+="<span>"+cart[i].name+" x"+cart[i].quantity+"</span>";
        output+="<span>$"+itemTotal.toFixed(2)+"</span>";
        output+="</div>";

        total+=itemTotal;

    }

    if(document.getElementById("cartItems")){

        document.getElementById("cartItems").innerHTML=output;

    }

    if(document.getElementById("total")){

        document.getElementById("total").innerHTML=total.toFixed(2);

    }

}


function updateCartCount(){

    var cart=JSON.parse(localStorage.getItem("cart"));

    var count=0;

    if(cart!=null){

        for(var i=0;i<cart.length;i++){

            count+=cart[i].quantity;

        }

    }

    if(document.getElementById("navCount")){

        document.getElementById("navCount").innerHTML=count;

    }

}


function clearCart(){

    localStorage.removeItem("cart");

    location.reload();

}


function giveReceipt(){

    var cart=JSON.parse(localStorage.getItem("cart"));

    if(cart==null||cart.length==0){

        alert("Cart is empty.");

        return;

    }

    var receipt="Krish's Kingdom of Artifacts\n\n";
    var total=0;


    for(var i=0;i<cart.length;i++){

        var itemTotal=cart[i].price*cart[i].quantity;

        receipt+=cart[i].name+" x"+cart[i].quantity+" - $"+itemTotal.toFixed(2)+"\n";

        total+=itemTotal;

    }


    receipt+="\nTotal: $"+total.toFixed(2);

    alert(receipt);

}
function checkGame(){

    var cart=JSON.parse(localStorage.getItem("cart"));

    var amount=0;


    if(cart!=null){

        for(var i=0;i<cart.length;i++){

            amount+=cart[i].quantity;

        }

    }


    if(amount>=6){

        if(document.getElementById("gameButton")){

            document.getElementById("gameButton").style.display="block";

        }

    }

}

function startGame(){
    var score=0;

    while(score<2){
        var guess=prompt("Ancient Artifact Trial\nGuess the number 1-5");
        var answer=Math.floor(Math.random()*5)+1;

        if(Number(guess)==answer){
            score++;
            alert("Correct "+score+"/2");
        }
        else{
            alert("Wrong");
        }
    }

    if(score==2){
        jumpscare();
    }
}

function jumpscare() {
    var scare = document.createElement("div");
    scare.id = "scare";

    scare.innerHTML = "<video width='100%' height='100%' autoplay src='drdonut.mp4'></video>" + 
                      "<button onclick='goBack()' style='position:absolute; bottom:20px;'>Leave Artifact</button>";
    
    document.body.appendChild(scare);
}


function goBack(){
    window.location.href="index.html";
}
showCart();
updateCartCount();
checkGame();