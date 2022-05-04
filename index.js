const cart_items = document.querySelector('#cart .cart-items');


const parentNode = document.getElementById('music-content');

const parentContainer=document.getElementById('EcommerceContainer')
parentContainer.addEventListener('click',(e)=>{
    if(e.target.className == 'shop-item-button') {
        const id = e.target.parentNode.parentNode.id;
        const name = document.querySelector(`#${id} h3`).innerText;
        const img_src = document.querySelector(`#${id} img`).src;
        const price = e.target.parentNode.firstElementChild.firstElementChild.innerText;

        let cart_total = document.querySelector('#total-value').innerText;

        if(document.querySelector(`#incart${id}`)){
            alert('Already Added to cart');
            return;
        } else {
            document.querySelector('.cartnumber').innerText = parseInt(document.querySelector('.cartnumber').innerText) + 1;
            const cart_item = document.createElement('div');
            cart_item.classList.add('cart-row');
            cart_item.setAttribute('id' , `inCart${id}`);
            cart_total = (parseFloat(cart_total) + parseFloat(price)).toFixed(2);

            document.querySelector('#total-value').innerText = `${cart_total}`;

            cart_item.innerHTML = `<span class='cart-item cart-column'><img class='cart-img' src="${img_src}" alt="">
                <span>${name}</span></span>
                <span class='cart-price cart-column'>${price}</span><span class='cart-quantity cart-column'>
                <input type="text" value="1"><button>REMOVE</button></span>`

            cart_items.appendChild(cart_item);
            }

            const container = document.getElementById('container');
            const notification = document.createElement('div');
            notification.classList.add('notification');
            notification.innerHTML = `<h4> ${name} is added to the cart<h4>`;
            container.appendChild(notification);
        addToCart(id);

            setTimeout( () => {
                notification.remove();
            }, 2500)
        }
    if (e.target.className=='cart-btn-bottom' || e.target.className=='cart-bottom' || e.target.className=='cart-holder'){
       
        getCart();
        document.querySelector('#cart').style = "display:block;"

       
    }
    if (e.target.className=='cancel'){
        document.querySelector('#cart').style = "display:none;"
    }
    if (e.target.className=='purchase-btn'){
        if (parseInt(document.querySelector('.cart-number').innerText) === 0){
            alert('You have Nothing in Cart , Add some products to purchase !');
            return
        }
        alert('Thanks for the purchase')
        cart_items.innerHTML=" "
        document.querySelector('.cart-number').innerText=0;
        document.querySelector('#total-value').innerText=0;
    }
    if (e.target.innerText=='REMOVE'){
        let cart_total = document.querySelector('#total-value').innerText;
        cart_total = parseFloat(cart_total).toFixed(2) - parseFloat(document.querySelector(`#${e.target.parentNode.parentNode.id} .cart-price`).innerText).toFixed(2) ;
        document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)-1
        document.querySelector('#total-value').innerText = `${cart_total.toFixed(2)}`
        e.target.parentNode.parentNode.remove()
    }
})

window.addEventListener('DOMContentLoaded' , async () => {
    const db = await axios.get('http://localhost:3000/products');
    const albums = document.getElementById('Products');
    let r=1;
    for(let i=0; i<db.data.products.length ; i++){
        if(i>=2){ r = 2; }
        const elem = document.createElement('div');
        const album = document.createElement('div');
        album.innerHTML = `<h3> ${db.data.products[i].title} </h3>
        <div class="coverphoto">
            <img src="${db.data.products[i].imageUrl}" alt="" class="albumphoto">
        </div>
        <div class="album-details">
            <span>$<span>${db.data.products[i].price}</span></span>
            <button class="add-cart"> Add to Cart </button>
        </div>`
        album.setAttribute('id' , `album${i+1}`);
        elem.appendChild(album);
        elem.setAttribute('id' , `row${r}`);
    
        Products.appendChild(elem);
    }
})
function addToCart(productId){
    console.log('add')
    axios.post('http://localhost:3000/cart',{productId:productId}).then((response)=>{
        if(response.status===200){
            notifyUsers(response.data.message)
        }else{
            throw new Error();
        }

    }).catch(err=>{
        console.log(err)
        notifyUsers(err.data.message)
    })
}
function getCart() {
    let cart_total=0;
    cart_items.innerHTML="";
    axios.get('http://localhost:3000/cart')
    .then( (prods) => {
        console.log(prods.data.products);
        for(let i=0; i< prods.data.products.length ; i++){

        const cart_item = document.createElement('div');
        cart_item.classList.add('cart-row');
        cart_item.setAttribute('id' , `inCart${prods.data.products[i].id}`);
        cart_total = cart_total + prods.data.products[i].price;

        document.querySelector('#total-value').innerText = `${cart_total}`;

        cart_item.innerHTML = `<span class='cart-item cart-column'><img class='cart-img' src="${prods.data.products[i].imageUrl}" alt="">
            <span>${prods.data.products[i].title}</span></span>
            <span class='cart-price cart-column'>${prods.data.products[i].price}</span><span class='cart-quantity cart-column'>
            <input type="text" value="1"><button>REMOVE</button></span>`

        cart_items.appendChild(cart_item);
        }

    })
}
function notifyUsers(message){
    const container = document.getElementById('container');
    const notification = document.createElement('div');
    //notification.style.backgroundColor = iserror ? 'red' : 'green';
    notification.classList.add('notification');
    notification.innerHTML = `<h4>${message}<h4>`;
    container.appendChild(notification);
    setTimeout(()=>{
        notification.remove();
    },2500)
}