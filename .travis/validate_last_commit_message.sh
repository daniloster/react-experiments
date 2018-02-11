#!/bin/bash

# Validating if it is a PR
if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo "** Validating commit message (requires attribute [release=<major|minor|patch|no-release>])"
  export COMMIT_MESSAGE="$(git log -n 1 --pretty=%B ${TRAVIS_PULL_REQUEST_SHA})"
  echo "${TRAVIS_PULL_REQUEST_SHA}: ${COMMIT_MESSAGE}"
  export TYPE_RELEASE="$(echo $COMMIT_MESSAGE | grep release= | awk '{print $1}' | sed s/release=//)"
  export IS_TYPE_RELEASE_MAJOR="$(echo $COMMIT_MESSAGE | grep =major | awk '{print $1}' | sed s/=major//)"
  export IS_TYPE_RELEASE_MINOR="$(echo $COMMIT_MESSAGE | grep =minor | awk '{print $1}' | sed s/=minor//)"
  export IS_TYPE_RELEASE_PATCH="$(echo $COMMIT_MESSAGE | grep =patch | awk '{print $1}' | sed s/=patch//)"
  export IS_TYPE_RELEASE_NONE="$(echo $COMMIT_MESSAGE | grep =no-release | awk '{print $1}' | sed s/=no-release//)"
  export HAS_RELEASE="${IS_TYPE_RELEASE_MAJOR}${IS_TYPE_RELEASE_MINOR}${IS_TYPE_RELEASE_PATCH}${IS_TYPE_RELEASE_NONE}"
  if [[ $HAS_RELEASE != '[release]' || ($TYPE_RELEASE != '[major]' && $TYPE_RELEASE != '[minor]' && $TYPE_RELEASE != '[patch]' && $TYPE_RELEASE != '[no-release]') ]]; then
    echo "[Error] There is no attribute release in this last commit"
    exit 1
  fi
  echo "[Successful] Attribute is present in this last commit"
  exit 0
fi