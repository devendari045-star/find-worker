from pathlib import Path
import zipfile

src = Path("/mnt/data/app (9) - fixed.js")
fixed = Path("/mnt/data/findworker_fixed.js")
zip_path = Path("/mnt/data/findworker_fixed.zip")

fixed.write_text(src.read_text(encoding="utf-8"), encoding="utf-8")

with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as z:
    z.write(fixed, arcname="findworker_fixed.js")

print("FIXED FILE READY")
print(fixed)
print(zip_path)
