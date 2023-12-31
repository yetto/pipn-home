#!/bin/bash

# Imports
. .env.sh --source-only

if [[ $1 = "main" ]]; then
  FRONT_REMOTE=$SSH_REMOTE:/var/www/maspreparacion.com
  BACK_REMOTE=$SSH_REMOTE:/var/www/cms.maspreparacion.com

elif [[ $1 = "staging" ]]; then
  FRONT_REMOTE=$SSH_REMOTE:/var/www/stg.maspreparacion.com
  BACK_REMOTE=$SSH_REMOTE:/var/www/stg.cms.maspreparacion.com

fi # END if arg #3

BACKUP_PATH=/data/backups/pipn/$(date +%Y%m%d)
mkdir -p $BACKUP_PATH

rsync -rlptgoDzi --progress --exclude='node_modules' -e "ssh" $FRONT_REMOTE  $BACKUP_PATH \
&& rsync -rlptgoDzi --progress --exclude='node_modules' -e "ssh" $BACK_REMOTE   $BACKUP_PATH;
