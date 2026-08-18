import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const communityImagesBasePath = path.join(__dirname, './data/Communities');
const outputImagesPath = path.join(__dirname, './data/ExportedImages');

const IMAGE_BASE_URL =
  "https://assets-upload.nyc3.digitaloceanspaces.com/assets/communityImgs";


export const getImagesForCommunity = async (slug, stateCode) => {
  const communityFolder = path.join(
    communityImagesBasePath,
    stateCode,
    slug
  );

  console.log(`Looking for images in: ${communityFolder}`);


  // Create ExportedImages folder if it doesn't exist
  if (!fs.existsSync(outputImagesPath)) {
    fs.mkdirSync(outputImagesPath, { recursive: true });
  }


  // Check if folder exists
  if (!fs.existsSync(communityFolder)) {
    console.warn(`No image folder found for slug: ${slug}`);

    return {
      images: [],
      thumbnail: null
    };
  }


  // Read all files
  const files = fs.readdirSync(communityFolder);


  // Filter image files
  const imageExtensions = [
    '.jpg',
    '.jpeg',
    '.png',
    '.webp',
    '.gif'
  ];


  const images = files.filter(file =>
    imageExtensions.includes(
      path.extname(file).toLowerCase()
    )
  );


  if (images.length === 0) {
    console.warn(`No images found in folder for slug: ${slug}`);

    return {
      images: [],
      thumbnail: null
    };
  }


  /**
   * Select thumbnail
   * Priority:
   * 1. Image name contains "thumbnail"
   * 2. First image in folder
   */
  const thumbnailOriginal =
    images.find(image =>
      image.toLowerCase().includes('thumbnail')
    ) || images[0];


  const exportedImages = [];
  let thumbnailUrl = null;


  // Copy and rename images
  images.forEach((imageName) => {

    const sourcePath = path.join(
      communityFolder,
      imageName
    );


    const ext = path.extname(imageName);

    const originalName = path.basename(
      imageName,
      ext
    );


    const uniqueId =
      `${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 8)}`;


    const newImageName =
      `${originalName}_${uniqueId}${ext}`;


    const destPath = path.join(
      outputImagesPath,
      newImageName
    );


    fs.copyFileSync(
      sourcePath,
      destPath
    );


    console.log(
      `Copied: ${imageName} -> ${newImageName}`
    );


    const imageUrl =
      `${IMAGE_BASE_URL}/${newImageName}`;


    exportedImages.push(imageUrl);


    // Save thumbnail URL
    if (imageName === thumbnailOriginal) {
      thumbnailUrl = imageUrl;
    }

  });


  console.log(
    `Found ${exportedImages.length} images for: ${slug}`
  );


  return {
    images: exportedImages,
    thumbnail: thumbnailUrl
  };
};