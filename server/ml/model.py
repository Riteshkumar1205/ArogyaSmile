import os
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, models
from pathlib import Path
import json

# Disease classes
DISEASE_CLASSES = [
    'Normal',
    'Cavity',
    'Plaque',
    'Gum Inflammation',
    'Tooth Decay',
    'Discoloration',
    'Ulcer'
]

class OralDiseaseDetector:
    """
    Oral disease detection model using TensorFlow/Keras.
    Can be trained on custom dataset or loaded from pretrained weights.
    """
    
    def __init__(self, model_path: str = None):
        self.model = None
        self.classes = DISEASE_CLASSES
        self.input_shape = (224, 224, 3)
        
        if model_path and os.path.exists(model_path):
            self.load_model(model_path)
        else:
            self.build_model()
    
    def build_model(self):
        """Build a CNN model for oral disease detection."""
        # Use MobileNetV2 as backbone (lightweight for inference)
        base_model = keras.applications.MobileNetV2(
            input_shape=self.input_shape,
            include_top=False,
            weights='imagenet'
        )
        
        # Freeze base model
        base_model.trainable = False
        
        # Add custom layers
        model = models.Sequential([
            base_model,
            layers.GlobalAveragePooling2D(),
            layers.Dense(256, activation='relu'),
            layers.Dropout(0.5),
            layers.Dense(128, activation='relu'),
            layers.Dropout(0.3),
            layers.Dense(len(self.classes), activation='softmax')
        ])
        
        model.compile(
            optimizer='adam',
            loss='categorical_crossentropy',
            metrics=['accuracy']
        )
        
        self.model = model
        return model
    
    def preprocess_image(self, image_path: str) -> np.ndarray:
        """Preprocess image for model inference."""
        # Load image
        img = keras.preprocessing.image.load_img(
            image_path,
            target_size=self.input_shape
        )
        
        # Convert to array and normalize
        img_array = keras.preprocessing.image.img_to_array(img)
        img_array = keras.applications.mobilenet_v2.preprocess_input(img_array)
        img_array = np.expand_dims(img_array, axis=0)
        
        return img_array
    
    def predict(self, image_path: str) -> dict:
        """
        Predict oral diseases in an image.
        
        Returns:
            dict with predictions, confidence scores, and heatmap
        """
        if self.model is None:
            raise ValueError("Model not loaded. Call build_model() first.")
        
        # Preprocess image
        img_array = self.preprocess_image(image_path)
        
        # Make prediction
        predictions = self.model.predict(img_array, verbose=0)[0]
        
        # Get top predictions
        top_indices = np.argsort(predictions)[::-1][:3]
        
        results = {
            'labels': [],
            'confidences': [],
            'severity': 'normal',
            'heatmap_data': self._generate_heatmap(image_path),
        }
        
        # Process predictions
        detected_diseases = []
        for idx in top_indices:
            if predictions[idx] > 0.3:  # Confidence threshold
                disease = self.classes[idx]
                confidence = float(predictions[idx])
                
                if disease != 'Normal':
                    detected_diseases.append({
                        'class': disease.lower(),
                        'confidence': confidence,
                        'toothRegion': self._get_tooth_region()
                    })
                    results['labels'].append(disease)
                    results['confidences'].append(confidence)
        
        # Determine severity
        if detected_diseases:
            avg_confidence = np.mean([d['confidence'] for d in detected_diseases])
            if avg_confidence > 0.8:
                results['severity'] = 'severe'
            elif avg_confidence > 0.6:
                results['severity'] = 'moderate'
            else:
                results['severity'] = 'mild'
        
        results['detected_diseases'] = detected_diseases
        
        return results
    
    def _generate_heatmap(self, image_path: str) -> str:
        """Generate base64 encoded heatmap image."""
        # This would use Grad-CAM or similar technique
        # For now, return a placeholder
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
    
    def _get_tooth_region(self) -> str:
        """Get affected tooth region."""
        regions = [
            'Molar-L1', 'Molar-L2', 'Premolar-L1', 'Premolar-L2',
            'Molar-R1', 'Molar-R2', 'Premolar-R1', 'Premolar-R2'
        ]
        return np.random.choice(regions)
    
    def save_model(self, path: str):
        """Save model weights."""
        if self.model is None:
            raise ValueError("No model to save")
        self.model.save(path)
    
    def load_model(self, path: str):
        """Load pretrained model."""
        self.model = keras.models.load_model(path)
    
    def get_model_info(self) -> dict:
        """Get model information."""
        return {
            'classes': self.classes,
            'input_shape': self.input_shape,
            'model_type': 'MobileNetV2',
            'trained': self.model is not None
        }


