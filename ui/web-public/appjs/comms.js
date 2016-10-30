

var shop = function() {

    var muon = require("muonjs").client({port:9898})

    this.getUser = function(callback) {
        muon.request("rpc://user-list/",{}, function(val) {
            console.dir(val)
            if (val.error) return
            callback(val.body)
        })
    }

    this.getScanList = function(callback) {
        muon.request("rpc://scan-list/",{}, function(val) {
            console.dir(val)
            if (val.error) return
            callback(val.body)
        })
    }
    
    return this
}


