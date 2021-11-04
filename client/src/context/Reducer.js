const Reducer = (state, action) => {
    // switch case block : if as() -> case : "" -> return 
    switch(action.type){
        case "LOGIN_START":
            return{
                user: null,
                isFetching: true,
                error: false
            };
        case "LOGIN_SUCCESS":
            return{
                user: action.payload,
                isFetching: false,
                error: false
            };
        case "LOGIN_FAILURE":
            return{
                user: null,
                isetching: false,
                error: true
            };
        case "LOGOUT":
            return{
                user: null,
                isetching: false,
                error: false
            };

            //  UPDATE du profil d'user //

            case "UPDATE_START":
                return{
                  ...state, // user et error ne vont pas changer
                  isFetching: true
                };
            case "UPDATE_SUCCESS":
                return{
                    user: action.payload,
                    isFetching: false,
                    error: false
                };
            case "UPDATE_FAILURE":
                return{
                    user: state.user,
                    isetching: false,
                    error: true
                };

        default:
            return state;
    }
};

export default Reducer;