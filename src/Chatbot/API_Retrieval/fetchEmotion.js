export default async function(data) {

	const label = await fetch('/process_image', {
		method: 'POST',
		body: JSON.stringify(data)
	})
	.then(response => response.json())
	.then(data => {return data['Image_label']})

	return label
}
