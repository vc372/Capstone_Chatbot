export default function(webcam) {
	return {image: webcam.current.getScreenshot()}
}