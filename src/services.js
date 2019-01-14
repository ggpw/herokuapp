
class ApiServices{
  open=(method, url, params, successCallback, errorCallback)=>{
    const obj = {
      method: method,
      headers: {
          "Content-Type": "application/json"
      }
    }
    if(method!=="GET")obj.body= JSON.stringify(params);
    fetch(url,obj
    ).then( res => {
      if(res.status === 200)
        return res.json()
    }).then( resJson => {
      successCallback(resJson)
    })
  }
}
export default new ApiServices();