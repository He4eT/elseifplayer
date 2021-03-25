#! /bin/bash

CURRENT_TIMESTAMP=`date +"%Y-%m-%d-%H%M%S"`

GH_REPO_NAME='ifplayer'
RELEASE_BRANCH='release'
BUILD_DIR='docs'

git checkout master
git branch -D $RELEASE_BRANCH
git checkout -b $RELEASE_BRANCH

rm -rf ./$BUILD_DIR
npm run build /$GH_REPO_NAME

git add ./$BUILD_DIR
git commit -m "release: $CURRENT_TIMESTAMP"

git push -f origin $RELEASE_BRANCH

rm -rf ./$BUILD_DIR
git checkout master
