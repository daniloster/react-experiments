#!/bin/bash

# Validating if it is a PR
if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo "** Validating commit message (requires attribute [release=<major|minor|patch>])"
  export COMMIT_MESSAGE="$(git log -n 1 --pretty=%B ${TRAVIS_PULL_REQUEST_SHA})"
  echo "${TRAVIS_PULL_REQUEST_SHA}: ${COMMIT_MESSAGE}"
  export TYPE_RELEASE="$(echo $COMMIT_MESSAGE | grep release= | awk '{print $1}' | sed s/release=//)"
  export IS_TYPE_RELEASE_MAJOR="$(echo $COMMIT_MESSAGE | grep =major | awk '{print $1}' | sed s/=major//)"
  export IS_TYPE_RELEASE_MINOR="$(echo $COMMIT_MESSAGE | grep =minor | awk '{print $1}' | sed s/=minor//)"
  export IS_TYPE_RELEASE_PATCH="$(echo $COMMIT_MESSAGE | grep =patch | awk '{print $1}' | sed s/=patch//)"
  export HAS_RELEASE="${IS_TYPE_RELEASE_MAJOR}${IS_TYPE_RELEASE_MINOR}${IS_TYPE_RELEASE_PATCH}"
  if [[ $HAS_RELEASE != '[release]' || ($TYPE_RELEASE != '[major]' && $TYPE_RELEASE != '[minor]' && $TYPE_RELEASE != '[patch]') ]]; then
    echo "[Error] There is no attribute release in this last commit"
    exit 1
  fi
  exit 0
fi