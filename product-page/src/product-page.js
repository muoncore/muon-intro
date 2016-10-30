
var Muon = require("muon-core")
var muonurl = process.env.MUON_URL || "amqp://muon:microservices@rabbitmq"

logger.info("Muon is enabled, booting up using url " + muonurl)

var name = "product-page"

var muon = Muon.create(name, muonurl, muonurl, ["productpage"]);

var products = require("./products").create(muon)
var basket = require("./basket").create(muon)

muon.handle('/', function (request, respond) {
    console.dir(request)
    var productId = request.body["product-id"]
    var userId = request.body["user-id"]

    var product = products.getProduct(productId)
    var userBasket = basket.getBasket(userId)

    if (!userBasket) userBasket = {count:0}

    if (product) {
        respond({
            product: product,
            basket: userBasket
        })
    } else {
        respond({
            id: null,
            message: "No Product Found"
        })
    }
})
