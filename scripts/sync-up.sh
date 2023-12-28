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

FRONT_LOCAL='../frontend'
BACK_LOCAL='../backend'

rsync -rlptgoDzi --progress --dry-run --exclude='node_modules' $FRONT_LOCAL -e "ssh" $FRONT_REMOTE \
&& rsync -rlptgoDzi --progress --dry-run --exclude='node_modules' $BACK_LOCAL  -e "ssh" $BACK_REMOTE
