let isLoginAction=(data,dispatch)=>{
    dispatch({
        type:"podIsLogin",
        payload:data
    })
}
export default isLoginAction