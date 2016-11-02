var signals = require("signals")
var uuid = require("uuid")

module.exports.create = function(muon) {
    var products = {}

    function connectProducts() {
        muon.replay("products", {"stream-type": "hot-cold"}, function (data) {
            console.dir(data)
            products[data.payload["product-id"]] = data.payload
        }, function (error) {
            logger.error("Disconnected from event store, reconnecting ", error)
            setTimeout(connectProducts, 1000)
        }, function (complete) {
            setTimeout(connectProducts, 1000)
        })
    }

    connectProducts()

    return {
        getProduct: function(productId) {
            return products[productId]
        },
        all: function() {
            return products
        }
    }
}