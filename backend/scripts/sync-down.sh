#!/bin/bash
REMOTE=ytt:/var/www/vod-prep-poli.elyetto.com
rsync -rlptgoDzi --progress -e "ssh" $REMOTE/.env ../.env
rsync -rlptgoDzi --progress -e "ssh" $REMOTE/.tmp/ ../.tmp/
rsync -rlptgoDzi --progress -e "ssh" $REMOTE/src/ ../src/
rsync -rlptgoDzi --progress -e "ssh" $REMOTE/public/ ../public/