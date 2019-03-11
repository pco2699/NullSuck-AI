#!/bin/bash

find ./k8s/* -type f -not -name concat.sh -not -name k8s.yml -exec cat {} \; -exec echo -e '\n---' \; > ./k8s.yml