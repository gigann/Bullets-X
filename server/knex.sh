#!/bin/bash

# Exit immediately if a command fails
set -e

# Function to create and rename migration or seed files with index
create_files() {
  local type=$1
  shift
  local files=("$@")

  # Ensure the target directory exists
  mkdir -p "$type"

  # Get the highest existing index in the directory
  local next_index=$(ls "$type"/*.js 2>/dev/null | wc -l)

  echo ""
  echo "📦 Generating $type files..."
  echo ""

  for name in "${files[@]}"; do
    echo "ℹ️  Creating $type for: $name"

    # Capture pre-existing files to detect new ones
    before_files=$(ls "$type" 2>/dev/null)

    # Generate migration or seed file while suppressing environment messages
    if [[ "$type" == "seeds" ]]; then
      output=$(npx knex seed:make "$name" 2>&1 | grep -v "Using environment")
    else
      output=$(npx knex migrate:make "$name" 2>&1 | grep -v "Using environment")
    fi

    # Output result for debugging
    echo "   $output"

    # Wait for a new file to appear
    while true; do
      after_files=$(ls "$type" 2>/dev/null)
      new_file=$(comm -13 <(echo "$before_files") <(echo "$after_files") | head -n 1)

      if [[ -n "$new_file" ]]; then
        break
      fi
      sleep 0.1 # Small delay to prevent CPU overuse
    done

    # Check if the generated file exists
    if [ -f "$type/$new_file" ]; then
      # Format and rename the file with an incrementing index
      new_file_path="$type/$(printf "%02d" $next_index)_$new_file"
      mv "$type/$new_file" "$new_file_path"
      echo "✅ Created $type: $new_file_path"
      echo ""
    else
      echo "❌ $type file for '$name' not found after generation."
      exit 1
    fi

    # Increment the index
    ((next_index++))
  done
}

# If no arguments are provided, run migrations, rollback, and seeding
if [ $# -eq 0 ]; then
  echo "ℹ️  Rolling back last migration..."
  npx knex migrate:rollback
  echo ""

  echo "ℹ️  Running migrations..."
  npx knex migrate:latest
  echo ""

  sleep 1

  echo "ℹ️  Seeding database..."
  npx knex seed:run
  echo ""

  echo "✅ Migrations, rollback, and seeding completed successfully."
  echo ""
  exit 0
fi

# Process the provided arguments and generate both migration and seed files
create_files "migrations" "$@"
create_files "seeds" "$@"

echo "✅ Migrations and Seeding created successfully."
