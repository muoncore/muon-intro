FROM java:openjdk-8u45-jdk

MAINTAINER Simplicity Itself

RUN mkdir /applocal

COPY build/libs/product-search-1.0.jar /applocal/

WORKDIR /applocal

CMD /usr/bin/java -Xms150m -Xmx400m -jar /applocal/product-search-1.0.jar
