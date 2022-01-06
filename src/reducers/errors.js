const errors = (state = {
    msg: {},
    status: null
}, action) => {
    switch (action.type){
        case 'getErrors':
            return {
                msg: action.payload.msg,
                status: action.payload.status
            }
        default:
            return state
    }
}

export default errors