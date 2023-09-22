const initialData={
    podIsLogin:localStorage.getItem("podIsLogin") || false
}
let reducer=(storedata=initialData,action)=>{
    switch(action.type){
        case "podIsLogin":{
            return {
                ...storedata,
                podIsLogin:action.payload
            }
        }
    }
    return storedata
}
export default reducer