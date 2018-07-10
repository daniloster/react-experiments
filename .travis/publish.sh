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

  # Fixing conflict between yarn and npm
  npm rebuild node-sass

  update_docs() {
    yarn run doc
    yarn run styleguide:build
    git add docs/ packages/
    git commit -m "[skip ci] [update-docs]"
    git push gh-publish master
  }

  update_markdown() {
    yarn run update:readme
    git add README.md
    git commit -m "[skip ci] [update-readme]"
    git push gh-publish master
  }

  export TYPE_RELEASE="$(git log --no-merges -n 1 --pretty=%B | grep '\[release=' | awk '{print $1}' | sed s/release=//)"
  if [[ $TYPE_RELEASE == '[major]' ]]; then
    echo '** Releasing MAJOR'
    update_docs
    node_modules/.bin/lerna publish --cd-version=major --yes --exact --git-remote gh-publish --message="[skip ci] [release]: %s"
    update_markdown
  elif [[ $TYPE_RELEASE == '[minor]' ]]; then
    echo '** Releasing MINOR'
    update_docs
    node_modules/.bin/lerna publish --cd-version=minor --yes --exact --git-remote gh-publish --message="[skip ci] [release]: %s"
    update_markdown
  elif [[ $TYPE_RELEASE == '[patch]' ]]; then
    echo '** Releasing PATCH'
    update_docs
    node_modules/.bin/lerna publish --cd-version=patch --yes --exact --git-remote gh-publish --message="[skip ci] [release]: %s"
    update_markdown
  else
    echo '** NOT RELEASED'
  fi
fi