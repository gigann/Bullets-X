#!/bin/bash

echo ""

# Function to validate a port number
is_valid_port() {
  local port=$1
  if [[ "$port" =~ ^[0-9]+$ ]] && [ "$port" -ge 1 ] && [ "$port" -le 65535 ]; then
    return 0
  else
    return 1
  fi
}

# Function to read a value from an .env file
read_env_value() {
  local file=$1
  local key=$2
  if [ -f "$file" ] && [ -s "$file" ]; then
    value=$(awk -F= -v key="$key" '$1 == key {print $2}' "$file" | tr -d '\r')
    echo "$value"
  else
    echo ""
  fi
}

# Function to write or update a value in an .env file
write_to_env() {
  local file=$1
  local key=$2
  local value=$3
  local file_updated_var=$4
  local hide_value=$5 # New parameter to control visibility

  if [ ! -f "$file" ]; then
    touch "$file"
  fi

  if [ ! -w "$file" ]; then
    echo "❌ Error: No write permission for $file. Please check permissions and try again."
    echo ""
    exit 1
  fi

  if grep -q "^$key=" "$file"; then
    current_value=$(awk -F= -v key="$key" '$1 == key {print $2}' "$file" | tr -d '\r')
    if [ "$current_value" == "$value" ]; then
      return # No update needed
    fi
    # Update existing value (cross-platform sed)
    if [[ "$OSTYPE" == "darwin"* ]]; then
      sed -i '' "s|^$key=.*|$key=$value|" "$file"
    else
      sed -i "s|^$key=.*|$key=$value|" "$file"
    fi
  else
    echo "$key=$value" >>"$file"
  fi

  eval "$file_updated_var=true"

  # Avoid printing the actual value if hide_value is set
  if [ "$hide_value" = "true" ]; then
    echo "✅ Saved '$key' to $file."
    echo ""
  else
    echo "✅ Saved '$key=$value' to $file."
    echo ""
  fi
}

# Define the shared .env file
shared_env=".env"

# Track changes
env_updated=false

# Step 1: Get Client Port
clientPort=$(read_env_value "$shared_env" "CLIENT_PORT")
if [ -n "$clientPort" ]; then
  echo "ℹ️  Client port $clientPort already set in $shared_env. Skipping input."
else
  while [ -z "$clientPort" ]; do
    read -p "   Enter client port number (1-65535, default: 3000): " clientPort
    clientPort=${clientPort:-3000}
    if is_valid_port "$clientPort"; then
      write_to_env "$shared_env" "CLIENT_PORT" "$clientPort" "env_updated"
    else
      echo "❌ Invalid port. Please enter a number between 1 and 65535."
      echo ""
    fi
  done
fi

# Step 2: Get Server Port
serverPort=$(read_env_value "$shared_env" "SERVER_PORT")
if [ -n "$serverPort" ]; then
  echo "ℹ️  Server port $serverPort already set in $shared_env. Skipping input."
else
  while [ -z "$serverPort" ]; do
    read -p "   Enter server port number (1-65535, default: 3001): " serverPort
    serverPort=${serverPort:-3001}
    if is_valid_port "$serverPort" && [ "$serverPort" -ne "$clientPort" ]; then
      write_to_env "$shared_env" "SERVER_PORT" "$serverPort" "env_updated"
    else
      echo "❌ Invalid port or matches client port ($clientPort). Please enter a different port."
      echo ""
    fi
  done
fi

# Step 3: Get Database Port
dbPort=$(read_env_value "$shared_env" "DATABASE_PORT")
if [ -n "$dbPort" ]; then
  echo "ℹ️  Database port $dbPort already set in $shared_env. Skipping input."
else
  while [ -z "$dbPort" ]; do
    read -p "   Enter database port number (1-65535, default: 5432): " dbPort
    dbPort=${dbPort:-5432}
    if is_valid_port "$dbPort" && [ "$dbPort" -ne "$clientPort" ] && [ "$dbPort" -ne "$serverPort" ]; then
      write_to_env "$shared_env" "DATABASE_PORT" "$dbPort" "env_updated"
    else
      echo "❌ Invalid port or matches client/server port. Please enter a different port."
      echo ""
    fi
  done
fi

# Step 4: Get Database Username
dbUser=$(read_env_value "$shared_env" "USER_NAME")
if [ -n "$dbUser" ]; then
  echo "ℹ️  Database username already set in $shared_env. Skipping input."
else
  while [ -z "$dbUser" ]; do
    read -p "   Enter database username (default: postgres): " dbUser
    dbUser=${dbUser:-postgres}
    if [ -n "$dbUser" ]; then
      write_to_env "$shared_env" "USER_NAME" "$dbUser" "env_updated"
    else
      echo "❌ Username cannot be empty. Please enter a valid username."
      echo ""
    fi
  done
fi

# Step 5: Get Database Password
dbPassword=$(read_env_value "$shared_env" "USER_PASSWORD")
if [ -n "$dbPassword" ]; then
  echo "ℹ️  Database password already set in $shared_env. Skipping input."
else
  while [ -z "$dbPassword" ]; do
    read -s -p "   Enter database password (default: password): " dbPassword
    echo ""
    dbPassword=${dbPassword:-password}
    if [ -n "$dbPassword" ]; then
      write_to_env "$shared_env" "USER_PASSWORD" "$dbPassword" "env_updated" "true"
    else
      echo "❌ Password cannot be empty. Please enter a valid password."
      echo ""
    fi
  done
fi

# Step 6: Get Database Name
dbName=$(read_env_value "$shared_env" "DATABASE_NAME")
if [ -n "$dbName" ]; then
  echo "ℹ️  Database name already set in $shared_env. Skipping input."
else
  while [ -z "$dbName" ]; do
    read -p "   Enter database name (default: database): " dbName
    dbName=${dbName:-database}
    if [ -n "$dbName" ]; then
      write_to_env "$shared_env" "DATABASE_NAME" "$dbName" "env_updated"
    else
      echo "❌ Name cannot be empty. Please enter a valid database name."
      echo ""
    fi
  done
fi

# Display the updated environment variables
if [ "$env_updated" = true ]; then
  echo "✅ Configuration updated successfully in $shared_env."
  echo ""
else
  echo "ℹ️  No changes were made to the configuration file."
  echo ""
fi

# Optionally install dependencies
read -p "   Would you like to install the dependencies for the server and client? (y/n) (default: y): " installDeps
installDeps=${installDeps:-y}
if [[ "$installDeps" =~ ^[Yy]$ ]]; then
  echo ""
  echo "📦 Installing dependencies for the server..."
  npm install --prefix ./server && npm audit fix --prefix ./server

  echo ""
  echo "📦 Installing dependencies for the client..."
  npm install --prefix ./client && npm audit fix --prefix ./client

  echo ""
  echo "✅ Dependencies installed and security fixes applied."
  echo ""
else
  echo "⏭  Skipping dependency installation."
fi

rm -rf .github/
echo "✅ Cleaned up template files."
echo ""

echo "✅ Setup complete. You can now start the server and client."
echo ""
