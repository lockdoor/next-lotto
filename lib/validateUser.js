function validateUser(arr){
  const isEmpty = arr.find(e => e.trim() === "")
  console.log('isEmpty is ', isEmpty)
  return isEmpty === undefined ? true : false
}

export default validateUser