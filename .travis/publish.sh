#!/bin/bash
set -u

# Validating if it is a PR
if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo "- We are in a pull request, not releasing"
  exit 0
fi

# Checking if it is a master commit with release attribute
if [[ $TRAVIS_BRANCH == 'master' ]]; then
  echo '** Setting github user'
  git config --global user.email "daniloster@gmail.com"
  git config --global user.name "Danilo Castro"
  git remote add gh-publish "https://${GIT_AUTH_TOKEN}@github.com/daniloster/react-experiments.git"
  git fetch gh-publish
  git checkout master
  git rebase gh-publish/master

  echo '** Generating npm auth'
  echo "//registry.npmjs.org/:_authToken=${NPM_AUTH_TOKEN}" >> ~/.npmrc

  export TYPE_RELEASE="$(git log --no-merges -n 1 --pretty=%B | grep '\[release=' | awk '{print $1}' | sed s/release=//)"
  if [[ $TYPE_RELEASE == '[major]' ]]; then
    echo '** Releasing MAJOR'
    lerna publish --cd-version=major --yes --git-remote gh-publish --message="[skip ci] [release]: %s"
  elif [[ $TYPE_RELEASE == '[minor]' ]]; then
    echo '** Releasing MINOR'
    lerna publish --cd-version=minor --yes --git-remote gh-publish --message="[skip ci] [release]: %s"
  elif [[ $TYPE_RELEASE == '[patch]' ]]; then
    echo '** Releasing PATCH'
    lerna publish --cd-version=patch --yes --git-remote gh-publish --message="[skip ci] [release]: %s"
  else
    echo '** NOT RELEASED'
  fi
fi