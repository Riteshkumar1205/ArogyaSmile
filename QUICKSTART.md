# ArogyaSmile - Quick Start Guide

Get ArogyaSmile running in 5 minutes with mock/demo data - no ML setup required!

## What is ArogyaSmile?

**ArogyaSmile — Your Voice. Your Language. Your Oral Health Companion.**

A multilingual, mobile-first web app that helps detect oral health issues from images, provides health recommendations, and connects you with dentists.

### Key Features:
- 🎤 **Voice-First Interface**: Hindi, Marathi, English support
- 📸 **3 Scan Modes**: 360° guided, image upload, offline quick scan
- 🤖 **AI Analysis**: Detect cavities, plaque, gum issues, tooth decay, discoloration, ulcers
- 💊 **Health Recommendations**: Personalized advice & nutritional deficiency detection
- 👤 **Persona-Aware UI**: Customized for rural, senior, urban, and child users
- 🎮 **Gamification**: Track progress with smile score, coins, and streaks
- ⛓️ **Blockchain Records**: Save verified health records on IPFS + Polygon

## Installation (5 minutes)

### Prerequisites
- Node.js 16+ and pnpm/npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Step 1: Clone/Setup Project
```bash
# The project is already set up in your environment
# Just ensure dependencies are installed
pnpm install
# or
npm install
```

### Step 2: Start Development Server
```bash
pnpm dev
# or
npm run dev
```

The app will open automatically or be available at:
- **Frontend**: http://localhost:5173 (or shown in terminal)
- **Backend API**: http://localhost:3000/api

### Step 3: Access the App
1. Open the browser to the URL shown
2. Select your **Language** (English, हिंदी, मराठी)
3. Choose your **Persona** (Rural, Senior, Urban, Child)
4. Click **"शुरू करें"** (Start) to enter the app

## First Time User Flow

### 1. **Welcome Screen**
   - Select language (English, Hindi, or Marathi)
   - Choose persona that matches your needs

### 2. **Home Dashboard**
   Three big buttons to start:
   - **Scan Mouth** - Upload images for AI analysis
   - **Find Dentist** - Locate nearby clinics
   - **Video Consult** - Talk to a dentist online

### 3. **Image Upload & Analysis**
   ```
   Click "Scan Mouth" → "तस्वीर अपलोड करें" (Upload Image)
   → Select 1-5 images
   → Click "विश्लेषण शुरू करें" (Analyze)
   → See results with recommendations
   ```

### 4. **View Results**
   - **Detected Conditions**: What issues were found + confidence scores
   - **Recommendations**: Step-by-step health advice
   - **Nutritional Deficiencies**: Vitamin & mineral suggestions
   - **Next Steps**: Timeline for seeing dentist
   - **Find Clinic**: Button to locate nearby dentists

## Demo Data

When you upload an image (demo mode), you'll get:

**Detected Issues:**
- Cavity (85% confidence)
- Plaque (72% confidence)

**Recommendations:**
- Schedule filling appointment within 2 weeks
- Brush twice daily with fluoride toothpaste
- Floss daily to remove plaque buildup
- Use electric toothbrush for better cleaning

**Nutritional Deficiencies:**
- Calcium
- Vitamin D
- Vitamin C
- Fluoride

**Next Steps:**
- Schedule dentist appointment within 1-2 weeks
- Follow recommendations above
- Monitor for worsening symptoms

## Feature Walkthrough

### 🎯 Voice Commands
Click the floating **microphone button** (bottom-right) and say:
- "मेरा दाँत स्कैन करो" (Scan my teeth)
- "पास की क्लिनिक दिखाओ" (Show nearby clinics)
- "डॉक्टर से बात करो" (Talk to doctor)

### 📱 Responsive Design
Works on:
- Desktop browsers
- Tablets
- Mobile phones (iPhone, Android)
- Touch-friendly UI with 44px+ buttons

### 🌐 Multilingual
Switch language anytime:
- English (en-IN)
- हिंदी (hi-IN)
- मराठी (mr-IN)

Language preference is saved automatically.

### 👥 Personas
Each persona has customized:
- **UI Colors**: Rural (earth tones), Senior (high contrast), Urban (blues), Child (bright)
- **Text Size**: Scaled for different user needs
- **Voice Speed**: Slow for seniors, normal for adults, cheery for kids
- **Default Language**: Hindi for rural/senior/child, English for urban

### 💾 Offline Support
- Quick offline scan (no internet needed)
- Results saved locally in browser
- Upload later when online

### 📊 Progress Tracking
- **Smile Score**: 0-100 based on oral health
- **Coins**: Earned by scanning, following advice
- **Streak**: Daily brushing reminders
- **Mascot**: Reacts to your progress

## Testing the App

### Test Case 1: Image Upload Analysis
1. Go to **Scan Mouth** → **Upload Image**
2. Select any image (teeth photo or any image)
3. Click **Analyze**
4. See mock results with diseases, recommendations, deficiencies

