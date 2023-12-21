#!/bin/bash
mkdir tmp

wget https://raw.githubusercontent.com/Marktawa/blog-strapi-archives/main/seed-schema.tar
mv seed-schema.tar tmp/seed-schema.tar
tar xvf tmp/seed-schema.tar -C tmp
cp -r tmp/src ../


wget https://raw.githubusercontent.com/strapi/nextjs-corporate-starter/main/seed-data.tar.gz
mv seed-data.tar.gz tmp/seed-data.tar.gz
yarn strapi import -f ./scripts/tmp/seed-data.tar.gz

rm -rf tmp
