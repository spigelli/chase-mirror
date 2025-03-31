#!/bin/bash

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
until PGPASSWORD=postgres psql -h localhost -U postgres -d commerce_bank -c '\q' 2>/dev/null; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done

echo "PostgreSQL is up - executing schema"

# Run the schema file
PGPASSWORD=postgres psql -h localhost -U postgres -d commerce_bank -f ./db/schema.sql

echo "Database schema has been set up successfully"