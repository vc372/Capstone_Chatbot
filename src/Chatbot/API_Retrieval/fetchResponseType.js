export default async function (message) {
	const label = await fetch('/process_message?message='+message)
	.then(response => response.json())
	.then(data => {return data['Response_text']})
	return label
}