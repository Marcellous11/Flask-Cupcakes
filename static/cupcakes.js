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

	for (let cupcakeData of response.data.cupcakes) {
		let newCupcake = $(generateCupcakeHTML(cupcakeData));
		$('#new-cupcake-list').append(newCupcake);
	}
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

	let newCupcakes = $(generateCupcakeHTML(newCupcakeresponse.data.cupcakes));
	$('#new-cupcake-list').append(newCupcakes);
	$('#new-cupcake-form').trigger('reset');
});

// delBtn = document.getElementsByClassName('delete-btn');
// delBtn.addEventListener('click', async function(e) {
// 	e.preventDefault();
// 	let $cupcake = $(evt.target).closest('div');
// 	let cupcakeId = $cupcake.attr('data-cupcake-id');

// 	await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
// 	$cupcake.remove();
// });
