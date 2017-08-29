#!/bin/bash
set -e
# Validating if it is a PR
if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo "- We are in a pull request, not releasing"
  export TYPE_RELEASE="$(git log -1 --pretty=%B | grep release= | awk '{print $1}' | sed s/release=//)"
  if [[ $TYPE_RELEASE != '[major]' ]] && [[ $TYPE_RELEASE != '[minor]' ]] && [[ $TYPE_RELEASE != '[patch]' ]]; then
    exit 1
  fi
  exit 0
fi

# Checking if it is a master commit with release attribute
if [[ $TRAVIS_BRANCH == 'master' ]]; then
  echo '** Generating npm auth'
  echo "//registry.npmjs.org/:_authToken=$NPM_AUTH_TOKEN" >> ~/.npmrc
  export TYPE_RELEASE="$(git log -1 --pretty=%B | grep release= | awk '{print $1}' | sed s/release=//)"
  if [[ $TYPE_RELEASE == '[major]' ]]; then
    echo '** Releasing MAJOR'
    lerna publish --cd-version=major --yes --message="[skip ci] [release]: %s"
  elif [[ $TYPE_RELEASE == '[minor]' ]]; then
    echo '** Releasing MINOR'
    lerna publish --cd-version=minor --yes --message="[skip ci] [release]: %s"
  elif [[ $TYPE_RELEASE == '[patch]' ]]; then
    echo '** Releasing PATCH'
    lerna publish --cd-version=patch --yes --message="[skip ci] [release]: %s"
  fi
fi