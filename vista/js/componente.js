//uso de componente interno en componente relacionado a la navegacion de rutas
//Se usa sync para que la referencia del parametro pueda ser modificada por el hijo
const componente = Vue.component('componente-padre',{
	data(){
		return{
			atributo:"Componente padre",
			color:"indigo",
			parametro:this.$route.params.p//Acceso al tado pasado como parametro en la URL
		}
	},
	methods:{
		funcion(){
			return "Vue";
		}
	},
	template: 
	`
		<div id="titulo">
			<h1>{{parametro}}</h1>
			<p>{{atributo}}</p>
			<componente-hijo ref="idHijo" :parametro.sync="color"></componente-hijo>
			<otro></otro>
		</div>
	`,
	components:{//otra forma de asignar componentes hijos inicializados en un json
		otro
	},
	mounted(){//Se ejecuta cunado inicia el ciclo de vida del componente
		//Accede al atributo del componente referenciado
		//Desde el componente padre accede a un dato del hijo
		this.$refs.idHijo.atributo="Componente Hijo";
	}
});
