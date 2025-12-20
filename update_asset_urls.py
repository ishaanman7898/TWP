import os
import re

# Mapping of old local paths to new Supabase URLs
# Run upload_assets_to_supabase.py first to get these URLs
SUPABASE_URL_BASE = os.getenv("VITE_SUPABASE_URL", "https://quygevwkhlggdifdqqto.supabase.co")
BUCKET_NAME = "WebsiteLink"

# URL mappings (will be populated after upload)
URL_MAPPINGS = {
    "/HeroVideo.mp4": f"{SUPABASE_URL_BASE}/storage/v1/object/public/{BUCKET_NAME}/HeroVideo.mp4",
    "/favicon.png": f"{SUPABASE_URL_BASE}/storage/v1/object/public/{BUCKET_NAME}/favicon.jpg",  # Compressed to jpg
    "/Thrive.png": f"{SUPABASE_URL_BASE}/storage/v1/object/public/{BUCKET_NAME}/Thrive.jpg",  # Compressed to jpg
    "/placeholder.svg": f"{SUPABASE_URL_BASE}/storage/v1/object/public/{BUCKET_NAME}/placeholder.svg",
    "/ThriveSocial.png": f"{SUPABASE_URL_BASE}/storage/v1/object/public/{BUCKET_NAME}/ThriveSocial.jpg",  # Compressed to jpg
}

# Files to update
FILES_TO_UPDATE = [
    "src/components/Hero.tsx",
    "src/components/Footer.tsx",
    "index.html",
]

def update_file(file_path: str):
    """Update asset URLs in a file"""
    if not os.path.exists(file_path):
        print(f"⚠ File not found: {file_path}")
        return
    
    print(f"\n📝 Updating: {file_path}")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    changes_made = 0
    
    # Replace each URL
    for old_url, new_url in URL_MAPPINGS.items():
        if old_url in content:
            content = content.replace(old_url, new_url)
            changes_made += 1
            print(f"  ✓ Replaced: {old_url} → {new_url}")
    
    # Write back if changes were made
    if changes_made > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✅ Saved {changes_made} changes")
    else:
        print(f"  ℹ No changes needed")

def main():
    print("=" * 60)
    print("🔄 Asset URL Update Script")
    print("=" * 60)
    print("This script updates your code to use Supabase URLs")
    print("=" * 60)
    
    for file_path in FILES_TO_UPDATE:
        update_file(file_path)
    
    print("\n" + "=" * 60)
    print("✅ Update complete!")
    print("=" * 60)
    print("\nNext steps:")
    print("1. Test your website locally (npm run dev)")
    print("2. Verify all assets load from Supabase")
    print("3. Commit and push changes")
    print("4. Delete local files from /public/ to save space")

if __name__ == "__main__":
    main()
