import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
BUCKET_NAME = "WebsiteLink"

if not SUPABASE_URL or not SUPABASE_KEY:
    raise Exception("Missing Supabase credentials in .env file")

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def upload_transparent_logo():
    """Upload Thrive.png with transparency preserved"""
    file_path = "public/Thrive.png"
    
    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")
        return
    
    print(f"📁 Uploading: {file_path}")
    
    # Read the PNG file (preserves transparency)
    with open(file_path, 'rb') as f:
        file_data = f.read()
    
    file_size_mb = len(file_data) / (1024 * 1024)
    print(f"  📊 Size: {file_size_mb:.2f} MB")
    
    try:
        # Upload to Supabase (overwrite existing)
        print(f"  ⬆ Uploading to Supabase...")
        response = supabase.storage.from_(BUCKET_NAME).upload(
            "Thrive.png",
            file_data,
            file_options={"content-type": "image/png", "upsert": "true"}
        )
        
        # Get public URL
        public_url = supabase.storage.from_(BUCKET_NAME).get_public_url("Thrive.png")
        
        print(f"  ✅ Uploaded successfully!")
        print(f"  🔗 Public URL: {public_url}")
        
        return public_url
        
    except Exception as e:
        print(f"  ❌ Error uploading: {e}")
        return None

if __name__ == "__main__":
    print("=" * 60)
    print("🎨 Upload Thrive Logo with Transparency")
    print("=" * 60)
    
    url = upload_transparent_logo()
    
    if url:
        print("\n" + "=" * 60)
        print("✅ Upload complete!")
        print("=" * 60)
        print("\nNew URL to use in your code:")
        print(f"  {url}")
        print("\nThis PNG preserves the transparent background!")
    else:
        print("\n❌ Upload failed")
