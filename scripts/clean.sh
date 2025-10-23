#!/bin/bash

# Monorepo Cleanup Script
# Cleans builds, node_modules, and reinstalls dependencies for any workspace
#
# Usage:
#   npm run clean               # Clean root only
#   npm run clean:mobile        # Clean mobile app
#   npm run clean:next          # Clean next app
#   npm run clean:all           # Clean everything
#
# Direct usage:
#   ./scripts/clean.sh                    # Clean root only
#   ./scripts/clean.sh mobile             # Clean mobile app
#   ./scripts/clean.sh next               # Clean next app
#   ./scripts/clean.sh all                # Clean everything
#   ./scripts/clean.sh mobile --quick     # Clean mobile (skip pod install)
#   ./scripts/clean.sh mobile --ios       # Clean iOS only

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Get script directory and project paths
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$( cd "$SCRIPT_DIR/.." && pwd )"

# Parse arguments
WORKSPACE="${1:-root}"
MODE="${2:-full}"

echo ""
echo -e "${CYAN}${BOLD}╔════════════════════════════════════════╗${NC}"
echo -e "${CYAN}${BOLD}║   Monorepo Cleanup Script             ║${NC}"
echo -e "${CYAN}${BOLD}╚════════════════════════════════════════╝${NC}"
echo ""

# Determine workspace path
case "$WORKSPACE" in
  mobile)
    WORKSPACE_DIR="$ROOT_DIR/apps/mobile"
    WORKSPACE_NAME="Mobile App"
    HAS_IOS=true
    HAS_ANDROID=true
    ;;
  next)
    WORKSPACE_DIR="$ROOT_DIR/apps/next"
    WORKSPACE_NAME="Next.js App"
    HAS_IOS=false
    HAS_ANDROID=false
    ;;
  storybook)
    WORKSPACE_DIR="$ROOT_DIR/apps/storybook"
    WORKSPACE_NAME="Storybook"
    HAS_IOS=false
    HAS_ANDROID=false
    ;;
  ui)
    WORKSPACE_DIR="$ROOT_DIR/packages/ui"
    WORKSPACE_NAME="UI Package"
    HAS_IOS=false
    HAS_ANDROID=false
    ;;
  app)
    WORKSPACE_DIR="$ROOT_DIR/packages/app"
    WORKSPACE_NAME="App Package"
    HAS_IOS=false
    HAS_ANDROID=false
    ;;
  root)
    WORKSPACE_DIR="$ROOT_DIR"
    WORKSPACE_NAME="Root"
    HAS_IOS=false
    HAS_ANDROID=false
    ;;
  all)
    WORKSPACE_DIR="all"
    WORKSPACE_NAME="All Workspaces"
    HAS_IOS=true
    HAS_ANDROID=true
    ;;
  *)
    echo -e "${RED}❌ Unknown workspace: $WORKSPACE${NC}"
    echo ""
    echo "Available workspaces:"
    echo "  - root       (root dependencies only)"
    echo "  - mobile     (mobile app)"
    echo "  - next       (Next.js app)"
    echo "  - storybook  (Storybook)"
    echo "  - ui         (UI package)"
    echo "  - app        (App package)"
    echo "  - all        (everything)"
    exit 1
    ;;
esac

# Determine mode
SKIP_POD_INSTALL=false
IOS_ONLY=false
DEPS_ONLY=false

if [ "$MODE" == "--quick" ]; then
  SKIP_POD_INSTALL=true
  MODE_NAME="Quick Clean"
elif [ "$MODE" == "--ios" ]; then
  IOS_ONLY=true
  MODE_NAME="iOS Only"
elif [ "$MODE" == "--deps" ]; then
  DEPS_ONLY=true
  MODE_NAME="Dependencies Only"
else
  MODE_NAME="Full Clean"
fi

echo -e "${BLUE}Target:${NC} $WORKSPACE_NAME"
echo -e "${BLUE}Mode:${NC}   $MODE_NAME"
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# ============================================================================
# Cleanup Functions
# ============================================================================

clean_node_modules() {
  local target_dir="$1"
  local name="$2"

  echo -e "${BLUE}📦 Cleaning node_modules in $name...${NC}"

  if [ -d "$target_dir/node_modules" ]; then
    echo "   Removing $target_dir/node_modules"
    rm -rf "$target_dir/node_modules"
    echo -e "   ${GREEN}✓${NC} node_modules cleaned"
  else
    echo "   ℹ️  node_modules not found"
  fi

  echo ""
}