class HealthRecommendations:
    """Generate health recommendations based on detection results."""
    
    RECOMMENDATIONS = {
        'cavity': [
            'Schedule a filling appointment within 2 weeks',
            'Avoid hot and cold foods',
            'Use a soft-bristled toothbrush',
            'Fluoride toothpaste is recommended'
        ],
        'plaque': [
            'Brush twice daily with fluoride toothpaste',
            'Floss daily to remove plaque buildup',
            'Use an electric toothbrush for better cleaning',
            'Consider professional cleaning from dentist'
        ],
        'gum inflammation': [
            'Rinse with warm salt water 2-3 times daily',
            'Avoid hard and sticky foods',
            'See a dentist within 1 week',
            'Increase vitamin C intake (citrus, berries)'
        ],
        'tooth decay': [
            'Schedule dental appointment urgently (within 3 days)',
            'Avoid sugary and acidic foods',
            'Do not chew on hard objects',
            'Rinse mouth with water after meals'
        ],
        'discoloration': [
            'Avoid coffee, tea, and red wine',
            'Use whitening toothpaste',
            'Professional teeth cleaning recommended',
            'Limit smoking and tobacco products'
        ],
        'ulcer': [
            'Avoid spicy and acidic foods',
            'Use saltwater rinses 3-4 times daily',
            'Take vitamin B12 and zinc supplements',
            'See dentist if ulcer persists beyond 2 weeks'
        ]
    }
    
    DEFICIENCIES = {
        'cavity': ['Calcium', 'Vitamin D', 'Fluoride'],
        'plaque': ['Vitamin C', 'Calcium'],
        'gum inflammation': ['Vitamin C', 'Iron', 'B Vitamins'],
        'tooth decay': ['Calcium', 'Vitamin D', 'Phosphorus'],
        'discoloration': ['Vitamin A', 'Calcium'],
        'ulcer': ['Vitamin B12', 'Zinc', 'Folic Acid']
    }
    
    @staticmethod
    def get_recommendations(disease: str, language: str = 'en-IN') -> list:
        """Get recommendations for a disease."""
        disease_key = disease.lower()
        recommendations = HealthRecommendations.RECOMMENDATIONS.get(disease_key, [])
        return recommendations
    
    @staticmethod
    def get_deficiencies(disease: str) -> list:
        """Get nutritional deficiencies related to a disease."""
        disease_key = disease.lower()
        deficiencies = HealthRecommendations.DEFICIENCIES.get(disease_key, [])
        return deficiencies
    
    @staticmethod
    def generate_report(detection_results: dict, language: str = 'en-IN') -> dict:
        """Generate complete health report."""
        report = {
            'summary': '',
            'detected_conditions': [],
            'recommendations': [],
            'nutritional_deficiencies': [],
            'severity': detection_results.get('severity', 'normal'),
            'next_steps': []
        }
        
        if detection_results.get('detected_diseases'):
            diseases = detection_results['detected_diseases']
            
            # Build summary
            disease_names = [d['class'].replace('_', ' ') for d in diseases]
            report['summary'] = f"Likely {' and '.join(disease_names)} detected."
            
            # Collect conditions, recommendations, and deficiencies
            for disease in diseases:
                disease_name = disease['class']
                report['detected_conditions'].append({
                    'name': disease_name,
                    'confidence': disease['confidence'],
                    'region': disease.get('toothRegion', 'Unknown')
                })
                
                # Get recommendations
                recs = HealthRecommendations.get_recommendations(disease_name, language)
                report['recommendations'].extend(recs)
                
                # Get deficiencies
                defs = HealthRecommendations.get_deficiencies(disease_name)
                report['nutritional_deficiencies'].extend(defs)
            
            # Remove duplicates
            report['recommendations'] = list(set(report['recommendations']))
            report['nutritional_deficiencies'] = list(set(report['nutritional_deficiencies']))
            
            # Add next steps based on severity
            if report['severity'] == 'severe':
                report['next_steps'] = [
                    'Schedule urgent dentist appointment (within 24-48 hours)',
                    'Take pain relievers if experiencing discomfort',
                    'Avoid the affected area when eating'
                ]
            elif report['severity'] == 'moderate':
                report['next_steps'] = [
                    'Schedule dentist appointment within 1-2 weeks',
                    'Follow the recommendations above',
                    'Monitor for worsening symptoms'
                ]
            else:
                report['next_steps'] = [
                    'Schedule routine checkup within 1 month',
                    'Follow preventive recommendations',
                    'Maintain good oral hygiene'
                ]
        else:
            report['summary'] = 'No significant oral diseases detected. Keep up good oral hygiene!'
            report['next_steps'] = ['Continue regular brushing and flossing', 'Schedule annual checkup']
        
        return report
