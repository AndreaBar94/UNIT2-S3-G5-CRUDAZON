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
//comparsa tasto modifica prodotti
let modifyBtn1 = document.getElementById("modifyBtn");
modifyBtn1.addEventListener("click", () => {
	let cardModBtns = document.querySelectorAll("#cardModBtn");
	cardModBtns.forEach((cardModBtn) => {
		cardModBtn.style.display = "inline-block";
	});
});
//form di modifica

//mostra a schermo i prodotti
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
                        <p class="card-text">€ ${products[index].price}</p>
                        <a href="#" class="btn btn-primary">View</a>
                        <a href="modify.html?${products[index]._id}" id="cardModBtn" class="btn btn-primary">Modify</a>
                    </div>
                </div>`;
		});
	} catch (error) {
		console.log(error);
	}
};
onScreenProduct();

function modifyProduct(event) {
	document.addEventListener("DOMContentLoaded", function () {
		// Recupera l'ID del prodotto dall'URL
		const urlParams = new URLSearchParams(window.location.search);
		const productId = urlParams.get("id");
		console.log(productId);
		// Effettua una richiesta GET al server per ottenere i dati del prodotto da modificare
		fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
			headers: {
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MzI5NGY4MWI0MjAwMTM5YjI3ZWQiLCJpYXQiOjE2NzkwNTI4NTUsImV4cCI6MTY4MDI2MjQ1NX0.8Xv17qdHRaPyxhYsL5-7jeEKLcYdfoPIijkoSwv8WJk",
			},
		})
			.then((response) => {
				// Se la risposta è OK (200)
				if (response.ok) {
					// Estrai i dati dalla risposta JSON
					return response.json();
				} else {
					// Altrimenti lancia un errore
					throw new Error("Errore durante il recupero dei dati del prodotto.");
				}
			})
			.then((data) => {
				// Recupera i dati del prodotto e assegnali ai campi del form
				const nameField = document.getElementById("name");
				const descriptionField = document.getElementById("description");
				const priceField = document.getElementById("price");
				const brandField = document.getElementById("brand");
				const URLField = document.getElementById("URL");

				nameField.value = data.name;
				descriptionField.value = data.description;
				priceField.value = data.price;
				brandField.value = data.brand;
				URLField.value = data.URL;
			})
			.catch((error) => {
				// Se c'è stato un errore, mostra un messaggio di errore
				console.error(error);
				alert("Si è verificato un errore durante il recupero dei dati del prodotto.");
			});

		// Aggiungi un event listener al form di modifica
		document.getElementById("modifyForm").addEventListener("submit", function (event) {
			event.preventDefault();

			// Recupera i dati dal form
			const name = document.getElementById("name").value;
			const description = document.getElementById("description").value;
			const price = document.getElementById("price").value;
			const brand = document.getElementById("brand").value;
			const URL = document.getElementById("URL").value;

			// Costruisci l'oggetto con i dati da inviare al server
			const data = {
				name: name,
				description: description,
				price: price,
				brand: brand,
				URL: URL,
			};

			// Effettua la richiesta PUT al server
			fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization:
						"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MzI5NGY4MWI0MjAwMTM5YjI3ZWQiLCJpYXQiOjE2NzkwNTI4NTUsImV4cCI6MTY4MDI2MjQ1NX0.8Xv17qdHRaPyxhYsL5-7jeEKLcYdfoPIijkoSwv8WJk",
				},
				body: JSON.stringify(data),
			})
				.then((response) => {
					if (response.ok) {
						alert("Il prodotto è stato modificato con successo!");
						window.location.href = "index.html";
					} else {
						alert("Si è verificato un errore durante la modifica del prodotto.");
					}
				})
				.catch((error) => {
					console.error(error);
					alert("Si è verificato un errore durante la modifica del prodotto.");
				});
		});
	});
}
