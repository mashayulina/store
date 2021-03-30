function Header()
{
    function getLayout()
    {
        return `
                <header>
                <div class="container fx f_sb f_m">
                    <a class="header_logo fx f_m" href="index.html">
                        <i class="material-icons">fiber_smart_record</i>
                        <span>GameStore</span>
                    </a>
        
                    <div class="header_contacts">
                        <p><a href="#" class="fx f_m"><i class="material-icons">phone</i> +7987 333 44 55</a></p>
                        <p><a href="#" class="fx f_m"><i class="material-icons">email</i> mail@mail.ru</a></p>
                    </div>
        
                    <a class="header_cart fx f_m" href="index.html?page=cart">
                        <i class="material-icons">shopping_cart</i>
                        <span class="total_count">0</span>
                        Cart
                    </a>
                </div>
            </header>
        `
    }

    return {
        layout: getLayout,
        cb: []
    }
}

function setCartCount()
{   
    let count = 0;

    if(CartList.length)
    {
        CartList.forEach((elem) => {
            count += +elem.count;
        });
    }

    $('.total_count').text(count);
}

