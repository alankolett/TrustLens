import sys
from pathlib import Path

# Add project root to sys.path so backend modules can be resolved
root_path = Path(__file__).resolve().parent.parent
if str(root_path) not in sys.path:
    sys.path.insert(0, str(root_path))

from backend.main import app

# Vercel serverless requires ASGI application object named app
__all__ = ["app"]
