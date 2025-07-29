import { vectorize, ColorMode, Hierarchical, PathSimplifyMode } from '@neplex/vectorizer';
import { readFile, writeFile } from 'node:fs/promises';

const src = await readFile('./lotus.png');

const start = (Date.now())

const svg = await vectorize(src, {
  // colorMode: ColorMode.Color,
  // colorPrecision: 6,
  // filterSpeckle: 4,
  // spliceThreshold: 45,
  // cornerThreshold: 60,
  // hierarchical: Hierarchical.Stacked,
  // mode: PathSimplifyMode.Spline,
  // layerDifference: 5,
  // lengthThreshold: 5,
  // maxIterations: 2,
  // pathPrecision: 5,

  // For more precise real world images
  colorMode: ColorMode.Color,           // Retains full color — essential for photos
  colorPrecision: 8,                    // Higher precision to preserve subtle gradients
  filterSpeckle: 2,                     // Light noise filtering (avoid losing detail)
  spliceThreshold: 55,                  // Moderate smoothing
  cornerThreshold: 40,                  // Balanced — keeps some corners, smooths the rest
  hierarchical: Hierarchical.Stacked,  // Keeps layering — helps with depth perception
  mode: PathSimplifyMode.Spline,       // Smooth curves for organic shapes
  layerDifference: 3,                  // Lower means more layers = better realism
  lengthThreshold: 2,                  // Keeps finer path detail
  maxIterations: 3,                    // A few optimization passes to clean output
  pathPrecision: 6 
});

const now = new Date();

await writeFile(`./test-vector-${Date.now()}.svg`, svg);

const end = (Date.now())

// Time taken
console.log("Time taken: ", (end - start) / 1000)