package com.simplicityitself.mucon;

import io.muoncore.Muon;
import io.muoncore.MuonBuilder;
import io.muoncore.codec.types.MuonCodecTypes;
import io.muoncore.config.AutoConfiguration;
import io.muoncore.config.MuonConfigBuilder;
import io.muoncore.protocol.event.Event;
import io.muoncore.protocol.event.client.DefaultEventClient;
import io.muoncore.protocol.event.client.EventClient;
import io.muoncore.protocol.event.client.EventReplayMode;
import reactor.rx.broadcast.Broadcaster;

import java.io.IOException;
import java.util.Map;

import static io.muoncore.protocol.reactivestream.server.PublisherLookup.PublisherType.HOT;
import static io.muoncore.protocol.requestresponse.server.HandlerPredicates.path;

public class ProductSearchService {

    public static void main(String[] args) throws IOException {
        Search search = new Search();

        Muon muon = getMuon();

        EventClient ev = new DefaultEventClient(muon);
        muon.getDiscovery().blockUntilReady();

        Broadcaster<Event<Map>> newProduct = Broadcaster.create();
        Broadcaster<Event<Map>> newProductConfirmed = Broadcaster.create();

        initSearchRpc(search, muon);
        initContinuousSearch(search, muon, newProductConfirmed);

        newProduct.consume(mapEvent -> {
            search.addProduct(mapEvent.getPayload());
            newProductConfirmed.accept(mapEvent);
        });

        ev.replay("products", EventReplayMode.REPLAY_THEN_LIVE, Map.class, newProduct);
    }

    private static void initContinuousSearch(Search search, Muon muon, Broadcaster<Event<Map>> newProductConfirmed) {
        muon.publishGeneratedSource("/", HOT, reactiveStreamSubscriptionRequest -> {

            String searchText = (String) reactiveStreamSubscriptionRequest.getArgs().get("search");

            Broadcaster<Search.SearchResults> productSearchUpdated = Broadcaster.create();

            newProductConfirmed.consume(mapEvent -> {
                productSearchUpdated.accept(
                        search.search(searchText)
                );
            });

            return productSearchUpdated;
        });
    }

    private static void initSearchRpc(Search search, Muon muon) {
        muon.handleRequest(path("/search"), requestWrapper -> {
            Map<String, String> searchArgs = requestWrapper.getRequest().getPayload(MuonCodecTypes.mapOf(String.class, String.class));

            Search.SearchResults results = search.search(
                    searchArgs.get("search"));

            requestWrapper.ok(results);
        });
    }

    private static Muon getMuon() {
        AutoConfiguration config = MuonConfigBuilder
                .withServiceIdentifier("product-search")
                .addWriter( autoConfiguration -> {
        if (System.getenv().containsKey("MUON_URL")) {
            autoConfiguration.getProperties().put("amqp.transport.url", System.getenv().get("MUON_URL"));
            autoConfiguration.getProperties().put("amqp.discovery.url", System.getenv().get("MUON_URL"));
        }
        }).build();

        return MuonBuilder.withConfig(config).build();
    }

}
