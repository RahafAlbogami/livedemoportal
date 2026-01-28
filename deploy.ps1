# GitHub Pages Deployment Script for Windows PowerShell

Write-Host "🚀 Starting deployment to GitHub Pages...`n" -ForegroundColor Cyan

# Step 1: Build the project
Write-Host "📦 Building project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build completed`n" -ForegroundColor Green

# Step 2: Get current branch
$currentBranch = git branch --show-current
Write-Host "📍 Current branch: $currentBranch`n" -ForegroundColor Cyan

# Step 3: Stash uncommitted changes
Write-Host "💾 Stashing uncommitted changes..." -ForegroundColor Yellow
git stash | Out-Null

# Step 4: Switch to gh-pages branch
Write-Host "🔄 Switching to gh-pages branch..." -ForegroundColor Yellow
try {
    git checkout gh-pages 2>&1 | Out-Null
} catch {
    # If gh-pages doesn't exist, create it
    git checkout -b gh-pages origin/gh-pages 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        git checkout --orphan gh-pages
    }
}

# Step 5: Remove all files except .git, node_modules, .vite
Write-Host "🧹 Cleaning gh-pages branch..." -ForegroundColor Yellow
$files = git ls-files
foreach ($file in $files) {
    if ($file -and $file -notmatch '^\.git' -and $file -notmatch '^node_modules' -and $file -notmatch '^\.vite' -and $file -notmatch '^\.github') {
        Remove-Item -Path $file -Recurse -Force -ErrorAction SilentlyContinue
    }
}

# Step 6: Copy dist contents to root
Write-Host "📋 Copying dist files to root..." -ForegroundColor Yellow
if (Test-Path "dist") {
    Copy-Item -Path "dist\*" -Destination "." -Recurse -Force
    Remove-Item -Path "dist" -Recurse -Force
    Write-Host "✅ Files copied`n" -ForegroundColor Green
} else {
    Write-Host "❌ dist folder not found" -ForegroundColor Red
    exit 1
}

# Step 7: Add and commit
Write-Host "📝 Committing changes..." -ForegroundColor Yellow
git add -f .
$commitOutput = git commit -m "Deploy to GitHub Pages" 2>&1
if ($LASTEXITCODE -ne 0 -and $commitOutput -notmatch "nothing to commit") {
    Write-Host "ℹ️  No changes to commit" -ForegroundColor Yellow
}

# Step 8: Push to gh-pages
Write-Host "⬆️  Pushing to GitHub..." -ForegroundColor Yellow
git push origin gh-pages --force
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Push failed" -ForegroundColor Red
    exit 1
}

# Step 9: Switch back to original branch
Write-Host "`n🔄 Switching back to $currentBranch..." -ForegroundColor Yellow
git checkout $currentBranch

Write-Host "`n✅ Deployment complete!" -ForegroundColor Green
Write-Host "🌐 Your site will be live at: https://rahafalbogami.github.io/livedemoportal/" -ForegroundColor Cyan
Write-Host "`n💡 Make sure GitHub Pages is enabled in repository settings:" -ForegroundColor Yellow
Write-Host "   https://github.com/RahafAlbogami/livedemoportal/settings/pages" -ForegroundColor Yellow

