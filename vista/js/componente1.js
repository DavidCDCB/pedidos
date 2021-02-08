//creacion de componente internro con parametro de entrada y texto incrustado "slot"
Vue.component('componente-hijo', {
	props:['parametro'],
	data(){
		return{
			atributo:""
			
		}
	},
	methods:{
		//Funcion para emitir un cambio en un parametro determinado
		//accede a los atributos del componente padre al igual que las funciones
		cambiar(){
			this.$emit("update:parametro","red");
			this.$parent.atributo="MODIFICADO DESDE EL HIJO";
			this.$parent.funcion();
			return "Vue";
		}
	},
	template: 
	`
		<div id="titulo" :class="parametro" @click="cambiar">
			{{atributo}}
			<slot></slot>
		</div>
	`
}) 

//Se puede crear el cuerpo de un componente para usarlo en "Componets" del padre
let otro = {
	name:"otroHijo",
	props:['parametro'],
	data(){
		return{
			atributo:"otro Componente Hijo"
			
		}
	},
	template: 
	`
		<div id="titulo">
			{{atributo}}
		</div>
	`
}