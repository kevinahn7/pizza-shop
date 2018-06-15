//Business Logic
function Pizza(size, toppings) {
    this.size = size;
    this.toppings = toppings;
}

function convertSizeToPrice(size) {
    if (size === "small") {
        return 7;
    }
    else if (size === "medium") {
        return 11;
    }
    else {
        return 14;
    }
}

function getPriceOfToppings(toppings) {
    var total = 0;
    toppings.forEach(topping => {
        if (topping === "sweet potatoes" || topping === "salmon") {
            total += 5;
        } else if (topping === "ham" || topping === "pineapple") {
            total += 4;
        } else {
            total += 3;
        }
    });
    return total;
}

Pizza.prototype.getPrice = function() {
    var priceOfSize = convertSizeToPrice(this.size);
    var priceOfToppings = getPriceOfToppings(this.toppings);
    var totalPrice = priceOfSize + priceOfToppings;
    return totalPrice;
};

Pizza.prototype.getToppingsPhrase = function() {
    if (this.toppings.length > 1) {
        var firstToppings = this.toppings.splice(0, this.toppings.length - 1);
        var lastTopping = this.toppings.pop();
        var firstToppingsBeforeAnd = ""
        var firstToppingsRest = firstToppings.splice(0, firstToppings.length - 1);
        var firstToppingsLastOneBeforeAnd = firstToppings.pop();
        firstToppingsRest.forEach(topping => {
            firstToppingsBeforeAnd += topping + ", ";
        });
        var phrase = firstToppingsBeforeAnd + firstToppingsLastOneBeforeAnd + " and " + lastTopping;
        return phrase;
    } 
    else if (this.toppings.length === 1) {
        return this.toppings;
    } else {
        return "absolutely nothing on it"
    }
}

//User Interface Logic
$(document).ready(function() {
    $(".makeOrder").submit(function(event) {
        event.preventDefault();
        $(".photo").show();
        $(".again").show();
        var sizeofPizza = $("input:radio[name='size']:checked").val();
        var toppingsOfPizza = [];
        $("input:checkbox[name='toppings']:checked").each(function(){
            var individualToppings = $(this).val();
            toppingsOfPizza.push(individualToppings);
          });
        var pizzaOrder = new Pizza(sizeofPizza, toppingsOfPizza)
        var finalPrice = pizzaOrder.getPrice();
        var toppingsPhrase = pizzaOrder.getToppingsPhrase();
        $(".results").text("Your " + pizzaOrder.size + " pizza with " + toppingsPhrase + " will be only $" + finalPrice + " dollars total. Don't worry, we are already on our way!");

    })
});