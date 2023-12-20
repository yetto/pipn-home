#!/bin/bash
SRCDIR="/home/ytt/repos/vod-ipn/playground/pipn-home"
DESTDIR="/home/ytt/repos/vod-ipn/playground/"
FILENAME=pipn-home-$(date +%-Y%-m%-d)-$(date +%-T).tgz
tar --exclude='node_modules' --create --gzip --file=$DESTDIR$FILENAME $SRCDIR