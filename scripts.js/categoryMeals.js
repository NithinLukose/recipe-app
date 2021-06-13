let categoryMeals = (async function(){
    const params = new URLSearchParams(window.location.search)
    let category = params.get('id')
    let meals = await requests.fetchMealsByCategory(category)
    let totaMeals = meals.length;
    let mealsPerPage = 5;
    let totalPages = Math.ceil(totaMeals/mealsPerPage)
    let currentPage = 0;
    
    //cache dom
    let container = document.querySelector('.random-meal');
    let categoryName = document.querySelector('.name')
    let prevBtn = document.querySelector('.prev-btn')
    let nextBtn = document.querySelector('.next-btn')
    var scrollToTopBtn = document.querySelector(".scrollToTopBtn")
    var rootElement = document.documentElement


    function renderMeals(){
        
        if(currentPage===0){
            prevBtn.disabled = true
        }
        else{
            prevBtn.disabled = false
        }
        if(currentPage === totalPages-1){
            nextBtn.disabled = true
        }
        else{
            nextBtn.disabled = false
        }
        categoryName.innerText = category.charAt(0).toUpperCase() + category.slice(1)
        
        let temp = meals.slice(currentPage*mealsPerPage,currentPage*mealsPerPage+mealsPerPage)
        if(temp.length===0){
            return
        }
        container.innerHTML = ''
        for(let i = 0;i<temp.length;i++){
            let div = document.createElement('div')
            div.classList.add('meal')
            
            let img = document.createElement('img')
            img.classList.add('meal-img')
            img.setAttribute('src',temp[i].strMealThumb)
            

            let mealDetails = document.createElement('div')
            mealDetails.classList.add('meal-details')

            let mealName = document.createElement('span')
            mealName.classList.add('meal-name')
            mealName.innerText = temp[i].strMeal
            mealName.setAttribute('id',temp[i].idMeal)
            mealDetails.appendChild(mealName)

            div.appendChild(img)
            div.appendChild(mealDetails)

            container.appendChild(div)            
        }
    }
    renderMeals()


    function mealDetailRedirect(e){
        window.location.href = `./particularMeal.html?id=${e.target.id}`
    }

    function handlePrevBtnClick(){
        if(currentPage>0){
            currentPage--;
            renderMeals()
        }
    }

    function handleNextBtnClick(){
        if(currentPage<totalPages-1){
            currentPage++;
            renderMeals()
        }
    }

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

    //events

    container.addEventListener('click',mealDetailRedirect)
    prevBtn.addEventListener('click',handlePrevBtnClick)
    nextBtn.addEventListener('click',handleNextBtnClick)
    scrollToTopBtn.addEventListener("click", scrollToTop)
    document.addEventListener("scroll", handleScroll)

})()