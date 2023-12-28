#!/bin/bash

# Imports
. .env.sh --source-only

if [[ $1 = "main" ]]; then
  FRONT_REMOTE=$SSH_REMOTE:/var/www/maspreparacion.com/frontend/
  BACK_REMOTE=$SSH_REMOTE:/var/www/cms.maspreparacion.com/backend/

elif [[ $1 = "staging" ]]; then
  FRONT_REMOTE=$SSH_REMOTE:/var/www/stg.maspreparacion.com/frontend/
  BACK_REMOTE=$SSH_REMOTE:/var/www/stg.cms.maspreparacion.com/backend/

fi # END if arg #3

FRONT_LOCAL='../frontend/'
BACK_LOCAL='../backend/'

rsync -rlptgoDzi --progress --exclude='node_modules' -e "ssh" $FRONT_REMOTE  $FRONT_LOCAL \
&& rsync -rlptgoDzi --progress --exclude='node_modules' -e "ssh" $BACK_REMOTE   $BACK_LOCAL;
