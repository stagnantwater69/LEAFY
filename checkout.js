
const storedCart = localStorage.getItem("cart");
if (storedCart) {
    
    const cart = JSON.parse(storedCart);

    const orderSummaryList = document.getElementById("order-summary-list");
    let orderTotal = 0;

    cart.forEach(product => {
        const listItem = document.createElement("li");
        listItem.textContent = `${product.name} - ${product.price.toFixed(2)} PHP x ${product.quantity}`;

        orderSummaryList.appendChild(listItem);
        orderTotal += product.price * product.quantity;
    });

    const orderTotalElement = document.getElementById("order-summary-total");
    orderTotalElement.textContent = orderTotal.toFixed(2) + " PHP";
}

function toggleCardPaymentDetails() {
    var cardPaymentDetails = document.getElementById('card-payment-details');
    var cashOnDelivery = document.getElementById('cash-on-delivery');

  
    if (cashOnDelivery.checked) {
        cardPaymentDetails.style.display = 'none';
    } else {
        
        cardPaymentDetails.style.display = 'block';
    }
}

function showModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'block';

    
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

}

document.addEventListener('DOMContentLoaded', function () {
   
    const form = document.querySelector('form');
            form.addEventListener('submit', function (event) {
                event.preventDefault();

    clearCart();

    showModal();
    });
});

function clearCart() {
   
    localStorage.removeItem("cart");

   
    const orderSummaryList = document.getElementById("order-summary-list");
    const orderTotalElement = document.getElementById("order-summary-total");
    orderSummaryList.innerHTML = '';
    orderTotalElement.textContent = "0.00 PHP";

    
    const cartProducts = document.getElementById("cart-products");
    cartProducts.style.display = 'none';
}


function updateOrderSummary() {
    const storedOrder = localStorage.getItem("order");

    if (storedOrder) {
        const order = JSON.parse(storedOrder);
        const orderSummaryList = document.getElementById("order-summary-list");
        let orderTotal = 0;

        orderSummaryList.innerHTML = '';

        order.forEach(product => {
            const listItem = document.createElement("li");
            listItem.textContent = `${product.name} - ${product.price.toFixed(2)} PHP x ${product.quantity}`;
            orderSummaryList.appendChild(listItem);
            orderTotal += product.price * product.quantity;
        });

        const orderTotalElement = document.getElementById("order-summary-total");
        orderTotalElement.textContent = orderTotal.toFixed(2) + " PHP";
    } else {
        const orderTotalElement = document.getElementById("order-summary-total");
        orderTotalElement.textContent = "0.00 PHP";
    }
}
