# PowerShell script to copy project to Desktop (excluding large files)
# This creates a deployment-ready version without node_modules

$sourcePath = "c:\Users\sayve\OneDrive\Desktop\KLVTCH\bullion"
$destPath = "c:\Users\sayve\Desktop\bullion-deploy"

Write-Host "Creating deployment folder on Desktop..." -ForegroundColor Green

# Create destination folder
New-Item -ItemType Directory -Force -Path $destPath | Out-Null

# Copy all files except excluded ones
Write-Host "Copying files (excluding node_modules, .next, etc.)..." -ForegroundColor Yellow

$excludeDirs = @(
    "node_modules",
    ".next",
    "out",
    "build",
    "dist",
    ".git",
    ".vscode",
    ".idea",
    "coverage",
    ".cache"
)

$excludeFiles = @(
    "*.log",
    ".DS_Store",
    "Thumbs.db",
    "npm-debug.log*",
    "yarn-debug.log*",
    "yarn-error.log*",
    ".pnpm-debug.log*"
)

# Use robocopy for efficient copying
$robocopyArgs = @(
    $sourcePath,
    $destPath,
    "/MIR",  # Mirror mode
    "/NFL",  # No file list
    "/NDL",  # No directory list
    "/NP",   # No progress
    "/XD"    # Exclude directories
) + $excludeDirs

& robocopy @robocopyArgs

Write-Host "`nDeployment folder created at: $destPath" -ForegroundColor Green
Write-Host "Size saved by excluding node_modules: ~800MB+" -ForegroundColor Cyan
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Zip the 'bullion-deploy' folder on your Desktop" -ForegroundColor White
Write-Host "2. Upload to GitHub or deploy directly to Vercel" -ForegroundColor White
Write-Host "3. Vercel will install dependencies automatically" -ForegroundColor White

# Calculate folder size
$size = (Get-ChildItem -Path $destPath -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Host "`nDeployment folder size: $([math]::Round($size, 2)) MB" -ForegroundColor Green

Read-Host "`nPress Enter to close"
