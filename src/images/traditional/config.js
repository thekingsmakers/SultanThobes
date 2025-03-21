const imageConfig = {
    Qatari: [
        'white-qatari.jpg',
        'images.jpg',
        'istockphoto-540525724-612x612.jpg',
        '4816f9380c71c04c575f0aa1cd7ca1ce.jpg'
    ],
    Emarati: [
        'white-qatari.jpg',
        'images.jpg',
        'istockphoto-540525724-612x612.jpg',
        '4816f9380c71c04c575f0aa1cd7ca1ce.jpg'
    ],
    Omani: [
        'white-qatari.jpg',
        'images.jpg',
        'istockphoto-540525724-612x612.jpg',
        '4816f9380c71c04c575f0aa1cd7ca1ce.jpg'
    ],
    Somali: [
        'white-qatari.jpg',
        'images.jpg',
        'istockphoto-540525724-612x612.jpg',
        '4816f9380c71c04c575f0aa1cd7ca1ce.jpg'
    ]
};

// Function to get images for a specific folder
function getImagesForFolder(folder) {
    return imageConfig[folder] || [];
}

// Function to get style name based on index
function getStyleName(index) {
    return `Style ${index + 1}`;
}

// Function to add a new image to a folder
function addImageToFolder(folder, imageName) {
    if (imageConfig[folder]) {
        if (!imageConfig[folder].includes(imageName)) {
            imageConfig[folder].push(imageName);
            const event = new CustomEvent('imagesUpdated', { detail: imageConfig });
            window.dispatchEvent(event);
            return true;
        }
    }
    return false;
}

// Check for image file extensions
function isImageFile(filename) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
    return imageExtensions.includes(ext);
}

// Function to check for new images in the folders
function updateImageConfig() {
    const folders = ['Qatari', 'Emarati', 'Omani', 'Somali'];
    let hasChanges = false;
    
    folders.forEach(folder => {
        const currentImages = getImagesForFolder(folder);
        if (currentImages.length > 0) {
            hasChanges = true;
        }
    });

    if (hasChanges) {
        const event = new CustomEvent('imagesUpdated', { detail: imageConfig });
        window.dispatchEvent(event);
    }
}

// Function to get price based on style and region
function getPrice(folder, styleIndex) {
    const basePrices = {
        'Qatari': 149.99,
        'Emarati': 159.99,
        'Omani': 139.99,
        'Somali': 129.99
    };
    
    return basePrices[folder] || 149.99;
}

// Set up an interval to check for new images
setInterval(updateImageConfig, 5000);

// Initial update
updateImageConfig();