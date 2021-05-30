#!/bin/bash
# sync data set and update it to the github repo
# Usage: sync.sh [path-to-git-repo]
set -ex
DATE=$(date '+%Y-%m-%d') 
echo "Jobs on ${DATE} start..."

tmpDirectory=$(mktemp -d)
echo "Working directory is at ${tmpDirectory}"
# 1. switch to working directory
cd $tmpDirectory
# 2. update source code to the latest main branch
git clone git@github.com:zvn/covid-visualizer.git
cd covid-visualizer
git submodule init
# 3. checkout into submodule, fetch latest main branch data
git submodule update --remote --merge
# 4. add and commit all changes
git checkout -b auto-data
git add data/COVID-19
git commit -m "Auto sync-data for ${DATE}"

# 5. merge all those changes back to main branch
# Yes... it's super ugly and dangerous. I will fix it when I have time with some APIs..
git checkout main
git merge auto-data
git push

# 6. remove temp directory
cd /tmp
rm -rf $tmpDirectory