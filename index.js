const cart_items = document.querySelector('#cart .cart-items');


const parentNode = document.getElementById('music-content');

const parentContainer=document.getElementById('EcommerceContainer')
parentContainer.addEventListener('click',(e)=>{

})
window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:3000/products').then((data)=>{
        if(data.request.status===200){
            const products=data.data.products
            const parentSection = document.getElementById('Products')
            products.forEach(product => {
                const productHtml=`
                <div>
                    <h1>${product.title}</h1>
                    <img src=${product.imageUrl}></img>
                    <button>Add To Cart</button>
                </div>`
                parentSection.innerHTML += productHtml
                
            });
        }
    })
})