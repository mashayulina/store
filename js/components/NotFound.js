function NotFound()
{
    function getLayout()
    {
        return `
                <h1>404</h1>
        `
    }

    return {
        layout: getLayout,
        cb: []
    }
}