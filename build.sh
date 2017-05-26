#!/bin/sh

export PATH=$PATH:/bin:/usr/bin:/usr/local/bin

bundle install --path vendor/bundle
bundle exec jekyll build
