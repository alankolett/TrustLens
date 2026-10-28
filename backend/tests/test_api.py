"""Integration tests for TrustLens FastAPI endpoints."""
import io
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_health():
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json()["status"] == "ok"

def test_get_samples():
    res = client.get("/samples")
    assert res.status_code == 200
    data = res.json()
    assert isinstance(data, list)
    assert len(data) >= 10
    sample_ids = [s["id"] for s in data]
    assert "digital_arrest_en" in sample_ids
    assert "fake_mseb_bill_mr" in sample_ids

def test_check_text_scam_marathi():
    res = client.post("/api/check-text", json={
        "text": "महावितरण: तुमचे वीज बिल भरले नाही म्हणून आज रात्री वीज पुरवठा खंडित केला जाईल. तात्काळ कॉल करा.",
        "language": "mr"
    })
    assert res.status_code == 200
    data = res.json()
    assert data["verdict"] in ("red", "amber")
    assert "ट्रस्टलेन्स हे सहाय्यक साधन आहे" in data["disclaimer"]
    assert len(data["reasons"]) > 0

def test_check_text_safe_hindi():
    res = client.post("/api/check-text", json={
        "text": "नमस्ते दीदी, आप सभी को दिवाली की हार्दिक शुभकामनाएं! घर पर सब कैसे हैं?",
        "language": "hi"
    })
    assert res.status_code == 200
    data = res.json()
    assert data["verdict"] == "green"
    assert "ट्रस्टलेंस एक सहायक साधन है" in data["disclaimer"]

def test_check_image_valid_jpeg():
    # Construct a valid minimal 1x1 JPEG with magic bytes FF D8 FF
    from PIL import Image
    buf = io.BytesIO()
    img = Image.new("RGB", (100, 100), color="blue")
    img.save(buf, format="JPEG")
    image_bytes = buf.getvalue()

    res = client.post(
        "/api/check-image",
        data={"language": "en"},
        files={"file": ("test.jpg", image_bytes, "image/jpeg")}
    )
    assert res.status_code == 200
    data = res.json()
    assert "verdict" in data
    assert "metadata" in data
    assert data["metadata"]["format"] == "JPEG"

def test_check_image_invalid_magic_bytes():
    # Pass arbitrary bytes with .jpg extension to test magic-byte rejection
    fake_bytes = b"NOT_A_REAL_IMAGE_FILE_DATA_HERE"
    res = client.post(
        "/api/check-image",
        data={"language": "en"},
        files={"file": ("fake.jpg", fake_bytes, "image/jpeg")}
    )
    assert res.status_code == 415
    assert "Unsupported or malformed" in res.json()["detail"]
