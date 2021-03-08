import {v4} from 'uuid'
import moment from 'moment'

let recipes = []

const getRecipes = () => recipes

const loadRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')
    try {
        return recipesJSON ? JSON.parse(recipesJSON) : []
    } catch (e) {
        return []
    }
}

const setRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}


const createRecipes = () => {
    const id = v4()
    const timestamp = moment().valueOf()

    recipes.push({
        id:id,
        title:'',
        description: '',
        ingredients: [],
        createdAt:timestamp,
        updatedAt:timestamp,
    })
    setRecipes()
    return id
}

const removeRecipe = (id) => {
    const removeIndex = recipes.findIndex((recipe) => recipe.id === id )
    if (removeIndex > -1) {
        recipes.splice (removeIndex, 1)
        setRecipes()
    }
}

const updatesRecipe = (id,update) => {
    const recipe = recipes.find((recipe) => recipe.id === id)

    if(!recipe) {
        return undefined
    }

    if (typeof update.title === 'string') {
        recipe.title = update.title
    }

    if (typeof update.description === 'string') {
        recipe.description = update.description
    }
    setRecipes()
    
}
const sortingRecipes = (sortBy) => {
    if (sortBy === 'recent')
    return recipes.sort((a,b) => {
        if (a.createdAt > b.createdAt) {
            return -1
        } else if (a.createdAt < b.createdAt) {
            return 1
        } else {
            return 0
        }
    }) 
    else if (sortBy === 'last')
    return recipes.sort((a,b) => {
        if (a.updatedAt > b.updatedAt) {
            return -1
        } else if (a.updatedAt < b.updatedAt) {
            return 1
        } else {
            return 0
        }
    })
    else if (sortBy === 'alpha')
    return recipes.sort((a,b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return -1
        } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return 1
        } else {
            return 0
        }
    })
    else {
        return recipes
    }
}

recipes = loadRecipes()

export { getRecipes, createRecipes, removeRecipe, updatesRecipe, loadRecipes, sortingRecipes,setRecipes }