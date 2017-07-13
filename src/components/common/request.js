var request = {}

var config = require('./config')

request.get = function(params) {

}

request.post = function(key, data) {
  return $.ajax({
    type:"POST",
    url: config[key],
    data:data,
    dataType:"json",
    success:function(data){
      return data
    }
  })
}

module.exports = request
