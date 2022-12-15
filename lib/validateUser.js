function validateUser(arr){
  // console.log(arr)
  const isEmpty = arr.find(e => e.trim() === "")
  // console.log('isEmpty is ', isEmpty)
  return isEmpty === undefined ? true : false
  // return false
}

export default validateUser