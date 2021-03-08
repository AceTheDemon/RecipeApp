import {v4} from 'uuid'
import { getRecipes, setRecipes } from './recipe'

const noteId = location.hash.substring(1)

const createIngredient = (noteId,text) => {
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === noteId)
    const ingredients = recipe.ingredients
    const ingredientId = v4()
    ingredients.push({
        id:ingredientId,
        title:text,
        have:false
    })
    setRecipes()
    return ingredientId
}   

const toggleIngredient = (noteId, ingredientId) => {
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === noteId)
    const ingredients = recipe.ingredients

    ingredients.find((ingredient) => {
        if (ingredient.id === ingredientId) {
            ingredient.have = !ingredient.have
            setRecipes()
        }
    })
}

const deleteIngredients = (noteId,ingredientId) => {
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === noteId)
    const ingredients = recipe.ingredients
    const index = ingredients.findIndex((ingredient) => ingredient.id === ingredientId)

    if (index > -1) {
        ingredients.splice(index, 1)
        setRecipes
    }
}

const displayIngredient = (ingredient) => {

    const mainEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkboxEl = document.createElement('input')
    const textEl = document.createElement('span')
    const deleteButton = document.createElement('span')

    //setup checkbox
    checkboxEl.setAttribute('type', 'checkbox')
    checkboxEl.checked = ingredient.have
    checkboxEl.addEventListener('change', () => {
        toggleIngredient(noteId, ingredient.id)
        renderIngredient(noteId)
    })
    mainEl.appendChild(checkboxEl)

    //setup text
    if (ingredient.title.length > 0) {
        textEl.textContent = ingredient.title
    }
    else {
        textEl.textContent = 'undefined'
    }
    containerEl.appendChild(textEl)

    //setup divs
    mainEl.appendChild(containerEl)
    mainEl.classList.add('input-ingrediet')

    //setup deleteButton
    deleteButton.classList.add('far', 'fa-trash-alt')
    deleteButton.classList.add('deleteButton')
    mainEl.appendChild(deleteButton)
    deleteButton.addEventListener('click', () => {
       deleteIngredients(noteId, ingredient.id)
        renderIngredient(noteId)
        setRecipes()
    })

    return mainEl
}

const renderIngredient = (noteId) => {
    const domIngredientHtml = document.querySelector('.div-ingredient')
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === noteId)
    const ingredients = recipe.ingredients

    domIngredientHtml.innerHTML=''

    if (ingredients.length > 0) {
        ingredients.forEach((ingredient) => {
            domIngredientHtml.appendChild(displayIngredient(ingredient))
        })
    }
    else {
        const emptyMsg_2 = document.createElement('p')
        emptyMsg_2.textContent = 'Start adding Ingredient'
        domIngredientHtml.appendChild(emptyMsg_2)
    }
}

export { createIngredient, toggleIngredient, deleteIngredients, renderIngredient }    