### Test Case 2: Language Switching
1. Go to **Settings** (gear icon in header)
2. Change language
3. All text updates immediately
4. Language is saved for next session

### Test Case 3: Persona Switching
1. Go to **Settings**
2. Select different persona
3. UI colors and text size change
4. Voice speed adjusts

### Test Case 4: Voice Commands
1. Click microphone button (bottom-right)
2. Say "स्कैन" (scan) or "क्लिनिक" (clinic)
3. App navigates to relevant page

## Setting Up Full ML (Optional)

To enable actual ML model training and inference:

```bash
# See ML_SETUP.md for detailed instructions
python server/ml/kaggle_trainer.py --api-key "YOUR_KEY" --download
python server/ml/kaggle_trainer.py --prepare
python server/ml/kaggle_trainer.py --train
```

This requires Python 3.8+ and the Kaggle dataset.

## Project Structure

```
arogya-smile/
├── client/                  # React frontend
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Home dashboard
│   │   ├── Scan.tsx        # Scan mode selector
│   │   ├── ScanUpload.tsx  # Image upload + analysis
│   │   ├── ScanOffline.tsx # Offline scan with TF.js
│   │   ├── Clinics.tsx     # Clinic finder
│   │   ├── Teleconsult.tsx # Video consultation
│   │   ├── Progress.tsx    # Gamification
│   │   ├── History.tsx     # Scan history
│   │   └── Settings.tsx    # Settings & preferences
│   ├── components/         # Reusable components
│   │   ├── Button.tsx      # Button with variants
│   │   ├── Card.tsx        # Card layout
│   │   ├── MicFab.tsx      # Floating mic button
│   │   ├── Mascot.tsx      # Animated mascot
│   │   ├── LanguagePicker.tsx
│   │   └── PersonaToggle.tsx
│   ├── hooks/              # React hooks
│   │   ├── useTranslation.ts  # i18n
│   │   └── usePersona.ts      # Persona state
│   └── App.tsx             # Route configuration
│
├── server/                 # Node.js/Express backend
│   ├── index.ts           # Express app
│   ├── routes/            # API routes
│   │   ├── scan.ts        # Image upload endpoint
│   │   └── demo.ts        # Demo endpoint
│   └── ml/                # ML models
│       ├── model.py       # TensorFlow model
│       ├── kaggle_trainer.py  # Training script
│       └── api.py         # FastAPI backend
│
├── shared/                # Shared types
│   ├── i18n.ts           # Translations & languages
│   └── api.ts            # API types
│
├── public/                # Static assets
└── index.html            # HTML entry point
```

## Environment Variables

Optional `.env` file:
```env
# Server
PING_MESSAGE=pong

# ML Model (future)
ML_MODEL_PATH=models/oral_disease_detector.h5
ML_API_URL=http://localhost:8000

# Kaggle (for training)
KAGGLE_API_KEY=your_key_here
```

## Common Tasks

### Build for Production
```bash
pnpm build
# or
npm run build

# Output: dist/spa/ (frontend) and dist/server/ (backend)
```

### Run Tests
```bash
pnpm test
```

### Format Code
```bash
pnpm format.fix
```

### Type Check
```bash
pnpm typecheck
```

## Troubleshooting

### App won't load
- Clear browser cache: Cmd/Ctrl + Shift + Delete
- Restart dev server: `pnpm dev`
- Check console for errors: F12 → Console

### Images not uploading
- Check file size (max 10MB)
- Try PNG instead of JPEG
- Check browser console for error messages

### Voice not working
- Allow microphone permission when prompted
- Check browser supports Web Speech API
- Try Chrome (best support)

### Styling issues (text too small/colors wrong)
- Clear localStorage: Open DevTools → Application → Clear All
- Refresh page: Ctrl/Cmd + Shift + R

### App not responsive on mobile
- Update browser to latest version
- Check viewport meta tag in index.html
- Try portrait mode

## Next Steps

1. ✅ **Explore the UI** - Navigate through all screens
2. ✅ **Test Image Upload** - Upload photos and see analysis
3. ✅ **Try Voice Commands** - Use microphone button
4. ✅ **Switch Languages** - Change to Hindi/Marathi
5. ✅ **Change Personas** - See UI adapt to different users
6. 📝 **Setup ML** (Optional) - Train model with Kaggle data
7. 🚀 **Deploy** - Host on Netlify, Vercel, or your server

## Support & Resources

- **ML Setup**: See `ML_SETUP.md`
- **Architecture Docs**: See `AGENTS.md`
- **Issue Tracking**: Check GitHub issues
- **Feature Requests**: Open a discussion

## License & Attribution

This project uses:
- **Dataset**: Kaggle Oral Diseases Dataset
- **Framework**: React + TypeScript
- **UI**: Tailwind CSS + Radix UI
- **ML**: TensorFlow/Keras
- **Backend**: Express.js + FastAPI

## Team & Credits

Built by the ArogyaSmile team to make oral healthcare accessible in local languages.

---

**Happy Smiling! 😊**

Questions? Need help? Open an issue or contact the team!
