const mobileReducer = (state = false, action) => {
    switch (action.type){
        case 'MOBILE':
            return state = !state
        default:
            return state
    }
}

export default mobileReducer