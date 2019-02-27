#!/bin/bash
# 用于Now部署
yum install -y wget

HUGO_VERSION=0.54.0
HUGO_TAR=hugo_${HUGO_VERSION}_Linux-64bit.tar.gz
HUGO_DL=https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/${HUGO_TAR}

wget ${HUGO_DL}
tar -xvzf hugo*.tar.gz

# Build with hugo-cli
./hugo