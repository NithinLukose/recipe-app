let mealDetails = ( async function(){
    const params = new URLSearchParams(window.location.search)
    const id = Number(params.get('id'))

    let meal = await requests.fetchMealById(id)


    //let cache dom
    let mealImg = document.querySelector('.meal-img')
    let mealTagName = document.querySelector('.meal-tag-name')
    let mealName = document.querySelector('.meal-name')
    let ingredients = document.querySelector('.ingredients')
    let instructions = document.querySelector('.instructions')
    var scrollToTopBtn = document.querySelector(".scrollToTopBtn")
    var rootElement = document.documentElement

    function renderMealRecipe(){
        mealImg.setAttribute('src',meal[0].strMealThumb)
        mealTagName.innerText = meal[0].strCategory
        mealName.innerText = meal[0].strMeal
        let mealIngredients = []
        for(let i = 0;i<10;i++){
            if(meal[0][`strIngredient${i+1}`]!==''){
                mealIngredients.push(meal[0][`strIngredient${i+1}`])
            }
        }
        for(let i = 0;i<mealIngredients.length;i++){
            let div = document.createElement('div')
            div.classList.add('ingredient')
            let img = document.createElement('img')
            img.classList.add('ingredient-img')
            img.setAttribute('src',`https://www.themealdb.com/images/ingredients/${mealIngredients[i]}.png`)
            let span = document.createElement('span')
            span.classList.add('ingredient-name')
            span.innerText = mealIngredients[i] 
            div.appendChild(img)
            div.appendChild(span)
            ingredients.appendChild(div)
            instructions.innerText = meal[0].strInstructions
        }   
        
    }
    renderMealRecipe()

    function handleScroll() {
        // Do something on scroll
        var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight
        if ((rootElement.scrollTop / scrollTotal ) > 0.80) {
          // Show button
          scrollToTopBtn.classList.add("showBtn")
        } else {
          // Hide button
          scrollToTopBtn.classList.remove("showBtn")
        }
    }
      
    function scrollToTop() {
        // Scroll to top logic
        rootElement.scrollTo({
          top: 0,
          behavior: "smooth"
        })
    }

    scrollToTopBtn.addEventListener("click", scrollToTop)
    document.addEventListener("scroll", handleScroll)

})()