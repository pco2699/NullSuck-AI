#!/bin/bash

find ${HOME}/k8s/* -type f -not -name concat.sh -not -name k8s.yml -exec cat {} \; -exec echo -e '\n---' \; > ${HOME}/k8s/k8s.yml