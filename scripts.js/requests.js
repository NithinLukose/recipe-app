let requests = (function(){
    async function fetchRandomMeal(){
        let meal = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
                    .then(res=>res.json())
                    .then(res=>res.meals)
        return meal;
    }
    async function fetchMealById(id){
        let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(res=>res.json())
            .then(res=>res.meals)
        return meal
    }
    async function fetchMealsByCategory(cat){
        let meals = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
            .then(res=>res.json())
            .then(res=>res.meals)
        return meals
    }
    return{
        fetchRandomMeal,
        fetchMealById,
        fetchMealsByCategory
    }
})()