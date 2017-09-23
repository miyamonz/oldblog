#!bin/bash

cd `git rev-parse --show-toplevel`
node index.js
git checkout gh-pages
mv dst/index.html index.html
git add index.html
git commit -m 'deploy'
git push
git checkout master
