# How to Add Your Custom FBX Sorting Hat

## 📁 File Placement
1. Place your FBX file in the `public/models/` folder
2. Rename it to `hat.fbx` (or update the path in Header.js)

## 📋 Supported File Formats
- ✅ **FBX** (.fbx) - Primary format
- ✅ **GLTF/GLB** (.gltf, .glb) - Alternative format
- ✅ **OBJ** (.obj) - Simple geometry format

## 🎯 Recommended Model Specifications
- **Scale**: Any size (auto-scaled in code)
- **Textures**: Embedded or separate files in same folder
- **Poly Count**: Under 10,000 triangles for best performance
- **Format**: FBX 2020 or newer for best compatibility

## 🔧 How It Works
1. The component tries to load your FBX file from `/models/hat.fbx`
2. If the file doesn't exist or fails to load, it falls back to the simple 3D hat
3. The model gets automatic floating animations and magical effects

## 📝 File Structure
```
public/
├── models/
│   ├── hat.fbx                  ← Your FBX file goes here
│   ├── hat_texture.jpg          ← Optional texture files
│   └── ...
```

## 🎨 Customization Options
You can modify the following in `SortingHat3D.js`:
- **Scale**: Change `fbx.scale.setScalar(0.01)` 
- **Position**: Adjust `fbx.position.set(0, 0, 0)`
- **Animations**: Modify the floating and rotation effects
- **Materials**: Update lighting and material properties

## 🐛 Troubleshooting
- **Model not appearing**: Check browser console for loading errors
- **Wrong size**: Adjust the scale value in the FBX component
- **Missing textures**: Ensure texture files are in the same folder
- **Performance issues**: Reduce polygon count or texture resolution

## 🎪 Alternative File Formats
If you want to use a different format, update the loader in `SortingHat3D.js`:

For GLTF:
```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
const gltf = useLoader(GLTFLoader, modelPath);
```

For OBJ:
```javascript
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
const obj = useLoader(OBJLoader, modelPath);
```

Once you add your FBX file, the website will automatically use it instead of the simple geometric hat! 🎩✨