let main = (async function(){
    let meal = await requests.fetchRandomMeal()
    console.log(meal)

    //cache Dom
    let mealImg = document.querySelector('.meal-img')
    let mealTagName = document.querySelector('.meal-tag-name')
    let mealName = document.querySelector('.meal-name')

    function renderRandomMeal(){
        mealImg.setAttribute('src',meal[0].strMealThumb)
        mealTagName.innerText = meal[0].strCategory
        mealName.innerText = meal[0].strMeal
        mealName.setAttribute('id',meal[0].idMeal)
    }

    renderRandomMeal()

    function mealDetailRedirect(e){
        window.location.href = `./particularMeal.html?id=${e.target.id}`
    }

    mealName.addEventListener('click',mealDetailRedirect)

})()