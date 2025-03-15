const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function centerPointInImage(inputPath, outputPath, pointX, pointY) {
	try {
		// Read image metadata to get dimensions
		const metadata = await sharp(inputPath).metadata();
		const { width, height } = metadata;

		const leftPadding = width - 2 * pointX;
		const topPadding = height - 2 * pointY;

		// Calculate new canvas size
		//const newWidth = Math.max(width, 2 * pointX);
		//const newHeight = Math.max(height, 2 * pointY);
		const newWidth = leftPadding + width;
		const newHeight = topPadding + height;

		// Calculate position to place the original image
		const leftOffset = leftPadding;
		const topOffset = topPadding;

		// Create a blank transparent image and composite the original image
		await sharp({
			create: {
				width: newWidth,
				height: newHeight,
				channels: 4,
				background: { r: 0, g: 0, b: 0, alpha: 0 }, // Transparent background
			},
		})
			.composite([
				{ input: inputPath, left: leftOffset, top: topOffset },
			])
			.toFile(outputPath);

		console.log(`Image saved to ${outputPath}`);
	} catch (error) {
		console.error('Error processing image:', error);
	}
}

// Example usage
const inputImagePath = path.join(__dirname, '../Link.png');
const outputImagePath = path.join(__dirname, '../Link-centered.png');
const pointX = 56; // X coordinate to center
const pointY = 32; // Y coordinate to center

centerPointInImage(inputImagePath, outputImagePath, pointX, pointY);