clean_package_lock() {
  echo -e "${BLUE}🔒 Cleaning package-lock.json...${NC}"

  if [ -f "$ROOT_DIR/package-lock.json" ]; then
    echo "   Removing package-lock.json"
    rm -f "$ROOT_DIR/package-lock.json"
    echo -e "   ${GREEN}✓${NC} package-lock.json removed"
  else
    echo "   ℹ️  package-lock.json not found"
  fi

  echo ""
}

clean_next_cache() {
  local target_dir="$1"

  echo -e "${BLUE}⚡ Cleaning Next.js cache...${NC}"

  if [ -d "$target_dir/.next" ]; then
    echo "   Removing .next directory"
    rm -rf "$target_dir/.next"
    echo -e "   ${GREEN}✓${NC} .next cache cleaned"
  fi

  if [ -d "$target_dir/out" ]; then
    echo "   Removing out directory"
    rm -rf "$target_dir/out"
    echo -e "   ${GREEN}✓${NC} out directory cleaned"
  fi

  if [ -f "$target_dir/.next/trace" ]; then
    rm -f "$target_dir/.next/trace"
  fi

  echo ""
}

clean_ios() {
  local target_dir="$1"

  echo -e "${BLUE}🍎 Cleaning iOS artifacts...${NC}"

  if [ -d "$target_dir/ios" ]; then
    cd "$target_dir/ios"

    # Remove Pods
    if [ -d "Pods" ]; then
      echo "   Removing Pods directory"
      rm -rf Pods
      echo -e "   ${GREEN}✓${NC} Pods cleaned"
    fi

    # Remove Podfile.lock
    if [ -f "Podfile.lock" ]; then
      echo "   Removing Podfile.lock"
      rm -f Podfile.lock
      echo -e "   ${GREEN}✓${NC} Podfile.lock removed"
    fi

    # Remove build directories
    if [ -d "build" ]; then
      echo "   Removing build directory"
      rm -rf build
      echo -e "   ${GREEN}✓${NC} Build directory cleaned"
    fi

    # Remove DerivedData
    if [ -d "DerivedData" ]; then
      echo "   Removing DerivedData"
      rm -rf DerivedData
      echo -e "   ${GREEN}✓${NC} DerivedData cleaned"
    fi

    cd "$ROOT_DIR"
  else
    echo "   ℹ️  iOS directory not found"
  fi

  echo ""
}

clean_android() {
  local target_dir="$1"

  echo -e "${BLUE}🤖 Cleaning Android artifacts...${NC}"

  if [ -d "$target_dir/android" ]; then
    cd "$target_dir/android"

    # Remove build directories
    if [ -d "build" ]; then
      echo "   Removing build directory"
      rm -rf build
      echo -e "   ${GREEN}✓${NC} Build directory cleaned"
    fi

    # Remove app build
    if [ -d "app/build" ]; then
      echo "   Removing app/build directory"
      rm -rf app/build
      echo -e "   ${GREEN}✓${NC} App build cleaned"
    fi

    # Clean gradle cache
    if [ -d ".gradle" ]; then
      echo "   Removing .gradle cache"
      rm -rf .gradle
      echo -e "   ${GREEN}✓${NC} Gradle cache cleaned"
    fi

    cd "$ROOT_DIR"
  else
    echo "   ℹ️  Android directory not found"
  fi

  echo ""
}

clean_metro() {
  echo -e "${BLUE}🧹 Cleaning Metro bundler cache...${NC}"

  # Clean metro cache
  rm -rf /tmp/metro-* /tmp/haste-map-* /tmp/react-* 2>/dev/null || true

  echo -e "   ${GREEN}✓${NC} Metro cache cleared"
  echo ""
}

clean_watchman() {
  echo -e "${BLUE}👁️  Cleaning Watchman cache...${NC}"

  if command -v watchman &> /dev/null; then
    watchman watch-del-all 2>/dev/null || true
    echo -e "   ${GREEN}✓${NC} Watchman cache cleared"
  else
    echo "   ℹ️  Watchman not installed (optional)"
  fi

  echo ""
}

install_deps() {
  echo -e "${BLUE}📥 Installing dependencies...${NC}"

  cd "$ROOT_DIR"
  npm install

  echo -e "   ${GREEN}✓${NC} Dependencies installed"
  echo ""
}

