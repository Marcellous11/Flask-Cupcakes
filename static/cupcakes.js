const BASE_URL = 'http://127.0.0.1:5000/api';

// Creates HTML for list
function generateCupcakeHTML(cupcake) {
	return `
            <div data-cupcake-id=${cupcake.id}> 
                <li>${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating} 
                    <button class="delete-btn"> Remove </button>
                </li>
                <img class="cupcake-img" src="${cupcake.image}" alt="(no image)">
            </div>
    `;
}

// Get request to get cupcake data from API
async function showInitalCupcakes() {
	const response = await axios.get(`${BASE_URL}/cupcakes`);
	console.log(response);
	for (let cupcakeData of response.data.cupcake) {
		let newCupcake = generateCupcakeHTML(cupcakeData);
		$('#new-cupcake-list').append(newCupcake);
	}
	showInitalCupcakes();
}
form = document.getElementById('new-cupcake-form');
form.addEventListener('submit', async function(e) {
	e.preventDefault();

	let flavor = $('#form-flavor').val();
	let rating = $('#form-rating').val();
	let size = $('#form-size').val();
	let image = $('#form-image').val();

	const newCupcakeresponse = await axios.post(`${BASE_URL}/cupcakes`, {
		flavor,
		rating,
		size,
		image
	});
	console.log(newCupcakeresponse.data.cupcake);

	let newCupcakes = generateCupcakeHTML(newCupcakeresponse.data.cupcake);
	$('#new-cupcake-list').append(newCupcakes);
	$('#new-cupcake-form').trigger('reset');

	delBtn = document.getElementsByClassName('delete-btn');
	Array.from(delBtn).forEach(function(element) {
		console.log(element);

		element.addEventListener('click', async function(e) {
			e.preventDefault();
			let $cupcake = $(e.target).closest('div');
			let cupcakeId = $cupcake.attr('data-cupcake-id');

			await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
			$cupcake.remove();
		});
	});
});
