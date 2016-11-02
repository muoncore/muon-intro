package com.simplicityitself.mucon;

import com.google.gson.Gson;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.Client;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.node.Node;
import org.elasticsearch.node.NodeBuilder;
import org.elasticsearch.search.SearchHit;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Search {

    private String index = "product";
    private String type = "product";

    private Node node;
    private Client client;

    private Gson gson = new Gson();

    public Search() throws IOException {
        NodeBuilder build = NodeBuilder.nodeBuilder();

        File f = File.createTempFile("elastic", "search");
        f.delete();
        f.mkdirs();

        build.settings()
                .put("path.home", f.getAbsolutePath());

        node = build.clusterName("product-search")
                .data(true).local(true).node();
        client = node.client();
    }

    public SearchResults search(String text) {
        long then = System.currentTimeMillis();

        try {
            SearchResponse ret = client.prepareSearch(index)
                    .setSize(9)
                    .setQuery(QueryBuilders.simpleQueryStringQuery(text))
                    .execute().actionGet();

            List<Map> vals = Arrays.asList(ret.getHits().getHits()).stream().map(SearchHit::getSource).collect(Collectors.toList());

            return new SearchResults(
                    System.currentTimeMillis() - then,
                    text,
                    vals);
        } catch (Exception ex) {
            return new SearchResults(
                    System.currentTimeMillis() - then,
                    text + " FAILED TO SEARCH " + ex.getMessage(),
                    new ArrayList<Map>());
        }
    }

    public void addProduct(Map productData) {
        String json = gson.toJson(productData);

        client.prepareIndex(index, type)
                .setSource(json)
                .setId((String) productData.get("product-id"))
                .get();
    }

    static class SearchResults {
        private long timeTaken;
        private String searchText;
        private List<Map> results;

        public SearchResults(long timeTaken, String searchText, List<Map> results) {
            this.timeTaken = timeTaken;
            this.searchText = searchText;
            this.results = results;
        }

        public long getTimeTaken() {
            return timeTaken;
        }

        public String getSearchText() {
            return searchText;
        }

        public List<Map> getResults() {
            return results;
        }
    }
}
