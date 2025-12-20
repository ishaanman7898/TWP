import os
from pathlib import Path
from supabase import create_client, Client
from PIL import Image
import io
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")  # Use service role for admin operations
BUCKET_NAME = "WebsiteLink"

if not SUPABASE_URL or not SUPABASE_KEY:
    raise Exception("Missing Supabase credentials in .env file")

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Files to upload from public folder (excluding team and product images)
FILES_TO_UPLOAD = [
    "public/HeroVideo.mp4",
    "public/favicon.png",
    "public/Thrive.png",
    "public/placeholder.svg",
    "public/ThriveSocial.png" if os.path.exists("ThriveSocial.png") else None,
    "ThriveSocial.png" if os.path.exists("ThriveSocial.png") else None,
    "VE.png" if os.path.exists("VE.png") else None,
]

# Filter out None values
FILES_TO_UPLOAD = [f for f in FILES_TO_UPLOAD if f and os.path.exists(f)]

def compress_image(file_path: str, quality: int = 85, max_width: int = 1920) -> bytes:
    """Compress image to reduce file size"""
    try:
        with Image.open(file_path) as img:
            # Convert RGBA to RGB if necessary
            if img.mode in ('RGBA', 'LA', 'P'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            
            # Resize if too large
            if img.width > max_width:
                ratio = max_width / img.width
                new_height = int(img.height * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
            # Save to bytes
            output = io.BytesIO()
            img.save(output, format='JPEG', quality=quality, optimize=True)
            return output.getvalue()
    except Exception as e:
        print(f"  ⚠ Could not compress {file_path}: {e}")
        # Return original file if compression fails
        with open(file_path, 'rb') as f:
            return f.read()

def compress_video(file_path: str) -> bytes:
    """For video, just read the file (compression would require ffmpeg)"""
    print(f"  ℹ Video compression requires ffmpeg - uploading original")
    with open(file_path, 'rb') as f:
        return f.read()

def create_bucket_if_not_exists():
    """Create the WebsiteLink bucket if it doesn't exist"""
    try:
        # Try to get bucket info
        buckets = supabase.storage.list_buckets()
        bucket_exists = any(bucket['name'] == BUCKET_NAME for bucket in buckets)
        
        if not bucket_exists:
            print(f"Creating bucket: {BUCKET_NAME}")
            supabase.storage.create_bucket(
                BUCKET_NAME,
                options={"public": True}  # Make bucket public
            )
            print(f"✓ Bucket '{BUCKET_NAME}' created successfully")
        else:
            print(f"✓ Bucket '{BUCKET_NAME}' already exists")
    except Exception as e:
        print(f"✗ Error with bucket: {e}")
        print(f"  You may need to create the bucket manually in Supabase Dashboard")

def upload_file(file_path: str):
    """Upload a file to Supabase Storage"""
    try:
        # Get file info
        file_name = os.path.basename(file_path)
        file_ext = Path(file_path).suffix.lower()
        file_size_mb = os.path.getsize(file_path) / (1024 * 1024)
        
        print(f"\n📁 Processing: {file_name} ({file_size_mb:.2f} MB)")
        
        # Compress if image
        if file_ext in ['.png', '.jpg', '.jpeg']:
            print(f"  🔄 Compressing image...")
            file_data = compress_image(file_path)
            compressed_size_mb = len(file_data) / (1024 * 1024)
            savings = ((file_size_mb - compressed_size_mb) / file_size_mb) * 100
            print(f"  ✓ Compressed: {compressed_size_mb:.2f} MB (saved {savings:.1f}%)")
            
            # Change extension to .jpg for compressed images
            if file_ext == '.png':
                file_name = file_name.replace('.png', '.jpg')
        
        elif file_ext in ['.mp4', '.webm', '.mov']:
            print(f"  📹 Processing video...")
            file_data = compress_video(file_path)
        
        else:
            # For other files (svg, etc), upload as-is
            print(f"  📄 Uploading as-is...")
            with open(file_path, 'rb') as f:
                file_data = f.read()
        
        # Upload to Supabase
        print(f"  ⬆ Uploading to Supabase...")
        response = supabase.storage.from_(BUCKET_NAME).upload(
            file_name,
            file_data,
            file_options={"content-type": get_content_type(file_name), "upsert": "true"}
        )
        
        # Get public URL
        public_url = supabase.storage.from_(BUCKET_NAME).get_public_url(file_name)
        
        print(f"  ✓ Uploaded successfully!")
        print(f"  🔗 Public URL: {public_url}")
        
        return public_url
        
    except Exception as e:
        print(f"  ✗ Error uploading {file_name}: {e}")
        return None

def get_content_type(file_name: str) -> str:
    """Get content type based on file extension"""
    ext = Path(file_name).suffix.lower()
    content_types = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.svg': 'image/svg+xml',
        '.mp4': 'video/mp4',
        '.webm': 'video/webm',
        '.mov': 'video/quicktime',
    }
    return content_types.get(ext, 'application/octet-stream')

def main():
    print("=" * 60)
    print("🚀 Supabase Asset Upload Script")
    print("=" * 60)
    print(f"Bucket: {BUCKET_NAME}")
    print(f"Files to upload: {len(FILES_TO_UPLOAD)}")
    print("=" * 60)
    
    # Create bucket if needed
    create_bucket_if_not_exists()
    
    # Upload each file
    uploaded_urls = {}
    for file_path in FILES_TO_UPLOAD:
        if os.path.exists(file_path):
            url = upload_file(file_path)
            if url:
                uploaded_urls[os.path.basename(file_path)] = url
        else:
            print(f"\n⚠ File not found: {file_path}")
    
    # Print summary
    print("\n" + "=" * 60)
    print("📊 UPLOAD SUMMARY")
    print("=" * 60)
    print(f"Total files uploaded: {len(uploaded_urls)}/{len(FILES_TO_UPLOAD)}")
    print("\n🔗 Public URLs:")
    for file_name, url in uploaded_urls.items():
        print(f"  {file_name}: {url}")
    
    print("\n" + "=" * 60)
    print("✅ Upload complete!")
    print("=" * 60)
    print("\nNext steps:")
    print("1. Update your code to use these Supabase URLs")
    print("2. Test that all assets load correctly")
    print("3. Delete local files from /public/ folder")
    print("4. Commit and push changes to reduce Vercel bandwidth")

if __name__ == "__main__":
    main()
