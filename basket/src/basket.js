
var Muon = require("muon-core")
var muonurl = process.env.MUON_URL || "amqp://muon:microservices@rabbitmq"

logger.info("Muon is enabled, booting up using url " + muonurl)

var name = "basket"

var muon = Muon.create(name, muonurl, muonurl, ["productpage"]);

var basket = require("./basket-module").create(muon)

muon.handle('/add-to-basket', function (request, respond) {
    console.dir(request)
    /*
     payload: {
         "user-id": "123",
         "product-id": "123456789",
         "quantity-added": 3
     }
     */

    muon.emit({
        "event-type": "BasketProductModified",
        "schema": "http://www.simplicityitself.io/mucon/basket/1",
        "stream-name": "basket",
        "service-id": name,
        "payload": request.body
    }).then(function (resp) {
        respond({
            message: "Basket updated"
        })
    })
})
