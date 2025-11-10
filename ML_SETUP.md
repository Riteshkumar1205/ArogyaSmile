# ArogyaSmile - ML Model Setup Guide

This guide explains how to set up and train the oral disease detection model using the Kaggle dataset.

## Overview

ArogyaSmile uses a TensorFlow/Keras model to detect oral diseases from images including:
- Cavities
- Plaque
- Gum Inflammation
- Tooth Decay
- Discoloration
- Ulcers

## System Architecture

```
Frontend (React)
    ↓
Express Server (Node.js)
    ↓
FastAPI Backend (Python) ← ML Model
    ↓
TensorFlow/Keras Model
```

## Prerequisites

### For Frontend & Backend
- Node.js 16+ and npm/pnpm
- Already setup in this project

### For ML Model Training
- Python 3.8+
- pip (Python package manager)

## Step 1: Install Python Dependencies

```bash
# Create a Python virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install ML dependencies
pip install tensorflow>=2.12.0
pip install keras>=2.12.0
pip install numpy>=1.22.0
pip install pillow>=9.0.0
pip install pandas>=1.4.0
pip install scikit-learn>=1.1.0
pip install kaggle>=1.5.12
pip install fastapi>=0.95.0
pip install uvicorn>=0.21.0
pip install python-multipart>=0.0.5
```

## Step 2: Setup Kaggle API

### Option A: Using Kaggle.com UI
1. Go to https://www.kaggle.com/settings/account
2. Click "Create New API Token"
3. This downloads `kaggle.json`
4. Place it in `~/.kaggle/kaggle.json`

### Option B: Manual Configuration
If you have an API key:

```bash
mkdir -p ~/.kaggle
echo '{"username":"YOUR_USERNAME","key":"YOUR_API_KEY"}' > ~/.kaggle/kaggle.json
chmod 600 ~/.kaggle/kaggle.json
```

## Step 3: Download the Dataset

```bash
# Option 1: Using the trainer script with your API key
python server/ml/kaggle_trainer.py --api-key "YOUR_API_KEY" --download

# Option 2: Manual download
cd data/raw
kaggle datasets download -d salmansajid05/oral-diseases
unzip oral-diseases.zip
cd ../..
```

The dataset will be downloaded to `data/raw/`.

## Step 4: Prepare the Dataset

```bash
# Organize and prepare the data
python server/ml/kaggle_trainer.py --prepare

# This will:
# - Organize images by disease class
# - Create train/val/test splits (70/15/15)
# - Resize images to 224x224
# - Create metadata JSON
```

## Step 5: Train the Model

```bash
# Train the model
python server/ml/kaggle_trainer.py --train --epochs 20 --batch-size 32

# Options:
# --epochs: Number of training epochs (default: 20)
# --batch-size: Batch size for training (default: 32)
```

**Training Time Estimate:**
- CPU: 2-4 hours
- GPU (NVIDIA CUDA): 30-60 minutes
- Google Colab (Free): 45-90 minutes

**Expected Output:**
- Model saved to `models/oral_disease_detector.h5`
- Training logs and metrics
- Validation accuracy ~80-90%

## Step 6 (Optional): Evaluate the Model

```bash
# Evaluate on test set
python server/ml/kaggle_trainer.py --evaluate
```

## Step 7: Create FastAPI Backend

Create `server/ml/api.py`:

```python
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from model import OralDiseaseDetector, HealthRecommendations
import tempfile
import os

app = FastAPI(title="ArogyaSmile ML API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
MODEL_PATH = "models/oral_disease_detector.h5"
if os.path.exists(MODEL_PATH):
    detector = OralDiseaseDetector(MODEL_PATH)
else:
    detector = OralDiseaseDetector()

@app.post("/api/predict")
async def predict(image: UploadFile = File(...), language: str = "en-IN"):
    """Predict oral diseases from an image."""
    try:
        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False) as tmp:
            tmp.write(await image.read())
            tmp_path = tmp.name
        
        # Make prediction
        results = detector.predict(tmp_path)
        
        # Generate report
        report = HealthRecommendations.generate_report(results, language)
        
        # Clean up
        os.unlink(tmp_path)
        
        return JSONResponse({
            "success": True,
            "data": {
                **results,
                "report": report
            }
        })
    except Exception as e:
        return JSONResponse({"success": False, "error": str(e)}, status_code=500)

@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "ok", "model_loaded": detector.model is not None}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

## Step 8: Run FastAPI Server (Development)

```bash
# Install FastAPI
pip install fastapi uvicorn

# Run the server
python server/ml/api.py

# Server will start at http://localhost:8000
# API docs at http://localhost:8000/docs
```

## Step 9: For Quick Testing (Demo Mode)

If you want to test the UI without training:

```bash
# Create a demo model with random weights
python server/ml/kaggle_trainer.py --demo

# This will:
# - Create a model with ImageNet pretrained weights
# - Not require the Kaggle dataset
# - Be ready for immediate testing
```

## Integration with Express Server

The Express server will automatically:
1. Accept image uploads at `/api/scan/upload`
2. Forward to FastAPI backend (in production)
3. Return analysis results to frontend

## Environment Variables

Add to `.env`:

```env
PYTHON_EXECUTABLE=python
ML_MODEL_PATH=models/oral_disease_detector.h5
ML_API_URL=http://localhost:8000
KAGGLE_API_KEY=your_api_key_here
```

## Troubleshooting

### "ModuleNotFoundError: No module named 'tensorflow'"
```bash
pip install tensorflow>=2.12.0
```

### "Kaggle API not authenticated"
- Ensure `~/.kaggle/kaggle.json` exists
- Check file permissions: `chmod 600 ~/.kaggle/kaggle.json`

### Out of memory during training
- Reduce batch size: `--batch-size 16`
- Use GPU: Install CUDA and `pip install tensorflow[and-cuda]`
- Use Google Colab (free GPU)

### Low accuracy on test set
- Download more training data
- Use data augmentation
- Increase epochs
- Fine-tune learning rate

## Model Card

**Model Name:** OralDiseaseDetector v1.0

**Architecture:** MobileNetV2 + Custom Dense Layers

**Input:** RGB Images (224x224)

**Output:** 7 disease classes + confidence scores

**Training Data:** Kaggle Oral Diseases Dataset

**Performance:**
- Accuracy: ~85% (varies with data)
- Precision: ~80-90%
- Recall: ~80-90%

**Limitations:**
- Trained on limited dataset
- May not generalize to all ethnicities/demographics
- Requires good image quality
- Not a substitute for professional diagnosis

**Bias Considerations:**
- Dataset may have geographic/demographic biases
- Should be validated with diverse populations
- Regular retraining recommended

## Next Steps

1. Download the dataset from Kaggle
2. Train the model using the steps above
3. Test with real oral images
4. Deploy to production (Heroku, AWS, etc.)
5. Collect user feedback to improve model

## References

- Kaggle Dataset: https://www.kaggle.com/datasets/salmansajid05/oral-diseases
- TensorFlow Guide: https://www.tensorflow.org/guide
- FastAPI Docs: https://fastapi.tiangolo.com/
- MobileNetV2: https://arxiv.org/abs/1801.04381

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review TensorFlow documentation
3. Check Kaggle dataset discussions
4. Open an issue on the project repository
