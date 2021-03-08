import { getRecipes, removeRecipe, sortingRecipes } from './recipe'
import { getFilter } from './filter'

const domHtmlOutput = (recipe) => {

    const mainEl = document.createElement('div')
    const containerEl = document.createElement('div')
    const linkEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('span')
    const button = document.createElement('span')

    //setup link
   linkEl.setAttribute('href', `/edit.html#${recipe.id}`)

    //parsing recipe
    if (recipe.title.length > 0){
        textEl.textContent = recipe.title
    } else {
        textEl.textContent = 'Click here to enter a Title'
    }
    linkEl.appendChild(textEl)
    containerEl.appendChild(linkEl)
    
    //edit
    mainEl.appendChild(containerEl)
    mainEl.classList.add('input_title')
    textEl.classList.add('input_title_link')
    containerEl.classList.add('cointainer_element')

    //setup Ingredients 
    const notThere = (ingredients) => ingredients.length === 0
    const isHave = (ingredients) => ingredients.have === true
    const isntHave = (ingredients) => ingredients.have === false
        if (recipe.ingredients.every(isHave)) {
            statusEl.textContent = 'You Have All Ingredients'
        } else if (recipe.ingredients.every(isntHave)) {
            statusEl.textContent = `You Have None Of Ingredients *`
        } 
        else if (recipe.ingredients.every(notThere)) {
            statusEl.textContent = 'Start adding some ingredients'
        }
         else {
            statusEl.textContent = 'You Have Some Ingredients For Sure'
        }
        containerEl.appendChild(statusEl)

    //parsing button
    button.textContent = 'remove'
    button.classList.add('btn', 'btn-outline-danger')
    containerEl.appendChild(button)
    button.addEventListener('click', (e) => {
        removeRecipe(recipe.id)
        renderRecipe()
    })

    return mainEl
}

const renderRecipe = () => {
    const domHtml = document.querySelector('.div-recipe')
    const filters =  getFilter()
    const recipes = sortingRecipes(filters.sortBy)
    const newRecipes =  recipes.filter((recipe) => recipe.title.includes(filters.search.toLowerCase()))
    
   domHtml.innerHTML = ''

    if (newRecipes.length > 0) {
        newRecipes.forEach((recipe) => {
            domHtml.appendChild(domHtmlOutput(recipe))
        }) 
    }else {
        const emptyMsg = document.createElement('p')
        emptyMsg.textContent = 'What! you still havent any Recipe'
        emptyMsg.classList.add('empty_list')
        domHtml.appendChild(emptyMsg)
    }
}

const fetchRecipeEdit = (noteId) => {
    const titleEl = document.querySelector('.title-recipe')
    const bodyEl = document.querySelector('.recipeBody')
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === noteId)
    if (!recipe) {
        location.assign('../scripts/index.html')
    }
    titleEl.value = recipe.title
    bodyEl.value = recipe.description
}

export { renderRecipe, fetchRecipeEdit }
