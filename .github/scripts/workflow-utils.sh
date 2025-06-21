#!/bin/bash

# 🔧 Portfolio CMS - CI/CD Workflow Utilities
# Common functions and utilities for GitHub Actions workflows

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're running in GitHub Actions
is_github_actions() {
    [[ "${GITHUB_ACTIONS:-}" == "true" ]]
}

# Add content to GitHub Step Summary if running in Actions
add_to_summary() {
    if is_github_actions; then
        echo "$1" >> "$GITHUB_STEP_SUMMARY"
    else
        echo "$1"
    fi
}

# Set GitHub Actions output
set_output() {
    if is_github_actions; then
        echo "$1=$2" >> "$GITHUB_OUTPUT"
    else
        echo "Output: $1=$2"
    fi
}

# Check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Validate Node.js version
validate_node_version() {
    local required_version=${1:-18}
    local current_version
    
    if ! command_exists node; then
        log_error "Node.js is not installed"
        return 1
    fi
    
    current_version=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    
    if [[ "$current_version" -lt "$required_version" ]]; then
        log_error "Node.js version $required_version or higher is required. Current: v$current_version"
        return 1
    fi
    
    log_success "Node.js version: v$(node --version | cut -d'v' -f2)"
    return 0
}

# Install dependencies with retry logic
install_dependencies() {
    local max_retries=${1:-3}
    local retry_count=0
    
    while [[ $retry_count -lt $max_retries ]]; do
        log_info "Installing dependencies (attempt $((retry_count + 1))/$max_retries)..."
        
        if npm ci --prefer-offline --no-audit; then
            log_success "Dependencies installed successfully"
            return 0
        else
            retry_count=$((retry_count + 1))
            if [[ $retry_count -lt $max_retries ]]; then
                log_warning "Installation failed, retrying in 5 seconds..."
                sleep 5
            fi
        fi
    done
    
    log_error "Failed to install dependencies after $max_retries attempts"
    return 1
}

# Check if workspace has changes
workspace_has_changes() {
    local workspace=$1
    local base_sha=${2:-""}
    local head_sha=${3:-""}
    
    if [[ -z "$base_sha" || -z "$head_sha" ]]; then
        # If no SHAs provided, assume changes exist
        return 0
    fi
    
    local changes
    changes=$(git diff --name-only "$base_sha..$head_sha" | grep -E "^apps/$workspace/" | wc -l)
    
    if [[ $changes -gt 0 ]]; then
        log_info "Workspace '$workspace' has $changes changed files"
        return 0
    else
        log_info "Workspace '$workspace' has no changes"
        return 1
    fi
}

# Build workspace
build_workspace() {
    local workspace=$1
    local build_cmd=${2:-"build"}
    
    log_info "Building workspace: $workspace"
    
    if npm run "$build_cmd" --workspace="apps/$workspace"; then
        log_success "Workspace '$workspace' built successfully"
        
        # Verify build output
        case $workspace in
            "api")
                if [[ -d "apps/api/dist" ]]; then
                    log_success "API build output verified"
                else
                    log_error "API build output not found"
                    return 1
                fi
                ;;
            "web")
                if [[ -d "apps/web/.next" ]]; then
                    log_success "Web build output verified"
                else
                    log_error "Web build output not found"
                    return 1
                fi
                ;;
        esac
        
        return 0
    else
        log_error "Failed to build workspace: $workspace"
        return 1
    fi
}

# Run tests for workspace
test_workspace() {
    local workspace=$1
    local test_type=${2:-"test"}
    
    log_info "Running $test_type for workspace: $workspace"
    
    if npm run "$test_type" --workspace="apps/$workspace"; then
        log_success "Tests passed for workspace: $workspace"
        return 0
    else
        log_error "Tests failed for workspace: $workspace"
        return 1
    fi
}

# Check Docker image health
check_docker_health() {
    local container_name=$1
    local max_attempts=${2:-30}
    local wait_time=${3:-2}
    
    log_info "Checking health of container: $container_name"
    
    for ((i=1; i<=max_attempts; i++)); do
        if docker ps | grep -q "$container_name"; then
            log_success "Container '$container_name' is running"
            return 0
        fi
        
        if [[ $i -eq $max_attempts ]]; then
            log_error "Container '$container_name' failed to start after $((max_attempts * wait_time)) seconds"
            
            # Show container logs for debugging
            log_info "Container logs:"
            docker logs "$container_name" 2>&1 || true
            
            return 1
        fi
        
        sleep $wait_time
    done
}

# Calculate PR complexity score
calculate_pr_complexity() {
    local added_lines=${1:-0}
    local deleted_lines=${2:-0}
    local changed_files=${3:-0}
    
    local total_lines=$((added_lines + deleted_lines))
    local complexity_score=$(( (total_lines / 100) + (changed_files * 2) ))
    
    echo "$complexity_score"
}

# Analyze PR size and complexity
analyze_pr() {
    local base_sha=$1
    local head_sha=$2
    
    log_info "Analyzing PR changes..."
    
    # Get diff stats
    local diff_stats
    diff_stats=$(git diff --shortstat "$base_sha..$head_sha")
    
    local added_lines=0
    local deleted_lines=0
    local changed_files
    
    if [[ -n "$diff_stats" ]]; then
        added_lines=$(echo "$diff_stats" | grep -oE '[0-9]+ insertions' | grep -oE '[0-9]+' || echo "0")
        deleted_lines=$(echo "$diff_stats" | grep -oE '[0-9]+ deletions' | grep -oE '[0-9]+' || echo "0")
    fi
    
    changed_files=$(git diff --name-only "$base_sha..$head_sha" | wc -l)
    
    local pr_size=$((added_lines + deleted_lines))
    local complexity_score
    complexity_score=$(calculate_pr_complexity "$added_lines" "$deleted_lines" "$changed_files")
    
    # Set outputs
    set_output "added_lines" "$added_lines"
    set_output "deleted_lines" "$deleted_lines"
    set_output "changed_files" "$changed_files"
    set_output "pr_size" "$pr_size"
    set_output "complexity_score" "$complexity_score"
    
    log_info "PR Analysis Results:"
    log_info "  Added lines: $added_lines"
    log_info "  Deleted lines: $deleted_lines"
    log_info "  Changed files: $changed_files"
    log_info "  Total size: $pr_size"
    log_info "  Complexity score: $complexity_score"
}

# Check environment variables
check_required_env() {
    local vars=("$@")
    local missing=()
    
    for var in "${vars[@]}"; do
        if [[ -z "${!var:-}" ]]; then
            missing+=("$var")
        fi
    done
    
    if [[ ${#missing[@]} -gt 0 ]]; then
        log_error "Missing required environment variables: ${missing[*]}"
        return 1
    fi
    
    log_success "All required environment variables are set"
    return 0
}

# Main function for testing
main() {
    if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
        log_info "Portfolio CMS Workflow Utilities"
        log_info "This script provides common functions for CI/CD workflows"
        
        # Example usage
        validate_node_version 18
        
        if command_exists git; then
            log_success "Git is available"
        else
            log_warning "Git is not available"
        fi
        
        if command_exists docker; then
            log_success "Docker is available"
        else
            log_warning "Docker is not available"
        fi
    fi
}

# Run main if script is executed directly
main "$@"
