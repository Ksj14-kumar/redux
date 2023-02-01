import { applyMiddleware, combineReducers, legacy_createStore as createStore, configureStore } from "redux"


const f1 = (state = { count: 0 }, action = {}) => {
    switch (action.type) {
        case "INC":
            return {
                count: state.count + 1
            }
        case "DEC":
            return {
                count: state.count - 1
            }
        default:
            return { count: state.count }
    }
}

const f2 = (state = { name: "" }, action) => {
    switch (action.type) {
        case "ADD":
            return {
                name: action.payload
            }

        default:
            return state
    }

}
// => (next) => (action) => {
//     console.log("action", action);
//     action.payload = 3;
//     next(action);

const loggerMiddleware = (store)=>{
    return function(next){
        return function(action){
            console.log(action,"action")
            next(action)
        }
    }
}

const combine_reducer = combineReducers({ f1, f2 })


const store = createStore(combine_reducer, applyMiddleware(loggerMiddleware))


export default store;
