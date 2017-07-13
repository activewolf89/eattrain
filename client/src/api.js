var axios = require('axios');
module.exports = {
  getDate: function(date){
    axios({
      method: 'get',
      url: `/training/session/${date}`
    }).then((res)=>{
      
    })
  }
}
