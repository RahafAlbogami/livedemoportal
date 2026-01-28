import { execSync } from 'child_process';
import { existsSync, rmSync, cpSync } from 'fs';
import { join } from 'path';

console.log('🚀 Starting deployment to GitHub Pages...\n');

// Step 1: Build the project
console.log('📦 Building project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed\n');
} catch (error) {
  console.error('❌ Build failed');
  process.exit(1);
}

// Step 2: Check current branch
const currentBranch = execSync('git branch --show-current', { encoding: 'utf-8' }).trim();
console.log(`📍 Current branch: ${currentBranch}\n`);

// Step 3: Stash any uncommitted changes
console.log('💾 Stashing uncommitted changes...');
try {
  execSync('git stash', { stdio: 'inherit' });
} catch (error) {
  // Stash might fail if there's nothing to stash, that's okay
}

// Step 4: Switch to gh-pages branch
console.log('🔄 Switching to gh-pages branch...');
try {
  execSync('git checkout gh-pages', { stdio: 'inherit' });
} catch (error) {
  // If gh-pages doesn't exist locally, create it from origin
  try {
    execSync('git checkout -b gh-pages origin/gh-pages', { stdio: 'inherit' });
  } catch (e) {
    execSync('git checkout --orphan gh-pages', { stdio: 'inherit' });
  }
}

// Step 5: Remove all files except .git, node_modules, .vite
console.log('🧹 Cleaning gh-pages branch...');
const filesToKeep = ['.git', 'node_modules', '.vite', '.github'];
const allFiles = execSync('git ls-files', { encoding: 'utf-8' }).split('\n').filter(Boolean);
allFiles.forEach(file => {
  if (!filesToKeep.some(keep => file.startsWith(keep))) {
    try {
      rmSync(file, { recursive: true, force: true });
    } catch (e) {
      // Ignore errors
    }
});

// Step 6: Copy dist contents to root
console.log('📋 Copying dist files to root...');
if (existsSync('dist')) {
  cpSync('dist', '.', { recursive: true });
  rmSync('dist', { recursive: true, force: true });
  console.log('✅ Files copied\n');
} else {
  console.error('❌ dist folder not found');
  process.exit(1);
}

// Step 7: Add and commit
console.log('📝 Committing changes...');
execSync('git add -f .', { stdio: 'inherit' });
try {
  execSync('git commit -m "Deploy to GitHub Pages"', { stdio: 'inherit' });
} catch (error) {
  console.log('ℹ️  No changes to commit');
}

// Step 8: Push to gh-pages
console.log('⬆️  Pushing to GitHub...');
execSync('git push origin gh-pages --force', { stdio: 'inherit' });

// Step 9: Switch back to original branch
console.log(`\n🔄 Switching back to ${currentBranch}...`);
execSync(`git checkout ${currentBranch}`, { stdio: 'inherit' });

console.log('\n✅ Deployment complete!');
console.log('🌐 Your site will be live at: https://rahafalbogami.github.io/livedemoportal/');
console.log('\n💡 Make sure GitHub Pages is enabled in repository settings:');
console.log('   https://github.com/RahafAlbogami/livedemoportal/settings/pages');

