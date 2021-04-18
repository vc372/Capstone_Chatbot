export default async function (endpoint, message) {
	const label = await fetch(endpoint+'?message='+message)
	.then(response => response.json())
	.then(data => {return data['Message_Label']})
	return label
}