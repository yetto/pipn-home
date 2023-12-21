#!/bin/bash
REMOTE=ytt:/var/www/pipn-home.elyetto.com/backend
#rsync -rlptgoDzi --progress ../.env -e "ssh" $REMOTE/.env
rsync -rlptgoDzi --progress ../.tmp/ -e "ssh" $REMOTE/.tmp/
rsync -rlptgoDzi --progress ../public/ -e "ssh" $REMOTE/public/
rsync -rlptgoDzi --progress ../src/ -e "ssh" $REMOTE/src/
