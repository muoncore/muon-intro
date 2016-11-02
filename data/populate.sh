#!/usr/bin/env bash

#cat products.json | muon event

muon event '{ "event-type": "ProductAdded", "schema": "http://www.simplicityitself.io/mucon/product/1","stream-name": "products","service-id": "creating-service","payload": {"product-name": "Blue Dress 1","product-id": "1","description": "Blue Dress"}}'
muon event '{ "event-type": "ProductAdded", "schema": "http://www.simplicityitself.io/mucon/product/1","stream-name": "products","service-id": "creating-service","payload": {"product-name": "Blue Dress 2","product-id": "2","description": "Blue Dress"}}'
muon event '{ "event-type": "ProductAdded", "schema": "http://www.simplicityitself.io/mucon/product/1","stream-name": "products","service-id": "creating-service","payload": {"product-name": "Red Dress 1","product-id": "3","description": "Blue Dress"}}'
muon event '{ "event-type": "ProductAdded", "schema": "http://www.simplicityitself.io/mucon/product/1","stream-name": "products","service-id": "creating-service","payload": {"product-name": "Green Tux1","product-id": "4","description": "Blue Dress"}}'
muon event '{ "event-type": "ProductAdded", "schema": "http://www.simplicityitself.io/mucon/product/1","stream-name": "products","service-id": "creating-service","payload": {"product-name": "Octagon Trousers","product-id": "5","description": "Blue Dress"}}'
muon event '{ "event-type": "ProductAdded", "schema": "http://www.simplicityitself.io/mucon/product/1","stream-name": "products","service-id": "creating-service","payload": {"product-name": "Happy Cheese","product-id": "6","description": "Blue Dress"}}'
muon event '{ "event-type": "ProductAdded", "schema": "http://www.simplicityitself.io/mucon/product/1","stream-name": "products","service-id": "creating-service","payload": {"product-name": "Radishes","product-id": "7","description": "A reddish vegetable"}}'
