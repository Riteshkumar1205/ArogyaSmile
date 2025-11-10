import { RequestHandler } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

// Note: This is a TypeScript/Express handler
// In production, the actual ML inference happens in the Python backend
// This handler manages file uploads and communicates with the Python service

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

export interface ScanAnalysisResult {
  scanId: string;
  timestamp: string;
  imageUrl: string;
  labels: Array<{
    class: string;
    confidence: number;
    toothRegion: string;
  }>;
  summary: string;
  severity: "normal" | "mild" | "moderate" | "severe";
  heatmaps: string[];
  recommendations: string[];
  deficiencies: string[];
  nextSteps: string[];
  language: string;
}

// Mock analysis - in production this calls Python ML backend
const generateMockAnalysis = (
  imagePath: string,
  language: string = "en-IN"
): ScanAnalysisResult => {
  const diseases = [
    { class: "cavity", confidence: 0.85, region: "Molar-L2" },
    { class: "plaque", confidence: 0.72, region: "Premolar-R1" },
  ];

  const diseaseRecommendations: Record<string, string[]> = {
    cavity: [
      "Schedule a filling appointment within 2 weeks",
      "Avoid hot and cold foods",
      "Use a soft-bristled toothbrush",
      "Fluoride toothpaste is recommended",
    ],
    plaque: [
      "Brush twice daily with fluoride toothpaste",
      "Floss daily to remove plaque buildup",
      "Use an electric toothbrush for better cleaning",
      "Consider professional cleaning from dentist",
    ],
  };

  const deficiencies: Record<string, string[]> = {
    cavity: ["Calcium", "Vitamin D", "Fluoride"],
    plaque: ["Vitamin C", "Calcium"],
  };

  const recommendations = diseases.flatMap(
    (d) => diseaseRecommendations[d.class] || []
  );
  const allDeficiencies = Array.from(
    new Set(diseases.flatMap((d) => deficiencies[d.class] || []))
  );

  return {
    scanId: `scan_${Date.now()}`,
    timestamp: new Date().toISOString(),
    imageUrl: imagePath,
    labels: diseases,
    summary:
      diseases.length > 0
        ? `Likely ${diseases.map((d) => d.class).join(" and ")} detected.`
        : "No significant oral diseases detected.",
    severity:
      diseases.length > 0 && diseases[0].confidence > 0.8
        ? "moderate"
        : "mild",
    heatmaps: [
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    ],
    recommendations: recommendations.slice(0, 5),
    deficiencies: allDeficiencies,
    nextSteps: [
      "Schedule dentist appointment within 1-2 weeks",
      "Follow the recommendations above",
      "Monitor for worsening symptoms",
    ],
    language,
  };
};

export const handleScanUpload = [
  upload.array("images", 5),
  (async (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No images provided" });
    }

    const language = (req.body.language as string) || "en-IN";

    try {
      // Process first image for now
      const file = req.files[0] as Express.Multer.File;
      const imagePath = `/uploads/${file.filename}`;

      // In production: call Python ML backend
      // const response = await fetch('http://localhost:8000/api/predict', {
      //   method: 'POST',
      //   body: formData
      // });
      // const analysis = await response.json();

      // For now, use mock analysis
      const analysis = generateMockAnalysis(imagePath, language);

      return res.json({
        success: true,
        data: analysis,
      });
    } catch (error) {
      console.error("Scan upload error:", error);
      return res.status(500).json({ error: "Analysis failed" });
    }
  }) as RequestHandler,
];

export const handleGetScanHistory: RequestHandler = (req, res) => {
  // Return mock scan history
  const mockHistory = [
    {
      scanId: "scan_1",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      severity: "mild",
      summary: "Plaque detected",
    },
    {
      scanId: "scan_2",
      timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      severity: "normal",
      summary: "No issues detected",
    },
  ];

  res.json({ success: true, data: mockHistory });
};
