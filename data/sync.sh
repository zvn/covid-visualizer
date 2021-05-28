#!/bin/bash
# sync data set and update it to the github repo
# Usage: sync.sh [path-to-git-repo] 
echo "hello"

tmpDirectory=$(mktemp -d)
echo "Working directory is at ${tmpDirectory}"
# 1. switch to working directory
cd $tmpDirectory
# 2. update source code to the latest master branch
#git submodule update
# 3. checkout into submodule, fetch latest master branch data
#cd data/COVID-19
#git checkout master
#git pull
# 4. back to top folder, add and commit all changes
# 5. merge all those changes back to master branch
# 6. push!
# 7. remove temp directory
cd /tmp
rm -rf $tmpDirectory