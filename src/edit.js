import { fetchRecipeEdit} from './view'
import { updatesRecipe } from './recipe'
import {createIngredient, renderIngredient} from './ingredient'

const titleEl = document.querySelector('.title-recipe')
const bodyEl = document.querySelector('.recipeBody')


const noteId = location.hash.substring(1)

fetchRecipeEdit(noteId)


titleEl.addEventListener('change', (e) => {
    updatesRecipe(noteId, {
        title: e.target.value.trim()
    })
})

bodyEl.addEventListener('change', (e) => {
    updatesRecipe(noteId, {
        description: e.target.value
    })
})

document.querySelector('#ingredient').addEventListener('submit', (e) => {
    const text = e.target.elements.text.value
    e.preventDefault()
    createIngredient(noteId, text)
    renderIngredient(noteId)
    e.target.elements.text.value = ''
})
renderIngredient(noteId)
