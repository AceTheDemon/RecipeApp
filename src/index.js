import { createRecipes, getRecipes, sortingRecipe } from './recipe'
import { setFilter } from './filter'
import { renderRecipe } from './view'


renderRecipe()

document.querySelector('#addrecipe').addEventListener('click', () => {
    const id =  createRecipes()
    location.assign(`/scripts/edit.html#${id}`)
})

document.querySelector('.searchText').addEventListener('change', (e) => {
    setFilter({
        search: e.target.value
    })
    renderRecipe()
})

document.querySelector('.filterByOption').addEventListener('change', (e) => {
    setFilter({
        sortBy: e.target.value
    })
    renderRecipe()
})
