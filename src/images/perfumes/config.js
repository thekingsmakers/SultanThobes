const perfumeConfig = {
    arabian_oud: [
        'Cooc.jpg',
        'Creed.jpg',
        'Dior-Perfumes.jpg',
        'Elysium Roja.jpg'
    ],
    french_perfumes: [
        'Cooc Chanele.jpg',
        'Creed.jpg',
        'Dior.jpg',
        'Elysium Roja.jpg'
    ],
    luxury_brands: [
        'Cooc Chanele.jpg',
        'Creed.jpg',
        'Dior-Perfumes.jpg',
        'Elysium Roja.jpg'
    ]
};

// Function to get images for a specific folder
function getImagesForFolder(folder) {
    return perfumeConfig[folder] || [];
}

// Function to get style name based on index
function getStyleName(index) {
    return `Style ${index + 1}`;
}

// Function to add a new image to a folder
function addImageToFolder(folder, imageName) {
    if (perfumeConfig[folder]) {
        if (!perfumeConfig[folder].includes(imageName)) {
            perfumeConfig[folder].push(imageName);
            const event = new CustomEvent('imagesUpdated', { detail: perfumeConfig });
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
    const folders = ['arabian_oud', 'french_perfumes', 'luxury_brands'];
    let hasChanges = false;
    
    folders.forEach(folder => {
        const currentImages = getImagesForFolder(folder);
        if (currentImages.length > 0) {
            hasChanges = true;
        }
    });

    if (hasChanges) {
        const event = new CustomEvent('imagesUpdated', { detail: perfumeConfig });
        window.dispatchEvent(event);
    }
}

// Function to get price based on style and region
function getPrice(folder, styleIndex) {
    const basePrices = {
        'arabian_oud': 299.99,
        'french_perfumes': 399.99,
        'luxury_brands': 499.99
    };
    
    return basePrices[folder] || 299.99;
}

// Set up an interval to check for new images
setInterval(updateImageConfig, 5000);

// Initial update
updateImageConfig();