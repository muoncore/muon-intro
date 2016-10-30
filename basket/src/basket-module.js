var signals = require("signals")
var uuid = require("uuid")

module.exports.create = function(muon) {
    var baskets = {}

    function connect() {
        baskets = {}
        muon.replay("basket", {"stream-type": "hot-cold"}, function (data) {
            console.dir(data)
            var basket = baskets[data.payload["user-id"]]
            if (!basket) {
                basket = {count:0}
                baskets[data.payload["user-id"]] = basket
            }
            basket.count += data.payload["quantity-added"]
        }, function (error) {
            logger.error("Disconnected from event store, reconnecting ", error)
            setTimeout(connect, 1000)
        }, function (complete) {
            setTimeout(connect, 1000)
        })
    }

    connect()

    return {
        getBasket: function(productId) {
            return baskets[productId]
        }
    }
}