'use strict';

import dom from './dom-pruebas.js';//clase estatica
let productos = ["chicle","paleta","gaseosa"];
let mesas = ["1","2","3","4","5","6","7"];

let asignaciones ={

};

((doc, win) => {
	
	doc.addEventListener('DOMContentLoaded',event => {
		document.getElementById("alert").style.display = "none";

		dom.getElemento("agregar").addEventListener('click', event => {
			asignar(dom.getElemento("mesas").value,dom.getElemento("productos").value);
		});

		setItems(doc.querySelector("#productos"),productos);
		setItems(doc.querySelector("#mesas"),mesas);

		preparacionAsignaciones(asignaciones,mesas);
		
	});

	let setItems=(elemento,listado)=>{
		for (const iterator of listado) {
			let option = document.createElement("option");
			option.text = iterator;
			elemento.add(option);
		}

	}

	let asignar=(mesa,producto)=>{
		asignaciones[mesa].push(producto);

		console.log(asignaciones);

		dom.getElemento("texto").innerText= producto+" agregado correctamente";

		document.getElementById("alert").style.display = "block";
		window.setTimeout(function () {
			document.getElementById("alert").style.display = "none";
		}, 3000);
	}
	
	let preparacionAsignaciones=(dic,lista)=>{
		for (const iterator of lista) {
			dic[iterator] = [];
		}
	}

})(document, window);

/* fetch('https://cors-anywhere.herokuapp.com/' + 'https://www.ins.gov.co/Noticias/Paginas/Coronavirus.aspx').then(blob => blob.text()).then(ext => {
	console.log(ext);
});
 
async function funcionAsincrona(){
	let objHtml;
	const response = await fetch('https://cors-anywhere.herokuapp.com/' + 'https://www.ins.gov.co/Noticias/Paginas/Coronavirus.aspx');
	const blob = await response.blob();
	console.log(blob);
	objHtml=URL.createObjectURL(blob)
  }
funcionAsincrona(); */
