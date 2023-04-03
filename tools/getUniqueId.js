

 exports.getUniqueId = (array) => {
    const ids = array.map((e) => e.id) 
    const id = ids.reduce((a, b) => a < b ? b : a)
    return id + 1
}