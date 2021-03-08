const filters = {
    search:"",
    sortBy:'recent' 
}

const getFilter = () => filters

const setFilter = (updates) => {
    if (typeof updates.search === 'string') {
        filters.search = updates.search
    }
    if (typeof updates.sortBy === 'string') {
        filters.sortBy = updates.sortBy
    }
}
export { getFilter, setFilter }
