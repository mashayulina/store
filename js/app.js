function App()
{
    function getRoute()
    {
        const Routes = [
            {url: '', component: Home},
            {url: 'cart', component: Cart}
        ];

        const URL = window.location.search.split('=').pop();

        return Routes.find(route => route.url == URL) || { component: NotFound }
    }

    const { component } = getRoute();

    console.log(component);


    document.querySelector('#app').innerHTML = `
                                                ${ Header().layout() }
                                                ${ component().layout() }
    `   

    if(typeof component().cb == 'function')
        component().cb();

    setCartCount();
}

App();


