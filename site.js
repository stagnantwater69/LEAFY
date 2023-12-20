// dis for popup card sht
// it actually fuckin works i wanna cry

let previewContainer = document.querySelector('.products-preview');
let previewBox = previewContainer.querySelectorAll('.preview');

// menu category popup
document.querySelectorAll('.detail-wrapper .detail-card').forEach(detailCard =>{
    detailCard.onclick = () =>{
        previewContainer.style.display = 'flex';
        let name = detailCard.getAttribute('data-name');
        previewBox.forEach(preview =>{
           let target = preview.getAttribute('data-target');
            if(name == target){
                preview.classList.add('active');
            }
        });
    };
});


//recommended popup
document.querySelectorAll('.highlight-wrapper .highlight-card').forEach(detailCard =>{
    detailCard.onclick = () =>{
        previewContainer.style.display = 'flex';
        let name = detailCard.getAttribute('data-name');
        previewBox.forEach(preview =>{
           let target = preview.getAttribute('data-target');
            if(name == target){
                preview.classList.add('active');
            }
        });
    };
});
//para mo close and pop up
previewBox.forEach(close =>{
    close.querySelector('.fa-times').onclick = () =>{
        close.classList.remove('active');
        previewContainer.style.display = 'none';
    };
})
        
        //the orders will bes save
        window.onload = function () {
            loadCartFromStorage();
            updateCartDisplay();
        }
        
        //rene de add to carts
        let cart = [];
        let total = 0;
        
        
        function addToCart(productName, price, quantity = 1, addToSummary = true) {
            console.log(`Adding ${productName} to cart at ${price} PHP`);
        
            const existingItemIndex = cart.findIndex(item => item.name === productName);
        
            if (existingItemIndex !== -1) {
                
                cart[existingItemIndex].quantity += quantity;
                console.log(`Incrementing quantity for ${productName} in cart`);
            } else {
              
                cart.push({ name: productName, price: price, quantity: quantity });
                console.log(`Adding ${productName} to cart for the first time`);
            }
        

            total += price * quantity;
        
           
            updateCartDisplay();
        
            saveCartToStorage();
        
          
            if (addToSummary) {
                addToOrderSummary(productName, price, quantity);
            }
        }

        function addToCart(productName, price, quantity = 1, addToSummary = true) {
            console.log(`Adding ${productName} to cart at ${price} PHP`);
        
            const existingItemIndex = cart.findIndex(item => item.name === productName);
        
            if (existingItemIndex !== -1) {
                cart[existingItemIndex].quantity += quantity;
                console.log(`Incrementing quantity for ${productName} in cart`);
            } else {
                cart.push({ name: productName, price: price, quantity: quantity });
                console.log(`Adding ${productName} to cart for the first time`);
            }
        
            total += price * quantity;
        
            updateCartDisplay();
        
            saveCartToStorage();
        
            if (addToSummary) {
                addToOrderSummary(productName, price, quantity); // Pass the correct quantity here
            }
        }

       
        function removeFromCart(index) {
            console.log(`Removing one quantity of item at index ${index} from cart`);
            const currentItem = cart[index];

            if (currentItem.quantity > 1) {
                
                currentItem.quantity -= 1;
                total -= currentItem.price;
            } else {
               
                cart.splice(index, 1);
                total -= currentItem.price * currentItem.quantity;
            }

            updateCartDisplay();
            saveCartToStorage();
        }

        function removeAllFromCart() {
            console.log('Removing all items from cart');
            cart = [];
            total = 0;
            updateCartDisplay();
            saveCartToStorage();
        }

        function buyNow(productName, productPrice, isBuyNow)  {
                     
            const existingProductIndex = cart.findIndex(item => item.name === productName);

            if (existingProductIndex !== -1) {
                
                if (!isBuyNow) {
                    cart[existingProductIndex].quantity += 1;
                }
            } else {
                
                addToCart(productName, productPrice, 1);
            }

            if (isBuyNow) {
                
                window.location.href = "checkout.html";
            }

           
            updateCartDisplay();
        }


        

        function updateCartDisplay() {
            console.log('Updating cart display');
            const cartListElement = document.getElementById('cart-list');
            const cartTotalElement = document.getElementById('cart-total');
            const cartCounterElement = document.getElementById('cart-counter');

            const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

            cartCounterElement.textContent = totalQuantity;
            cartListElement.innerHTML = '';

            cart.forEach((item, index) => {
                const listItem = document.createElement('li');
                listItem.className = 'cart-list-item';
                listItem.textContent = `${item.name} - ${item.price.toFixed(2)} PHP x${item.quantity}`;

                const quantityControl = document.createElement('div');
                quantityControl.className = 'quantity-control';

                const quantityArrowUp = document.createElement('span');
                quantityArrowUp.className = 'quantity-arrow';
                quantityArrowUp.innerHTML = '&uarr;';
                quantityArrowUp.onclick = () => addToCart(item.name, item.price);

                const quantityArrowDown = document.createElement('span');
                quantityArrowDown.className = 'quantity-arrow';
                quantityArrowDown.innerHTML = '&darr;';
                quantityArrowDown.onclick = () => removeFromCart(index);

                quantityControl.appendChild(quantityArrowUp);
                quantityControl.appendChild(quantityArrowDown);

                listItem.appendChild(quantityControl);
                cartListElement.appendChild(listItem);

                console.log(`Displaying ${item.name} x${item.quantity} in cart`);
            });

            const updatedTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            cartTotalElement.textContent = updatedTotal.toFixed(2) + ' PHP';
            console.log(`Updated total: ${updatedTotal.toFixed(2)} PHP`);
        }

        function toggleCart() {
            console.log('Toggling cart visibility');
            const cartItemsElement = document.getElementById('cart-items');
            cartItemsElement.style.display = cartItemsElement.style.display === 'none' ? 'block' : 'none';
        }

        function saveCartToStorage() {
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        function loadCartFromStorage() {
            const storedCart = localStorage.getItem('cart');
            cart = storedCart ? JSON.parse(storedCart) : [];
        }
        
        function checkout() {
            
            const cartDataString = JSON.stringify(cart);
        
           
            const encodedCartData = encodeURIComponent(cartDataString);
        
            const checkoutURL = `checkout.html?cart=${encodedCartData}`;
        
            window.location.href = checkoutURL;
        }

        function changeQuantity(productName, productPrice, change)  {
            const quantityElement = document.getElementById(`quantity-${productName}`);
            let currentQuantity = parseInt(quantityElement.textContent);
           
            if (change === -1 && currentQuantity === 1) {
                return;
            }
          
            currentQuantity += change;
            quantityElement.textContent = currentQuantity;
            
            
            addToCart(productName, productPrice, change);
            
            updateCartDisplay();
        }




  