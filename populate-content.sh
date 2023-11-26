#!/bin/bash

if [ ! -d ./content/man ]
then
    curl -O https://neo-zhixing.github.io/vk-doc-md/dist.zip
    unzip -qq dist.zip
    mv dist ./content/man
    rm dist.zip
else
    echo "Refpages already exist"
fi
