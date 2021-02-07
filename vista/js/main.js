'use strict';

import dom from './dom-pruebas.js';//clase estatica
let productos = ["chicle","paleta","gaseosa"];
let mesas = ["1","2","3","4","5","6","7"];

((doc, win) => {
	
	doc.addEventListener('DOMContentLoaded',event => {
		setItems(doc.querySelector("#productos"),productos);
		setItems(doc.querySelector("#mesas"),mesas);
	});

	let setItems=(elemento,listado)=>{
		for (const iterator of listado) {
			let option = document.createElement("option");
			option.text = iterator;
			elemento.add(option);
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
