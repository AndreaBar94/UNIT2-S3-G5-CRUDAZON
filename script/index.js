//creazione oggetti
function handleSubmit(event) {
	event.preventDefault();

	const name = document.getElementById("name").value;
	const description = document.getElementById("description").value;
	const price = document.getElementById("price").value;
	const url = document.getElementById("URL").value;
	const brand = document.getElementById("brand").value;

	if (!name || !description || !price || !url) {
		alert("Tutti i campi sono obbligatori!");
		return;
	}

	const newProduct = {
		name: name,
		description: description,
		price: price,
		imageUrl: url,
		brand: brand,
		userId: Math.floor(Math.random() * 100),
	};

	// salvo nuovo prodotto
	fetch("https://striveschool-api.herokuapp.com/api/product/", {
		method: "POST",
		body: JSON.stringify(newProduct),
		headers: {
			"Content-Type": "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MzI5NGY4MWI0MjAwMTM5YjI3ZWQiLCJpYXQiOjE2NzkwNTI4NTUsImV4cCI6MTY4MDI2MjQ1NX0.8Xv17qdHRaPyxhYsL5-7jeEKLcYdfoPIijkoSwv8WJk",
		},
	})
		.then((response) => response.json())
		.then((data) => {
			// mostra un messaggio di successo
			alert("Prodotto creato con successo!");
			// resetta il form
			document.getElementById("productForm").reset();
		})
		.catch((error) => {
			// mostra un messaggio di errore
			alert("Si è verificato un errore durante la creazione del prodotto: " + error.message);
		});
}
//modifica prodotti
let modifyBtn = document.getElementById("modifyBtn");
modifyBtn.addEventListener("click", () => {
	let cardModBtns = document.querySelectorAll("#cardModBtn");
	cardModBtns.forEach((cardModBtn) => {
		cardModBtn.style.display = "block";
	});
});

function deleteProduct() {
	// effettua una chiamata al server per eliminare il prodotto
	fetch("https://striveschool-api.herokuapp.com/api/product/" + productId, {
		method: "DELETE",
	})
		.then((response) => response.json())
		.then((data) => {
			// mostra un messaggio di successo
			alert("Prodotto eliminato con successo!");
			// resetta il form
			document.getElementById("productForm").reset();
			// nasconde il pulsante di eliminazione
			document.getElementById("delete-btn").classList.add("d-none");
		})
		.catch((error) => {
			// mostra un messaggio di errore
			alert("Si è verificato un errore durante l'eliminazione del prodotto: " + error.message);
		});
}

function validateForm() {
	// recupera il valore del campo ID del prodotto
	const productId = document.getElementById("productId").value;

	// se il campo ID del prodotto è vuoto, nasconde il pulsante di eliminazione
	if (!productId) {
		document.getElementById("delete-btn").classList.add("d-none");
	} else {
		document.getElementById("delete-btn").classList.remove("d-none");
	}
}

let onScreenProduct = async () => {
	try {
		let onScreenProduct = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
			headers: {
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MzI5NGY4MWI0MjAwMTM5YjI3ZWQiLCJpYXQiOjE2NzkwNDUyNjgsImV4cCI6MTY4MDI1NDg2OH0.EGPnEwkbnVSqY-Ge8ztqwPcZgCwYS7Qsj74qRwqQxDs",
			},
		});
		let products = await onScreenProduct.json();
		let cards = document.querySelectorAll(".card");
		cards.forEach((card, index) => {
			card.innerHTML = `
                <img src="${products[index].imageUrl}" class="card-img-top" alt="none">
                    <div class="card-body">
                        <h5 class="card-title">${products[index].name}</h5>
                        <p class="card-text">${products[index].description}</p>
                        <p class="card-text">€${products[index].price}</p>
                        <a href="#" class="btn btn-primary">View</a>
                        <button href="#" id="cardModBtn" class="btn btn-primary">Modify</button>
                    </div>
                </div>`;
		});
	} catch (error) {
		console.log(error);
	}
};
onScreenProduct();
