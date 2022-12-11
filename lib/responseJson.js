export function responseError(res, code, message){
  res.status(code).json({
    hasError: true,
    message
  })
}

export function responseSuccess(res, code, message){
  res.status(code).json({
    success: true,
    message
  })
}