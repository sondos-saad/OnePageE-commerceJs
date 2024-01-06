
// open and close cart
const cartIcon = document.querySelector('#cart-icon')
const cart = document.querySelector('.cart')
const cartClose = document.querySelector('#cart-close')

cartIcon.addEventListener('click', ()=>{
    cart.classList.add('active')
})

cartClose.addEventListener('click', ()=>{
    cart.classList.remove('active')
})

// start when the document is ready
if(document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded', start)
}else{
    start()
}

function start(){
    addEvents()
}

function update(){
    addEvents()
    updateTotal()
}

function addEvents(){
    let cartRemove_btns = document.querySelectorAll('.cart-remove');
    cartRemove_btns.forEach((btn)=>{
        btn.addEventListener('click', handle_removeCartItem)
    })
    let cartQuantity_inputs = document.querySelectorAll('.cart-quantity')
    cartQuantity_inputs.forEach(input =>{
        input.addEventListener('change' , handle_changeItemQuantity)
    })
    // add item to cart
    let addCart_btns = document.querySelectorAll('.add-cart');
    addCart_btns.forEach(btn =>{
        btn.addEventListener('click', handle_addCartItem )
    })

    // Buy order
    let buy_btn = document.querySelector('.btn-buy');
    buy_btn.addEventListener('click', handle_buyOrder)
}

let itemAdded =[];
function handle_addCartItem(){
    let product = this.parentElement;
    let title = product.querySelector('.product-title').innerHTML;
    let price = product.querySelector('.product-price').innerHTML;
    let imgSrc = product.querySelector('.product-img').src;
    let newToAdd ={
        title,
        price,
        imgSrc,
    }

    // handle item is already exist
    if(itemAdded.find(el =>el.title == newToAdd.title)){
        alert('This Item Is Already Exist!');
        return;
    }else{
        itemAdded.push(newToAdd)
    }

    // add product to cart
    let cartBoxElement = CartBoxComponent(title , price , imgSrc);
    let newNode = document.createElement('div');
    newNode.innerHTML = cartBoxElement;
    let cartContent = cart.querySelector('.cart-content');
    cartContent.appendChild(newNode);

    update();
}

function handle_removeCartItem(){
    this.parentElement.remove();
    itemAdded = itemAdded.filter((el) =>{
        el.title != this.parentElement.querySelector('.cart-product-title').innerHTML
    })
    update()
}

function handle_changeItemQuantity(){
    if(isNaN(this.value) || this.value < 1){
        this.value =1
    }
    this.value = Math.floor(this.value); //to keep it integer
    update()
}

function handle_buyOrder(){
    if(itemAdded.length <= 0 ){
        alert('There is No Order to Place Yet! \n Please Make an Order first.');
        return;
    }
    const cartContent = cart.querySelector('.cart-content');
    cartContent.innerHTML = '';
    alert('Your Order is Placed Successfully');
    itemAdded = []
    update()
}

function updateTotal(){
    let CartBoxes = document.querySelectorAll('.cart-box');
    let totalElement = cart.querySelector('.total-price')
    let total = 0;
    CartBoxes.forEach((cartBox) =>{
        let priceElement = cartBox.querySelector('.cart-price')
        let price = parseFloat(priceElement.innerHTML.replace("$", ""))
        let quantity = cartBox.querySelector('.cart-quantity').value;
        total += price * quantity;
    })
    // keep 2 digits after the decimal point
    total = total.toFixed(2);
    totalElement.innerHTML = "$" + total
}

function  CartBoxComponent(title , price , imgSrc){
    return `
        <div class="cart-box">
            <img src=${imgSrc} alt=${title.toLowerCase} class="cart-img">
            <div class="details-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <i class='bx bx-trash cart-remove' ></i>
        </div>
    `
}