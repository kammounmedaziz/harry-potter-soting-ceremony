# � Hogwarts Sorting Ceremony ⚡

<div align="center">

![Hogwarts Banner](https://img.shields.io/badge/Hogwarts-Sorting%20Ceremony-gold?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjRkZENzAwIi8+Cjwvc3ZnPgo=)

[![React](https://img.shields.io/badge/React-18.2.0-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.140.0-000000?style=flat-square&logo=three.js)](https://threejs.org/)
[![Styled Components](https://img.shields.io/badge/Styled--Components-5.3.5-db7093?style=flat-square&logo=styled-components)](https://styled-components.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-f7df1e?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

**A magical React application that brings the Hogwarts Sorting Ceremony to life with stunning 3D graphics and authentic Harry Potter styling**

[🚀 Live Demo](#demo) • [📖 Documentation](#documentation) • [🎨 Features](#features) • [⚙️ Installation](#installation)

</div>

---

## ✨ Features

### 🎭 **Immersive Experience**
- **3D Sorting Hat** - Interactive Three.js powered sorting hat with magical animations
- **Custom FBX Support** - Load your own 3D hat models seamlessly
- **Magical Loading Screen** - Spinning hat with sparkles and authentic quotes
- **House Sorting Logic** - Intelligent algorithm that considers house capacities

### 🏰 **Authentic Harry Potter Design**
- **House Colors & Crests** - Accurate Gryffindor, Hufflepuff, Ravenclaw, and Slytherin styling
- **Medieval Typography** - Cinzel and MedievalSharp fonts for authentic feel
- **Magical Effects** - Floating animations, glowing text, and sparkle particles
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile

### 🔧 **Modern Architecture**
- **React 18** with modern hooks and Suspense
- **Modular Components** - Clean, reusable component structure
- **Custom Hooks** - Separated business logic for maintainability
- **Styled Components** - CSS-in-JS with theming support

---

## 🎬 Preview

<div align="center">

### 🌟 Loading Screen
*Magical spinning hat with golden sparkles*

### �️ Main Interface
*Clean header without containers, authentic house displays*

### 🎩 3D Sorting Hat
*Interactive Three.js hat with custom FBX model support*

</div>

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/hogwarts-sorting-ceremony.git

# Navigate to project directory
cd hogwarts-sorting-ceremony

# Install dependencies
npm install

# Start the development server
npm start
```

The application will open at `http://localhost:3000` 🌐

---

## 🎨 Project Structure

```
src/
├── components/
│   ├── 3D/
│   │   └── SortingHat3D.js      # Three.js 3D hat component
│   ├── Header.js                # Main header with hat display
│   ├── LoadingScreen.js         # Magical loading screen
│   ├── CapacitySetup.js         # House capacity configuration
│   ├── SortingSection.js        # Student sorting interface
│   ├── HouseDisplay.js          # House results display
│   └── Statistics.js            # Sorting statistics
├── hooks/
│   └── useSortingCeremony.js    # Main sorting logic hook
├── utils/
│   └── sortingUtils.js          # Sorting algorithms
├── constants/
│   └── houses.js                # House data and configurations
├── styles/
│   └── GlobalStyles.js          # Global styling and CSS variables
└── App.js                       # Main application component
```

---

## 🎩 Custom Hat Setup

### Adding Your Own 3D Hat Model

1. **Prepare your FBX file**
   ```
   public/models/hat.fbx
   ```

2. **Supported formats:**
   - FBX (recommended)
   - Automatic fallback to geometric hat

3. **Optimal settings:**
   - Pre-scaled for perfect fit
   - Automatic lighting and materials
   - Magical animations included

### Configuration

The hat automatically loads from `/models/hat.fbx` with these features:
- ✨ Spinning animation
- 🌊 Floating motion
- 💫 Magical lighting effects
- 🔄 Automatic fallback system

---

## 🏠 House System

<div align="center">

| House | Colors | Traits | Capacity |
|-------|--------|--------|----------|
| 🦁 **Gryffindor** | `#740001` `#D3A625` | Courage, Bravery | Configurable |
| 🦡 **Hufflepuff** | `#FFDB00` `#000000` | Loyalty, Patience | Configurable |
| 🦅 **Ravenclaw** | `#0E1A40` `#946B2D` | Intelligence, Wisdom | Configurable |
| 🐍 **Slytherin** | `#1A472A` `#AAAAAA` | Ambition, Cunning | Configurable |

</div>

---

## 🎯 Key Components

### `useSortingCeremony` Hook
```javascript
const {
  houses,           // House data with capacities
  sortingResults,   // History of sorted students
  isHatActive,      // Ceremony state
  isSorting,        // Animation state
  sortStudent,      // Sort function
  setupCapacities   // Configuration function
} = useSortingCeremony();
```

### `SortingHat3D` Component
```javascript
<SortingHat3D 
  isSorting={true}
  modelPath="/models/hat.fbx"
  onHatClick={handleClick}
/>
```

---

## 🛠️ Technology Stack

<div align="center">

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | UI Framework |
| **Three.js** | 0.140.0 | 3D Graphics |
| **@react-three/fiber** | 8.8.0 | React Three.js Renderer |
| **@react-three/drei** | 9.50.0 | Three.js Helpers |
| **styled-components** | 5.3.5 | CSS-in-JS Styling |
| **FBXLoader** | Three.js | 3D Model Loading |

</div>

---

## 🎨 Styling System

### CSS Variables
```css
:root {
  /* House Colors */
  --gryffindor-primary: #740001;
  --hufflepuff-primary: #FFDB00;
  --ravenclaw-primary: #0E1A40;
  --slytherin-primary: #1A472A;
  
  /* Magical Effects */
  --color-gold: #D4AF37;
  --color-silver: #C0C0C0;
  --text-shadow-gold: 0 0 20px rgba(212,175,55,0.6);
}
```

### Animations
- **Shimmer Effects** - For magical text
- **Floating Motion** - For 3D elements
- **Sparkle Particles** - For magical atmosphere
- **Gradient Shifts** - For dynamic backgrounds

---

## � Features in Detail

### 🎭 Loading Experience
- **3 Second Duration** - Perfect timing for anticipation
- **Spinning Hat Animation** - Smooth 3D rotation
- **Magical Sparkles** - Animated particle effects
- **Progress Bar** - Golden glowing progress indicator
- **Authentic Quote** - Real Sorting Hat dialogue

### 🎯 Sorting Logic
- **Capacity Management** - Prevents house overflow
- **Random Distribution** - Fair sorting algorithm
- **Visual Feedback** - Smooth animations during sorting
- **Result History** - Track all sorting decisions

### 🎨 Visual Design
- **Responsive Layout** - Works on all screen sizes
- **Dark Theme** - Atmospheric Hogwarts styling
- **Gradient Backgrounds** - Magical color transitions
- **Typography** - Medieval and serif fonts

---

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full Support |
| Firefox | ✅ Full Support |
| Safari | ✅ Full Support |
| Edge | ✅ Full Support |

**Requirements:**
- WebGL support for 3D graphics
- ES6+ JavaScript support
- Modern CSS features

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to GitHub Pages
```bash
npm install --save-dev gh-pages
npm run build
npm run deploy
```

### Environment Variables
No environment variables required - runs entirely client-side!

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow React best practices
- Use styled-components for styling
- Maintain component modularity
- Add proper TypeScript types (if contributing TS)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

## 🙏 Acknowledgments

- **J.K. Rowling** - For creating the magical world of Harry Potter
- **Three.js Community** - For amazing 3D web graphics
- **React Team** - For the incredible UI framework
- **Harry Potter Font Contributors** - For authentic typography

---

## 📞 Support & Contact

<div align="center">

[![GitHub Issues](https://img.shields.io/badge/GitHub-Issues-red?style=flat-square&logo=github)](https://github.com/yourusername/hogwarts-sorting-ceremony/issues)
[![Email](https://img.shields.io/badge/Email-Contact-blue?style=flat-square&logo=gmail)](mailto:your.email@example.com)

**⚡ May the magic be with you! ⚡**

</div>

---

<div align="center">

### 🎩 Ready to be sorted? Let the magic begin! ✨

**[⬆ Back to Top](#-hogwarts-sorting-ceremony-)**

</div>
- **Hufflepuff** 🦡 - Loyal, Patient, Fair (Earth Element)
- **Ravenclaw** 🦅 - Intelligent, Wise, Creative (Air Element)
- **Slytherin** 🐍 - Ambitious, Cunning, Resourceful (Water Element)

### 📊 Advanced Features
- **Real-time Statistics**: Track sorting progress and house distribution
- **Visual Progress Bars**: See house capacity with beautiful animated bars
- **Sorting Chronicle**: Complete log of all sorting activities with timestamps
- **Export Functionality**: Save or copy sorting results
- **Batch Sorting**: Sort multiple students at once
- **Quick Setup Options**: Pre-configured capacity settings

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or Download the Project**
   ```bash
   # If you have git
   git clone [repository-url]
   
   # Or download and extract the ZIP file
   ```

2. **Navigate to Project Directory**
   ```bash
   cd "Sorting Ceremony"
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start the Development Server**
   ```bash
   npm start
   ```

5. **Open Your Browser**
   - The app will automatically open at `http://localhost:3000`
   - If it doesn't open automatically, manually navigate to this URL

### Build for Production
```bash
npm run build
```

## 🎮 How to Use

### 1. Setup House Capacities
- Use **Quick Setup** buttons for common configurations:
  - Small Class (5 each)
  - Medium Class (10 each) 
  - Large Class (20 each)
  - Random (5-15 each)
- Or manually enter custom capacities for each house
- Click **"🎩 Awaken the Sorting Hat"** to begin

### 2. Sort Students
- Enter a student's full name in the input field
- Click **"🔮 Begin Sorting Ritual"** or press Enter
- Watch the magical sorting animation unfold
- See the dramatic house reveal with personalized quotes

### 3. Monitor Progress
- **House Cards**: View real-time capacity, member lists, and progress bars
- **Statistics Panel**: Track overall progress and house distribution
- **Sorting Chronicle**: Review complete sorting history with timestamps

### 4. Advanced Features
- **Batch Sorting**: Use "👥 Sort Multiple Students" for bulk operations
- **Export Results**: Save sorting chronicle to text file or copy to clipboard
- **Responsive Design**: Use on any device - desktop, tablet, or mobile

## 🎨 Design Features

### Color Palette
- **Gryffindor**: Deep red (#740001) with gold accents (#D3A625)
- **Hufflepuff**: Bright yellow (#FFD800) with black (#000000)
- **Ravenclaw**: Dark blue (#0E1A40) with bronze (#946B2D)
- **Slytherin**: Forest green (#1A472A) with silver (#AAAAAA)

### Typography
- **Headers**: Cinzel (elegant serif font)
- **Body**: Crimson Text (readable serif)
- **Special**: MedievalSharp (magical medieval style)
- **Code**: Courier New (monospace for results)

### Animations
- **Floating Elements**: Gentle up-and-down movement for magical feel
- **Shimmer Effects**: Animated gradients on important elements
- **Hover Transitions**: Smooth scaling and shadow effects
- **Progress Bars**: Animated filling with shimmer overlays

## 📱 Responsive Design

### Desktop (1200px+)
- Four-column house grid layout
- Full-width components with optimal spacing
- Large, prominent sorting interface

### Tablet (768px - 1199px)
- Two-column house grid layout
- Adjusted component sizing
- Touch-friendly interface elements

### Mobile (< 768px)
- Single-column stacked layout
- Optimized input fields and buttons
- Condensed statistics display

## 🛠️ Technical Details

### Built With
- **React 18.2.0** - Modern JavaScript framework
- **Styled Components 5.3.5** - CSS-in-JS styling solution
- **Modern CSS** - Flexbox, Grid, Custom Properties
- **ES6+ JavaScript** - Latest language features

### Architecture
```
src/
├── components/           # React components
│   ├── Header.js        # Main title and branding
│   ├── CapacitySetup.js # House capacity configuration
│   ├── SortingSection.js# Student sorting interface
│   ├── HouseDisplay.js  # House cards and status
│   ├── Statistics.js    # Progress and analytics
│   └── ResultsPanel.js  # Sorting chronicle
├── styles/
│   └── GlobalStyles.js  # Global CSS and themes
├── App.js               # Main application component
└── index.js             # React DOM entry point
```

### State Management
- **React Hooks** (useState, useEffect)
- **Local State** for real-time updates
- **No External Dependencies** for state management

### Performance Features
- **Code Splitting** ready for production builds
- **Optimized Animations** using CSS transforms
- **Efficient Re-renders** with React best practices
- **Lazy Loading** capabilities for future enhancements

## 🌟 Upcoming Features

### Planned Enhancements
- **Sound Effects**: Magical audio for sorting ceremonies
- **Advanced Animations**: More elaborate sorting hat animations
- **Personality Quiz**: Answer questions before sorting
- **Student Profiles**: Extended information storage
- **Multiple Languages**: International wizarding support
- **Dark/Light Themes**: Additional visual themes

### Potential Integrations
- **Firebase**: Cloud storage for sorting sessions
- **Authentication**: User accounts and saved ceremonies
- **Social Sharing**: Share sorting results on social media
- **Print Certificates**: Generate house membership certificates

## 🐛 Troubleshooting

### Common Issues

1. **"npm install" fails**
   - Ensure you have Node.js 14+ installed
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` and `package-lock.json`, then reinstall

2. **Website doesn't load**
   - Check if port 3000 is available
   - Try a different port: `npm start -- --port 3001`

3. **Styles not showing correctly**
   - Hard refresh the browser (Ctrl+F5 or Cmd+Shift+R)
   - Clear browser cache and cookies

4. **Mobile layout issues**
   - Ensure viewport meta tag is present (included by default)
   - Test in device emulation mode in browser dev tools

### Browser Support
- **Chrome** 80+ ✅
- **Firefox** 75+ ✅
- **Safari** 13+ ✅
- **Edge** 80+ ✅
- **Mobile browsers** (iOS Safari, Chrome Mobile) ✅

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly on different devices
5. Submit a pull request

### Code Style
- Use functional React components with hooks
- Follow styled-components naming conventions
- Maintain responsive design principles
- Add comments for complex logic
- Test on multiple screen sizes

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **J.K. Rowling** - Creator of the Harry Potter universe
- **Warner Bros** - Harry Potter film franchise inspiration
- **Google Fonts** - Beautiful typography
- **React Team** - Amazing framework
- **Styled Components** - Elegant styling solution

---

**"It is our choices that show what we truly are, far more than our abilities."** - Albus Dumbledore

## 📞 Support

For questions, issues, or suggestions:
- Create an issue in the project repository
- Check the troubleshooting section above
- Review the code documentation

**Made with magic and React** ✨⚛️✨