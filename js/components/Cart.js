function Cart()
{

    function init()
    {
        setTotal();

        document.querySelectorAll('.cart_count').forEach((elem, index) => {
            elem.onclick = function()
            {
                CartList[index].count = this.value;

                document.querySelectorAll('.total_cart_row')[index].textContent = CartList[index].price * CartList[index].count;

                setTotal();
                
                
            }
        });

       removeCart();

        $('.sale_btn').on('click', () => {
            $('.order_form').slideToggle();
        })

    }


    function removeCart()
    {
        document.querySelectorAll('.btn_remove').forEach((elem, index) => {
            elem.onclick = function() {
                CartList.splice(index, 1);

                this.parentElement.remove();

                setTotal();

                removeCart();

            }
        });
    }

    function getTable()
    {
        let Layout = '';

        if(CartList.length)
        {
            CartList.forEach((elem) => {
                Layout += `
                    <div class="cart_row fx f_sb f_m">
                        <p><b>${elem.title}</b></p>
                        <p>price: <b>${elem.price}</b> $</p>
                        <p>total: <b class="total_cart_row">${elem.price * elem.count}</b> $</p>

                        <label>Count:&nbsp;
                            <input type="number" min="1" class="form_input cart_count" value="${elem.count}">
                        </label>

                        <button class="btn btn_remove">Remove</button>
                    </div>
                `
            })
        }
        else 
        {
            Layout = `<h2 class="center" style="color: #bbb">Cart is empty</h2>`
        }

        return Layout;
    }

    function setTotal()
    {
        let total = 0;

        if(CartList.length)
        {
            CartList.forEach((elem) => {
                total += +elem.price * elem.count;
            });
        }
        else 
        {
            $('.sale_btn').remove();
        }

        $('.total_sum').text(total);

        localStorage.setItem('cart', JSON.stringify(CartList));

        setCartCount();
    }

    function getLayout()
    {
        return `
                <section class="cart">
                <div class="container">

                <h1 class="s_title center">Cart</h1>

                <div class="cart_table">
                    <div class="cart_list">

                        ${ getTable() }
                   
                    </div>

                    ${ CartList.length ? '<h2>Total: <span class="total_sum">0</span> $</h2>' : '' }
                
                    
                </div>

                <div class="center mt">
                     ${ CartList.length ? '<button class="btn sale_btn">Sale now</button>' : '' }
                    <div class="center mt pv">
                        <a href="index.html" class="link">Go back</a>
                    </div>
                
                </div>

                <div class="center mt order_form">
                    <h3>Order Form</h3>

                    <form action="send.html" method="post">
                        <div>
                            <input type="text" name="username" class="form_input" placeholder="Username" required/>
                        </div>
                        <div class="mt">
                            <input type="text" name="address" class="form_input" placeholder="Address" />
                        </div>
                        <div class="mv">
                            <input type="tel" name="phone" class="form_input" minlength="10" placeholder="Phone" required/>
                        </div>
                        <input type="hidden" name="products" value='${localStorage.getItem('cart')}' />
                        <button class="btn">Submit order</button>
                    </form>

                </div>

                </div>
            </section>
        `
    }

    return {
        layout: getLayout,
        cb: init
    }
}