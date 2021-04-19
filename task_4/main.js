(function(){
    let products    = document.querySelector(".products"),
        cart        = document.querySelector(".cart"),
        cart_products_amount = document.querySelector('.cart-products-amount'),
        cart_products_price = document.querySelector('.cart-products-price');

    let productsList    = JSON.parse(localStorage.getItem('productsList')) || [];
    let cartList        = JSON.parse(localStorage.getItem('cartList')) || [];

    products.addEventListener('click', function (event) {
        let target = event.target.dataset.index;
        addToCart(target);
    });

    cart.addEventListener('click', function (event) {
        let target = event.target;
        switch(target.dataset.action) {
            case 'plus':
                for (let item of cartList) {
                    if(item.id.toString() === target.dataset.index) {
                        addToCart(target.dataset.index);
                    }
                }
                break;
            case 'minus':
                for (let item of cartList) {
                    if(item.id.toString() === target.dataset.index) {
                        removeFromCart(target.dataset.index);
                    }
                }
                break;
            default:
                console.log('RUN DEFAULT ACTION');
                break;
        }
    });

    function removeFromCart(target) {
        for(let item of productsList) {
            if(item.id.toString() === target) {
                for (let cartItem of cartList) {
                    if(cartItem.id === item.id) {
                        cartItem.price -= item.price;
                        cartItem.count -= 1;
                        item.available += 1;
                        saveData();
                    }
                }
            }
        }
    }

    function addToCart(target) {
        let flag = true;
        for(let item of productsList) {
            if(item.id.toString() === target) {
                for (let cartItem of cartList) {
                    if(item.available === 0) {
                        flag = false;
                        break;
                    }
                    if(cartItem.id === item.id) {
                        cartItem.price += item.price;
                        cartItem.count += 1;
                        flag = false;
                        item.available -= 1;
                        saveData();
                    }
                }
                if(flag) {
                    cartList.push({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        count: 1
                    });
                    item.available -= 1;
                    saveData();
                }
            }
        }
    }

    function saveData() {
        localStorage.setItem('cartList', JSON.stringify(cartList));
        localStorage.setItem('productsList', JSON.stringify(productsList));
        renderProducts();
        renderCart();
    }

    function renderProducts() {
        let text = '';
        for(let item of productsList) {
            text += `<div class="products__item">
                        <div class="products__column">
                            <div class="products__name">${item.name}</div>
                            <div class="products__price">Price: ${item.price}$</div>
                            <div class="products__amount">Available: ${item.available}</div>
                        </div>
                        
                        <button class="products__button" ${item.available === 0 ? "disabled" : ''} data-index="${item.id}" >
                                add to cart
                        </button>
                      </div>`
        }
        products.innerHTML = text;
    }

    function renderCart() {
        let text = '';
        let totalPrice = 0;
        for(let item of cartList) {
            if(item.count <= 0) {
                continue;
            }
            text += `<div class="products__item">
                        <div class="products__column">
                            <div class="products__name">${item.name}</div>
                            <div class="products__price">Price: ${item.price}$</div>
                            <div class="products__amount">Count: ${item.count}</div>
                        </div>
                        <div class="count-wrapper">
                            <button class="plus" data-action="plus" data-index="${item.id}">+</button>
                            <button class="minus" data-action="minus" data-index="${item.id}">-</button>
                        </div>
                      </div>`
        }
        cart.innerHTML = text;
        text = 0;
        for(let item of cartList) {
            text += item.count;
            totalPrice += item.price;
        }
        cart_products_amount.innerHTML = text;
        cart_products_price.innerHTML = totalPrice;
    }

    window.addEventListener('storage', (event) => {
        switch(event.key) {
            case 'cartList':
                cartList = JSON.parse(localStorage.getItem('cartList'));
                renderProducts();
                renderCart();
                break;
            case 'productsList':
                productsList = JSON.parse(localStorage.getItem('productsList'));
                renderProducts();
                renderCart();
                break;
            default:
                console.log('RUN DEFAULT STORAGE EVENT');
                break;
        }
    });

    fetch('https://jsonbox.io/box_778eabc2fa9ee6c909ce')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(productsList.length === 0) {
                productsList = data;
            }
            renderProducts();
            renderCart();
        });
})();