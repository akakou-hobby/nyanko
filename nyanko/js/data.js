var fs = require('fs');

var config = {
  write: function(data) {
    var tmp = JSON.stringify(data, null, '    ')
    fs.writeFile('.swp', tmp, (err) => {
      if(err){
        throw err;
      }
      location.href = './after.html'
    })
  },

  read: function() {
    var config = JSON.parse(fs.readFileSync('./.swp', 'utf8'))
    fs.unlink('./.swp')

    return config
  }
}