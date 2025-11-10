import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { usePersona } from '@/hooks/usePersona';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MicFab } from '@/components/MicFab';
import { Mascot } from '@/components/Mascot';
import {
  Upload,
  ArrowLeft,
  X,
  CheckCircle,
  AlertCircle,
  Loader,
} from 'lucide-react';

interface UploadedImage {
  file: File;
  preview: string;
  id: string;
}

interface AnalysisResult {
  scanId: string;
  timestamp: string;
  imageUrl: string;
  labels: Array<{
    class: string;
    confidence: number;
    toothRegion: string;
  }>;
  summary: string;
  severity: 'normal' | 'mild' | 'moderate' | 'severe';
  heatmaps: string[];
  recommendations: string[];
  deficiencies: string[];
  nextSteps: string[];
  language: string;
}

export default function ScanUpload() {
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const { persona } = usePersona();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<UploadedImage[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getGradient = (p: string) => {
    const gradients: Record<string, string> = {
      rural: 'gradient-rural',
      senior: 'gradient-senior',
      urban: 'gradient-urban',
      child: 'gradient-child',
    };
    return gradients[p] || 'gradient-urban';
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;

    const newImages: UploadedImage[] = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: `${Date.now()}-${Math.random()}`,
    }));

    setImages((prev) => [...prev, ...newImages].slice(0, 5)); // Max 5 images
    setError(null);
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleAnalyze = async () => {
    if (images.length === 0) {
      setError('Please select at least one image');
      return;
    }

    setAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      images.forEach((img) => {
        formData.append('images', img.file);
      });
      formData.append('language', language);

      const response = await fetch('/api/scan/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      if (data.success) {
        setResults(data.data);
        // Store result in localStorage for history
        const history = JSON.parse(localStorage.getItem('scan_history') || '[]');
        history.unshift(data.data);
        localStorage.setItem('scan_history', JSON.stringify(history.slice(0, 20)));
      } else {
        setError(data.error || 'Analysis failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setAnalyzing(false);
    }
  };

  if (results) {
    return <AnalysisResults result={results} onBack={() => setResults(null)} />;
  }

  return (
    <div className={`min-h-screen ${getGradient(persona)} transition-colors duration-500 safe-inset`}>
      {/* Header */}
      <div className="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="md"
            onClick={() => navigate('/scan')}
            icon={<ArrowLeft className="w-5 h-5" />}
          />
          <h1 className="text-2xl font-bold text-foreground flex-1">
            {t.scan.modeImage}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Mascot */}
        <div className="flex justify-center mb-10 animate-fade-in">
          <Mascot
            persona={persona}
            mood={images.length > 0 ? 'happy' : 'neutral'}
            message={
              images.length > 0
                ? `अच्छा! ${images.length} तस्वीर चुनी गई है।`
                : 'अपनी दांतों की तस्वीर चुनें'
            }
            size="md"
          />
        </div>

        {/* Upload Area */}
        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle>तस्वीर चुनें</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Drag and Drop Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:bg-muted/30 transition-colors"
            >
              <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                यहाँ तस्वीरें छोड़ें
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                या फोल्डर से चुनने के लिए यहाँ क्लिक करें
              </p>
              <p className="text-xs text-muted-foreground">
                JPG, PNG, GIF (अधिकतम 10MB प्रति फाइल, 5 तस्वीरें तक)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Image Preview Grid */}
            {images.length > 0 && (
              <div>
                <h4 className="font-semibold text-foreground mb-4">
                  चुनी गई तस्वीरें ({images.length}/5)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((img) => (
                    <div key={img.id} className="relative group">
                      <img
                        src={img.preview}
                        alt="preview"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(img.id)}
                        className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">त्रुटि</p>
                  <p className="text-sm text-muted-foreground">{error}</p>
                </div>
              </div>
            )}

            {/* Tips */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">
                💡 सर्वोत्तम परिणामों के लिए:
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ अच्छी रोशनी में तस्वीरें लें</li>
                <li>✓ साफ और स्पष्ट तस्वीरें</li>
                <li>✓ दोनों तरफ के दांत दिखाएं</li>
                <li>✓ विभिन्न कोणों से तस्वीरें लें</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={() => navigate('/scan')}
                variant="outline"
                size="lg"
                fullWidth
              >
                वापस जाएं
              </Button>
              <Button
                onClick={handleAnalyze}
                disabled={images.length === 0 || analyzing}
                loading={analyzing}
                size="lg"
                fullWidth
              >
                {analyzing ? 'विश्लेषण किया जा रहा है...' : 'विश्लेषण शुरू करें'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <MicFab />
    </div>
  );
}

/* Analysis Results Component */
interface AnalysisResultsProps {
  result: AnalysisResult;
  onBack: () => void;
}

function AnalysisResults({ result, onBack }: AnalysisResultsProps) {
  const { persona } = usePersona();
  const navigate = useNavigate();

  const getGradient = (p: string) => {
    const gradients: Record<string, string> = {
      rural: 'gradient-rural',
      senior: 'gradient-senior',
      urban: 'gradient-urban',
      child: 'gradient-child',
    };
    return gradients[p] || 'gradient-urban';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe':
        return 'bg-destructive/10 border-destructive/20 text-destructive';
      case 'moderate':
        return 'bg-warning/10 border-warning/20 text-warning';
      case 'mild':
        return 'bg-accent/10 border-accent/20 text-accent';
      default:
        return 'bg-success/10 border-success/20 text-success';
    }
  };

  return (
    <div className={`min-h-screen ${getGradient(persona)} transition-colors duration-500 safe-inset`}>
      {/* Header */}
      <div className="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="md" onClick={onBack} icon={<ArrowLeft className="w-5 h-5" />} />
          <h1 className="text-2xl font-bold text-foreground flex-1">विश्लेषण परिणाम</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Mascot */}
        <div className="flex justify-center mb-10 animate-fade-in">
          <Mascot
            persona={persona}
            mood={result.severity === 'normal' ? 'happy' : 'concerned'}
            message={result.summary}
            size="lg"
          />
        </div>

        {/* Severity Badge */}
        <div className={`rounded-lg border-2 p-4 mb-8 text-center ${getSeverityColor(result.severity)}`}>
          <p className="text-sm font-semibold uppercase">गंभीरता स्तर</p>
          <p className="text-2xl font-bold capitalize">{result.severity}</p>
        </div>

        {/* Detected Conditions */}
        {result.labels.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                <AlertCircle className="w-6 h-6" />
                पाई गई समस्याएं
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {result.labels.map((label, idx) => (
                <div key={idx} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-foreground capitalize">{label.class}</h4>
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {(label.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${label.confidence * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    प्रभावित क्षेत्र: {label.toothRegion}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              ✓ सिफारिशें
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {result.recommendations.map((rec, idx) => (
                <li key={idx} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Nutritional Deficiencies */}
        {result.deficiencies.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                💊 पोषक तत्वों की कमी
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {result.deficiencies.map((def, idx) => (
                  <div key={idx} className="bg-warning/10 border border-warning/20 rounded-lg p-3 text-center">
                    <p className="font-semibold text-warning text-sm">{def}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              🎯 अगले कदम
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {result.nextSteps.map((step, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Button onClick={() => navigate('/clinics')} size="lg" fullWidth variant="secondary">
            पास की क्लिनिक खोजें
          </Button>
          <Button onClick={() => navigate('/teleconsult')} size="lg" fullWidth variant="primary">
            डॉक्टर से बात करें
          </Button>
        </div>

        <Button onClick={onBack} size="lg" fullWidth variant="outline">
          दूसरी स्कैन करें
        </Button>
      </div>

      <MicFab />
    </div>
  );
}
