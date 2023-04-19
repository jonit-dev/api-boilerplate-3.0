#!/usr/bin/env bash

echo '🪄 MongoDB: Creating application user and db 🪄'

mongosh -- "$MONGO_INITDB_DATABASE" <<EOF
   use admin
db.auth('$MONGO_INITDB_ROOT_USERNAME', '$MONGO_INITDB_ROOT_PASSWORD')
use $MONGO_INITDB_DATABASE
db.createUser({ user: '$MONGO_INITDB_ROOT_USERNAME', pwd: '$MONGO_INITDB_ROOT_PASSWORD', roles: [
   { role: 'dbOwner', db: '$MONGO_INITDB_DATABASE' },
   ] })
EOF
