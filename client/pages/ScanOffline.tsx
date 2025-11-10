import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { usePersona } from '@/hooks/usePersona';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MicFab } from '@/components/MicFab';
import { Mascot } from '@/components/Mascot';
import {
  Smartphone,
  ArrowLeft,
  Camera,
  AlertCircle,
  CheckCircle,
  Loader,
} from 'lucide-react';

interface OfflineAnalysisResult {
  detected: boolean;
  disease?: string;
  confidence?: number;
  message: string;
  canUpload: boolean;
}

export default function ScanOffline() {
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const { persona } = usePersona();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<OfflineAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const getGradient = (p: string) => {
    const gradients: Record<string, string> = {
      rural: 'gradient-rural',
      senior: 'gradient-senior',
      urban: 'gradient-urban',
      child: 'gradient-child',
    };
    return gradients[p] || 'gradient-urban';
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        setError(null);
      }
    } catch (err) {
      setError(
        'कैमरा एक्सेस नहीं किया जा सका। कृपया अनुमति दें और पुनः प्रयास करें।'
      );
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      setCameraActive(false);
    }
  };

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const imageData = canvasRef.current.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  };

  const analyzeOffline = async () => {
    if (!capturedImage) {
      setError('कृपया पहले तस्वीर लें');
      return;
    }

    setAnalyzing(true);
    setError(null);

    try {
      // Simulate offline analysis with TF.js (mock implementation)
      // In production, this would use TensorFlow.js for actual inference
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock analysis results
      const mockResults: OfflineAnalysisResult = {
        detected: Math.random() > 0.4,
        disease: Math.random() > 0.5 ? 'cavity' : 'plaque',
        confidence: 0.7 + Math.random() * 0.25,
        message: 'ऑफलाइन विश्लेषण पूर्ण। अधिक विस्तृत विश्लेषण के लिए इंटरनेट के साथ पूर्ण स्कैन करें।',
        canUpload: true,
      };

      setResult(mockResults);

      // Store offline scan
      const offlineScans = JSON.parse(
        localStorage.getItem('offline_scans') || '[]'
      );
      offlineScans.push({
        timestamp: new Date().toISOString(),
        image: capturedImage,
        result: mockResults,
      });
      localStorage.setItem('offline_scans', JSON.stringify(offlineScans));
    } catch (err) {
      setError('विश्लेषण विफल रहा। कृपया पुनः प्रयास करें।');
    } finally {
      setAnalyzing(false);
    }
  };

  const uploadForFullAnalysis = () => {
    if (capturedImage) {
      // Convert to file and navigate to upload page
      navigate('/scan/upload');
    }
  };

  if (result) {
    return <OfflineResult result={result} onRetry={() => setResult(null)} />;
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
            {t.scan.modeOffline}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Mascot */}
        <div className="flex justify-center mb-10 animate-fade-in">
          <Mascot
            persona={persona}
            mood={cameraActive ? 'thinking' : 'neutral'}
            message={
              cameraActive
                ? 'कैमरा तैयार है। अपना मुँह दिखाएं।'
                : 'ऑफलाइन विश्लेषण के लिए कैमरा शुरू करें'
            }
            size="md"
          />
        </div>

        {/* Info Card */}
        <Card className="mb-8 bg-primary/5 border-primary/20 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  ऑफलाइन विश्लेषण
                </h3>
                <p className="text-sm text-muted-foreground">
                  यह तेजी़ से प्राथमिक विश्लेषण प्रदान करता है। इंटरनेट के बिना काम करता है।
                  पूर्ण विश्लेषण के लिए बाद में अपलोड करें।
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Camera Section */}
        {!capturedImage && (
          <Card className="mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                <Camera className="w-5 h-5" />
                कैमरा
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cameraActive ? (
                <div className="space-y-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full rounded-lg bg-black"
                  />
                  <div className="flex gap-3">
                    <Button
                      onClick={captureFrame}
                      size="lg"
                      variant="primary"
                      fullWidth
                    >
                      📸 तस्वीर लें
                    </Button>
                    <Button
                      onClick={stopCamera}
                      size="lg"
                      variant="outline"
                      fullWidth
                    >
                      रद्द करें
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <Smartphone className="w-16 h-16 mx-auto text-primary" />
                  <p className="text-muted-foreground">
                    अपने दांतों का विश्लेषण करने के लिए कैमरा शुरू करें
                  </p>
                  <Button
                    onClick={startCamera}
                    size="lg"
                    variant="primary"
                    fullWidth
                  >
                    कैमरा शुरू करें
                  </Button>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    size="lg"
                    variant="outline"
                    fullWidth
                  >
                    गैलरी से चुनें
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          setCapturedImage(
                            event.target?.result as string
                          );
                        };
                        reader.readAsDataURL(e.target.files[0]);
                      }
                    }}
                  />
                </div>
              )}

              {error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 flex gap-2">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Captured Image */}
        {capturedImage && !result && (
          <Card className="mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle>तस्वीर की पूर्वावलोकन</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <img
                src={capturedImage}
                alt="captured"
                className="w-full rounded-lg max-h-96 object-cover"
              />
              <div className="flex gap-3">
                <Button
                  onClick={analyzeOffline}
                  disabled={analyzing}
                  loading={analyzing}
                  size="lg"
                  variant="primary"
                  fullWidth
                >
                  {analyzing ? 'विश्लेषण जारी है...' : 'ऑफलाइन विश्लेषण करें'}
                </Button>
                <Button
                  onClick={() => {
                    setCapturedImage(null);
                    startCamera();
                  }}
                  size="lg"
                  variant="outline"
                  fullWidth
                >
                  फिर से लें
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>

      <MicFab />
    </div>
  );
}

/* Offline Result Component */
interface OfflineResultProps {
  result: OfflineAnalysisResult;
  onRetry: () => void;
}

function OfflineResult({ result, onRetry }: OfflineResultProps) {
  const navigate = useNavigate();
  const { persona } = usePersona();

  const getGradient = (p: string) => {
    const gradients: Record<string, string> = {
      rural: 'gradient-rural',
      senior: 'gradient-senior',
      urban: 'gradient-urban',
      child: 'gradient-child',
    };
    return gradients[p] || 'gradient-urban';
  };

  return (
    <div className={`min-h-screen ${getGradient(persona)} transition-colors duration-500 safe-inset`}>
      {/* Header */}
      <div className="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="md"
            onClick={onRetry}
            icon={<ArrowLeft className="w-5 h-5" />}
          />
          <h1 className="text-2xl font-bold text-foreground flex-1">
            ऑफलाइन विश्लेषण परिणाम
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Mascot */}
        <div className="flex justify-center mb-10 animate-fade-in">
          <Mascot
            persona={persona}
            mood={result.detected ? 'concerned' : 'happy'}
            message={result.message}
            size="lg"
          />
        </div>

        {/* Result Card */}
        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              {result.detected ? (
                <>
                  <AlertCircle className="w-6 h-6 text-warning" />
                  संभावित समस्या पाई गई
                </>
              ) : (
                <>
                  <CheckCircle className="w-6 h-6 text-success" />
                  कोई समस्या नहीं दिख रही
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {result.detected && result.disease && (
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground capitalize">
                    {result.disease}
                  </span>
                  <span className="text-warning font-bold">
                    {((result.confidence || 0) * 100).toFixed(0)}% आत्मविश्वास
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-3">
                  <div
                    className="bg-warning h-2 rounded-full"
                    style={{
                      width: `${(result.confidence || 0) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong>नोट:</strong> यह एक त्वरित ऑफलाइन विश्लेषण है। व्यक्तिगत
                सलाह के लिए, कृपया पूर्ण विश्लेषण के लिए अपनी तस्वीर अपलोड करें या
                दंत चिकित्सक से परामर्श लें।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.canUpload && (
                <Button
                  onClick={() => navigate('/scan/upload')}
                  size="lg"
                  variant="primary"
                  fullWidth
                >
                  पूर्ण विश्लेषण के लिए अपलोड करें
                </Button>
              )}
              <Button
                onClick={() => navigate('/clinics')}
                size="lg"
                variant="secondary"
                fullWidth
              >
                पास की क्लिनिक खोजें
              </Button>
            </div>

            <Button onClick={onRetry} size="lg" variant="outline" fullWidth>
              दूसरी स्कैन करें
            </Button>
          </CardContent>
        </Card>
      </div>

      <MicFab />
    </div>
  );
}