pod_install() {
  local target_dir="$1"

  echo -e "${BLUE}☕ Running pod install...${NC}"

  if [ ! -d "$target_dir/ios" ]; then
    echo -e "   ${YELLOW}⚠️  iOS directory not found. Skipping pod install.${NC}"
    echo "   Run 'npx expo prebuild' first if this is an Expo project."
    echo ""
    return 0
  fi

  if [ -d "$target_dir/ios" ]; then
    cd "$target_dir/ios"

    # Check if CocoaPods is installed
    if ! command -v pod &> /dev/null; then
      echo -e "   ${RED}✗${NC} CocoaPods not installed"
      echo ""
      echo -e "${YELLOW}To install CocoaPods:${NC}"
      echo "   sudo gem install cocoapods"
      echo ""
      cd "$ROOT_DIR"
      return 1
    fi

    pod install
    echo -e "   ${GREEN}✓${NC} CocoaPods installed"

    cd "$ROOT_DIR"
  fi

  echo ""
}

# ============================================================================
# Main Execution
# ============================================================================

if [ "$WORKSPACE" == "all" ]; then
  # Clean all workspaces
  echo -e "${CYAN}Cleaning all workspaces...${NC}"
  echo ""

  # Clean root
  clean_node_modules "$ROOT_DIR" "Root"
  clean_package_lock

  # Clean all apps
  for app in mobile next storybook; do
    if [ -d "$ROOT_DIR/apps/$app" ]; then
      clean_node_modules "$ROOT_DIR/apps/$app" "apps/$app"

      if [ "$app" == "next" ]; then
        clean_next_cache "$ROOT_DIR/apps/$app"
      fi

      if [ "$app" == "mobile" ]; then
        clean_ios "$ROOT_DIR/apps/$app"
        clean_android "$ROOT_DIR/apps/$app"
      fi
    fi
  done

  # Clean all packages
  for pkg in ui app; do
    if [ -d "$ROOT_DIR/packages/$pkg" ]; then
      clean_node_modules "$ROOT_DIR/packages/$pkg" "packages/$pkg"
    fi
  done

  # Clean caches
  clean_metro
  clean_watchman

  # Install dependencies
  install_deps

  # Pod install for mobile
  if [ "$SKIP_POD_INSTALL" = false ]; then
    if [ -d "$ROOT_DIR/apps/mobile" ]; then
      pod_install "$ROOT_DIR/apps/mobile"
    fi
  fi

elif [ "$WORKSPACE" == "root" ]; then
  # Clean root only
  if [ "$DEPS_ONLY" = true ]; then
    clean_node_modules "$ROOT_DIR" "Root"
    clean_package_lock
    install_deps
  else
    clean_node_modules "$ROOT_DIR" "Root"
    clean_package_lock
    clean_metro
    clean_watchman
    install_deps
  fi

else
  # Clean specific workspace
  if [ ! -d "$WORKSPACE_DIR" ]; then
    echo -e "${RED}❌ Workspace directory not found: $WORKSPACE_DIR${NC}"
    exit 1
  fi

  if [ "$IOS_ONLY" = true ] && [ "$HAS_IOS" = true ]; then
    # iOS only mode
    clean_ios "$WORKSPACE_DIR"
    clean_metro
    pod_install "$WORKSPACE_DIR"

  elif [ "$DEPS_ONLY" = true ]; then
    # Dependencies only mode
    clean_node_modules "$ROOT_DIR" "Root"
    clean_node_modules "$WORKSPACE_DIR" "$WORKSPACE_NAME"
    clean_package_lock
    install_deps

  else
    # Full clean
    clean_node_modules "$ROOT_DIR" "Root"
    clean_node_modules "$WORKSPACE_DIR" "$WORKSPACE_NAME"
    clean_package_lock

    # Clean workspace-specific artifacts
    if [ "$WORKSPACE" == "next" ]; then
      clean_next_cache "$WORKSPACE_DIR"
    fi

    if [ "$HAS_IOS" = true ]; then
      clean_ios "$WORKSPACE_DIR"
    fi

    if [ "$HAS_ANDROID" = true ]; then
      clean_android "$WORKSPACE_DIR"
    fi

    clean_metro
    clean_watchman
    install_deps

    # Pod install if needed
    if [ "$SKIP_POD_INSTALL" = false ] && [ "$HAS_IOS" = true ]; then
      pod_install "$WORKSPACE_DIR"
    fi
  fi
fi

# Success message
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}${BOLD}✅ Cleanup complete!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Provide next steps based on workspace
if [ "$WORKSPACE" == "mobile" ] || [ "$WORKSPACE" == "all" ]; then
  echo -e "${BLUE}📱 Next steps for Mobile:${NC}"
  echo "   npm run dev:mobile"
  echo ""
fi

if [ "$WORKSPACE" == "next" ] || [ "$WORKSPACE" == "all" ]; then
  echo -e "${BLUE}🌐 Next steps for Next.js:${NC}"
  echo "   npm run dev:next"
  echo ""
fi

# Return to root directory
cd "$ROOT_DIR"
