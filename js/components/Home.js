function Home()
{

    function init()
    {
        //Slider
        initSlider();

        //Modal
        const Modal = document.querySelector('.modal_wrap');

        document.querySelectorAll('.card_img').forEach((card, index) => {
            card.onclick = function()
            {
                getModal(Modal, index);
            }
        });

        document.querySelector('.modal_close').onclick = () => $('.modal_wrap').slideUp();

        //Add Cart
        document.querySelectorAll('.add_cart').forEach((btn, index) => {
            btn.onclick = () => {
                addCart(index);
            }
        })

        //Add cart modal
        document.querySelector('.add_modal').onclick = function()
        {
            addCart(this.value);
        }

    }

    function addCart(index)
    {
        const Copy = CartList.find((elem) => elem.title == Data.products[index].title);

        if(Copy)
            Copy.count++;
        else 
            CartList.push(Data.products[index]);

        localStorage.setItem('cart', JSON.stringify(CartList));

        $('.notify').fadeIn().delay(1000).fadeOut();

        setCartCount();
    }

    function getModal(Modal, index)
    {
        document.querySelector('.modal_product h1').textContent = Data.products[index].title;
        document.querySelector('.modal_product h4 span').textContent = Data.products[index].price;
        document.querySelector('.modal_product img').src = 'img/products/' + Data.products[index].img;
        document.querySelector('.modal_product p').textContent = Data.products[index].text;

        document.querySelector('.add_modal').value = index;

        $('.modal_wrap').slideDown();
    }

    function initSlider()
    {
        $('.slider').slick({
            dots: true,
            arrows: false
        });
    }

    function getSlider()
    {
        let Layout = '';

        if(Data.slider.length)
        {
            Data.slider.forEach((slide) => {
                Layout += `<div class="slide" style="background-image: url(img/slider/${slide})"></div>`
            });
        }

        return Layout;

    }

    function getProducts()
    {
        let Layout = '';

        if(Data.products.length)
        {
            Data.products.forEach((elem) => {
                Layout += `
                            <div class="card">
                                <div class="card_img">
                                    <img class="product_img" src="img/products/${elem.img}" alt="">
                                </div>
                                <p class="card_title mt">${elem.title}</p>
                                <p class="card_price mv">${elem.price} $</p>
                                <button class="btn add_cart" >Add to cart</button>
                            </div>
                          `
            });
        }

        return Layout;
    }



    function getLayout()
    {
        return `
        <section>
            <div class="container">
               ${ 1 > 0 ? `<div class="slider">
                
                 ${ getSlider() }
                
                </div>`
                : `` }
            </div>
        </section>
    
        <section class="products">
            <div class="container">
                <div class="s_title center">Products</div>
    
                <div class="products_grid gr g4 gg30">

                    ${ getProducts() }
                
                </div>
            </div>
        </section>
    
        <section class="products_text">
            <div class="container">
                <h1 class="s_title center">About us</h1>
                <p class="justify">${ Data.about }</p>
            </div>
        </section>
    
        <footer>
            <div class="container">
                <p class="center">Copyright &copy; 2021</p>
            </div>
        </footer>
    
    
        <div class="modal_wrap">
            <div class="modal_product">
            <i class="material-icons modal_close">close</i>
                <h1>Product title</h1>
    
                <div class="product_body fx f_sb">
                    <article class="product_img">
                        <img src="" alt="">
                    </article>
    
                    <article class="product_text">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, molestias.</p>
    
                        <h4 class="card_price mv">Price: <span>99.00 </span>$</h4>
    
                        <button class="btn add_modal" >Add to cart</button>
                    </article>
                </div>
            </div>
        </div>

        <div class="notify">Add to cart</div>
        `
    }

    return {
        layout: getLayout,
        cb: init
    }
}