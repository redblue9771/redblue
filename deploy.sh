#! /bin/bash
# 用于Firebase国内部署
export http_proxy=http://127.0.0.1:9666
export https_proxy=http://127.0.0.1:9666
export
hugo & firebase deploy