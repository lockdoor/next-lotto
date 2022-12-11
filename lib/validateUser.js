function validateUser({username, password}){
  if(username && password){
    if(username.trim() === '' || password.trim() === '') return false
    return true
  }else{
    return false
  }
  
}

export default validateUser