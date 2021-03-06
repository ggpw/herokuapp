
class ApiServices{
  open=(method, params, body, successCallback, errorCallback)=>{
    const obj = {
      method: method,
      headers: {
          "Content-Type": "application/json"
      }
    }
    let url="https://simple-contact-crud.herokuapp.com/contact";
    if(method!=="GET")obj.body= JSON.stringify(body);
    if(method!=="POST")url=url+(params?"/"+params:"");
    fetch(url,obj
    ).then( res => {
      console.log(res)
      if(res.status === 200)
        return res.json()
    }).then( resJson => {
      successCallback(resJson)
    }).catch(error => errorCallback(error));
  }
}
export default new ApiServices();