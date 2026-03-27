#!/usr/bin/env bash
# Dev Server Manager for arnaudwiehe.com
# Usage: ./devrestart.sh or source this file and run devrestart function

PROJECT_DIR="/Users/ai/.openclaw/workspace/projects/arnaudwiehe/www"
PORT_FILE="$PROJECT_DIR/.port"
START_PORT=3000
MAX_PORT=3010

devrestart() {
  local project_dir="${1:-$PROJECT_DIR}"
  local start_port="${2:-$START_PORT}"
  
  echo "🔄 Dev Server Manager"
  echo "─────────────────────"
  
  # Step 1: Kill all stale Next.js processes
  echo "🔍 Checking for stale Next.js processes..."
  local next_pids=$(pgrep -f "next dev" || echo "")
  if [ -n "$next_pids" ]; then
    echo "⚠️  Found Next.js processes: $next_pids"
    echo "$next_pids" | xargs kill -9 2>/dev/null
    echo "✅ Killed stale Next.js processes"
  else
    echo "✅ No stale Next.js processes found"
  fi
  
  # Also check for any node processes on common dev ports
  for port in $(seq $START_PORT $MAX_PORT); do
    local pid=$(lsof -ti :$port 2>/dev/null || echo "")
    if [ -n "$pid" ]; then
      echo "⚠️  Port $port in use by PID $pid, killing..."
      kill -9 $pid 2>/dev/null
    fi
  done
  
  sleep 1
  
  # Step 2: Find available port
  echo "🔍 Checking for available ports..."
  local available_port=""
  for port in $(seq $START_PORT $MAX_PORT); do
    if ! lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
      available_port=$port
      break
    fi
  done
  
  if [ -z "$available_port" ]; then
    echo "❌ No available ports found between $START_PORT-$MAX_PORT"
    return 1
  fi
  
  echo "✅ Found available port: $available_port"
  
  # Step 3: Save port to file
  echo "$available_port" > "$PORT_FILE"
  echo "📝 Port saved to .port file: $(cat $PORT_FILE)"
  
  # Step 4: Start dev server
  echo ""
  echo "🚀 Starting dev server on port $available_port..."
  echo "URL: http://localhost:$available_port"
  echo ""
  
  cd "$project_dir" || return 1
  PORT=$available_port npm run dev &
  
  local server_pid=$!
  echo $server_pid > "$PROJECT_DIR/.devserver.pid"
  
  sleep 2
  
  # Verify it started
  if ps -p $server_pid > /dev/null 2>&1; then
    echo "✅ Dev server running (PID: $server_pid)"
    echo ""
    echo "Quick commands:"
    echo "  killdev  - Kill the dev server"
    echo "  devport  - Show current port"
    echo ""
  else
    echo "❌ Failed to start dev server"
    return 1
  fi
}

# Function to kill dev server
killdev() {
  echo "🛑 Stopping dev server..."
  
  # Kill by PID file if exists
  if [ -f "$PROJECT_DIR/.devserver.pid" ]; then
    local pid=$(cat "$PROJECT_DIR/.devserver.pid")
    if ps -p $pid > /dev/null 2>&1; then
      kill -9 $pid 2>/dev/null
      echo "✅ Killed dev server (PID: $pid)"
    fi
    rm -f "$PROJECT_DIR/.devserver.pid"
  fi
  
  # Also kill any next dev processes
  local next_pids=$(pgrep -f "next dev" || echo "")
  if [ -n "$next_pids" ]; then
    echo "$next_pids" | xargs kill -9 2>/dev/null
    echo "✅ Killed Next.js processes"
  fi
  
  # Clean up port file
  rm -f "$PORT_FILE"
  echo "✅ Cleanup complete"
}

# Function to show current port
devport() {
  if [ -f "$PORT_FILE" ]; then
    local port=$(cat "$PORT_FILE")
    echo "🌐 Current dev server port: $port"
    echo "   URL: http://localhost:$port"
  else
    echo "⚠️  No active dev server found"
    echo "   Run 'devrestart' to start one"
  fi
}

# If script is run directly (not sourced)
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
  devrestart "$@"
fi