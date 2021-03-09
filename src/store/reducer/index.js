const INTIAL_STATE = {
    users: [],
    current_user: {}
}

export default (state = INTIAL_STATE,action)=>{
    switch (action.type){
        case "SETUSER":
            return({
                ...state,
                current_user: action.data
                
            })

        case "SETFIREBASEUSER":
            return({
                ...state,
                users:action.data
                
            })
            default:
            return state;
    }

} 