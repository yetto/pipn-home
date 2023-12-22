#!/bin/bash
SRCDIR="/var/www/vod-prep-poli.elyetto.com/"
DESTDIR="/home/ytt/www-backup/"
FILENAME=vod-prep-poli-$(date +%-Y%-m%-d)-$(date +%-T).tgz
tar --create --gzip --file=$DESTDIR$FILENAME $SRCDIR