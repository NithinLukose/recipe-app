let category = (function(){

    let catContainer = document.querySelector('.cat-container')

    function handleCategoryClick(e){
        window.location.href = `./category.html?id=${e.target.id}`
    }

    //bind events
    catContainer.addEventListener('click',handleCategoryClick)

})()