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
        if (topping === "sweet-potatoes" || topping === "salmon") {
            total += 5;
        } else if (topping === "ham" || topping === "pineapple") {
            total += 4;
        } else {
            total += 3;
        }
    });
}

Pizza.prototype.getPrice = function() {
    var priceOfSize = convertSizeToPrice(this.size);
    var priceOfToppings = getPriceOfToppings(this.toppings);
    var totalPrice = priceOfSize + priceOfToppings;
    return totalPrice;
};

$(document).ready(function() {
    $(".makeOrder").submit(function(event) {
        event.preventDefault();
        var pizzaOrder = new Pizza("input[name='size']:checked").val();
    })
});