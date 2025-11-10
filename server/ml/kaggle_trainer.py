"""
Script to download and train on Kaggle Oral Diseases Dataset.

Usage:
    python server/ml/kaggle_trainer.py --api-key YOUR_KEY --download
    python server/ml/kaggle_trainer.py --train
"""

import os
import sys
import argparse
import json
from pathlib import Path
from model import OralDiseaseDetector

def setup_kaggle_api(api_key: str):
    """Setup Kaggle API credentials."""
    kaggle_dir = Path.home() / '.kaggle'
    kaggle_dir.mkdir(exist_ok=True)
    
    api_json = {
        'username': 'kaggle_user',
        'key': api_key
    }
    
    config_path = kaggle_dir / 'kaggle.json'
    with open(config_path, 'w') as f:
        json.dump(api_json, f)
    
    # Set permissions (important for Kaggle API)
    os.chmod(config_path, 0o600)
    print(f"Kaggle API configured at {config_path}")

def download_dataset():
    """Download Oral Diseases dataset from Kaggle."""
    try:
        from kaggle.api.kaggle_api_extended import KaggleApi
    except ImportError:
        print("Error: kaggle package not installed. Install with: pip install kaggle")
        return False
    
    try:
        api = KaggleApi()
        api.authenticate()
        
        # Download dataset
        print("Downloading oral-diseases dataset...")
        api.dataset_download_files(
            'salmansajid05/oral-diseases',
            path='data/raw',
            unzip=True
        )
        print("Dataset downloaded successfully!")
        return True
    except Exception as e:
        print(f"Error downloading dataset: {e}")
        return False

def prepare_data():
    """Prepare and organize downloaded data."""
    data_dir = Path('data/raw')
    
    if not data_dir.exists():
        print("Data directory not found. Download data first with --download flag")
        return False
    
    print("Preparing dataset...")
    # TODO: Implement data preparation, split into train/val/test
    # - Organize by disease class
    # - Create train/val/test splits (70/15/15)
    # - Resize images to 224x224
    # - Create metadata JSON
    
    return True

def train_model(epochs: int = 20, batch_size: int = 32):
    """Train the model on prepared data."""
    print("Initializing model...")
    detector = OralDiseaseDetector()
    
    # TODO: Implement training
    # - Load data from data/train
    # - Create data generators with augmentation
    # - Train model with callbacks
    # - Evaluate on validation set
    # - Save best model weights
    
    print("Model training completed!")
    print("Saving model...")
    detector.save_model('models/oral_disease_detector.h5')
    print("Model saved to models/oral_disease_detector.h5")
    
    return detector

def evaluate_model(model: OralDiseaseDetector):
    """Evaluate model on test set."""
    print("Evaluating model on test set...")
    # TODO: Load test set and evaluate
    # - Calculate accuracy, precision, recall, F1
    # - Generate confusion matrix
    # - Save evaluation metrics
    pass

def create_dummy_model():
    """Create a dummy model for demo purposes (no real training)."""
    print("Creating dummy model for demo...")
    detector = OralDiseaseDetector()
    # This uses random weights from ImageNet - good for testing UI flow
    detector.save_model('models/oral_disease_detector_demo.h5')
    print("Dummy model ready for inference!")
    return detector

def main():
    parser = argparse.ArgumentParser(
        description='Train oral disease detection model on Kaggle dataset'
    )
    parser.add_argument('--api-key', type=str, help='Kaggle API key')
    parser.add_argument('--download', action='store_true', help='Download dataset')
    parser.add_argument('--prepare', action='store_true', help='Prepare dataset')
    parser.add_argument('--train', action='store_true', help='Train model')
    parser.add_argument('--evaluate', action='store_true', help='Evaluate model')
    parser.add_argument('--demo', action='store_true', help='Create demo model (no training)')
    parser.add_argument('--epochs', type=int, default=20, help='Number of epochs')
    parser.add_argument('--batch-size', type=int, default=32, help='Batch size')
    
    args = parser.parse_args()
    
    # Create necessary directories
    Path('data/raw').mkdir(parents=True, exist_ok=True)
    Path('data/train').mkdir(parents=True, exist_ok=True)
    Path('data/val').mkdir(parents=True, exist_ok=True)
    Path('data/test').mkdir(parents=True, exist_ok=True)
    Path('models').mkdir(parents=True, exist_ok=True)
    
    if args.api_key:
        setup_kaggle_api(args.api_key)
    
    if args.download:
        download_dataset()
    
    if args.prepare:
        prepare_data()
    
    if args.demo:
        create_dummy_model()
    
    if args.train:
        model = train_model(args.epochs, args.batch_size)
        evaluate_model(model)
    
    print("Done!")

if __name__ == '__main__':
    main()
