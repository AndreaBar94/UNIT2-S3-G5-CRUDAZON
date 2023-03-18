const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const authorization =
	"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0MzI5NGY4MWI0MjAwMTM5YjI3ZWQiLCJpYXQiOjE2NzkwNDUyNjgsImV4cCI6MTY4MDI1NDg2OH0.EGPnEwkbnVSqY-Ge8ztqwPcZgCwYS7Qsj74qRwqQxDs";

const URLParams = new URLSearchParams(window.location.search);
const selectedId = URLParams.get("id");

const endpoint = selectedId ? apiUrl + selectedId : apiUrl;
const method = selectedId ? "PUT" : "POST";

window.onload = () => {
	if (selectedId) {
		document.getElementById("back-office-title").innerText = "Modifica l'articolo selezionato";
		document.getElementById("submitBtn").classList.add("d-none");
		document.getElementById("modify").classList.remove("d-none");
		document.getElementById("delete-btn").classList.remove("d-none");

		fecth(endpoint, {
			headers: {
				Authorization: authorization,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				const { name, description, price, brand, imageUrl } = data;
				document.getElementById("name").value = name;
				document.getElementById("description").value = description;
				document.getElementById("price").value = price;
				document.getElementById("brand").value = brand;
				document.getElementById("URL").value = imageUrl;
			})
			.catch((err) => {
				console.log(err);
			});
	}
};
//eliminazione prodotti
const handleDelete = () => {
	let areYouSure = confirm("Sei sicuro di voler eliminare questo articolo?");
	if (areYouSure) {
		try {
			fetch(endpoint, {
				method: "DELETE",
				headers: {
					Authorization: authorization,
				},
			}).then((res) => {
				if (res.ok) {
					alert("Prodotto eliminato correttamente");
					window.location.href = "index.html";
				} else {
					throw new Error("Eliminazione non riuscita");
				}
			});
		} catch (error) {
			console.log(err);
			alert("Eliminazione non riuscita");
		}
	}
};

//controllo l'output dell'evento del form
const handleSubmit = (event) => {
	event.preventDefault();

	const product = {
		name: document.getElementById("name").value,
		description: document.getElementById("description").value,
		price: document.getElementById("price").value,
		brand: document.getElementById("brand").value,
		imageUrl: document.getElementById("URL").value,
	};
	if (!name || !description || !price || !url || !brand) {
		alert("Tutti i campi sono obbligatori!");
		return;
	}

	fetch(endpoint, {
		method,
		headers: {
			Authorization: authorization,
			"Content-type": "application/json",
		},
		body: JSON.stringify(product),
	})
		.then(() => {
			if (!selectedId) {
				document.getElementById("name").value = "";
				document.getElementById("description").value = "";
				document.getElementById("price").value = "";
				document.getElementById("brand").value = "";
				document.getElementById("URL").value = "";
			} else {
				window.location.href = "index.html";
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

//comparsa tasto modifica prodotti
let modifyBtn1 = document.getElementById("modifyBtn");
modifyBtn1.addEventListener("click", () => {
	let cardModBtns = document.querySelectorAll("#cardModBtn");
	cardModBtns.forEach((cardModBtn) => {
		cardModBtn.style.display = "inline-block";
	});
});

//prodotti a schermo
window.onload = () => {
	fetch(apiUrl, {
		headers: {
			Authorization: authorization,
		},
	})
		.then((responseObj) => responseObj.json())
		.then((products) => {
			let row = document.getElementById("row1");
			products.forEach((product, index) => {
				let col = document.createElement("div");
				col.className = "col";
				col.innerHTML = `
							<div class="card mb-4 shadow-sm">
				                <img src="${products[index].imageUrl}" class="card-img-top" alt="none">
				                    <div class="card-body">
				                        <h5 class="card-title">${products[index].name}</h5>
				                        <p class="card-text">${products[index].description}</p>
				                        <p class="card-text">€ ${products[index].price}</p>
				                        <a href="details.html?id=${products[index]._id}" class="btn btn-primary">Scopri di piú</a>
				                        <a href="back-office.html?id=${products[index]._id}" id="cardModBtn" class="btn btn-primary">Modify</a>
					                </div>
					            </div>
							</div>`;
				row.appendChild(col);
			});
		});
};

//dettaglio prodotto
// window.onload = () => {
// 	fetch(endpoint, {
// 		headers: {
// 			Authorization: authorization,
// 		},
// 	})
// 		.then((responseObj) => responseObj.json())
// 		.then((detail) => {
// 			let row = document.getElementById("row1");

// 			let col = document.createElement("div");
// 			col.className = "col";
// 			col.innerHTML = `
// 							<div class="card mb-4 shadow-sm">
// 				                <img src="${detail[index].imageUrl}" class="card-img-top" alt="none">
// 				                    <div class="card-body">
// 				                        <h5 class="card-title">${detail[index].name}</h5>
// 				                        <p class="card-text">${detail[index].description}</p>
// 				                        <p class="card-text">€ ${detail[index].price}</p>
// 				                        <a href="details.html?id=${detail[index]._id}" class="btn btn-primary">Scopri di piú</a>
// 				                        <a href="back-office.html?id=${detail[index]._id}" id="cardModBtn" class="btn btn-primary">Modify</a>
// 					                </div>
// 					            </div>
// 							</div>`;
// 			row.appendChild(col);
// 		});
// };
