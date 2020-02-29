<template>
  <div class="notas">
    <hr />
    <h1>Notas</h1>
    <label for="myfile">Subir imagen a firebase:</label>
    <input type="file" id="myfile" name="myfile" @change="onFileSelected" />
    <button @click="onUpload">Upload</button>
    <div id="app">
      <form v-on:submit.prevent="nuevaTarea">
        Cuerpo Nota
        <input v-model="cuerpoInput" placeholder="¿Que quieres recordar?" id="inputNota" />
      </form>
      <p>tienes {{completadas}} tareas pendientes de  {{notas.length}} <button type="button" v-on:click="borrarCompletada">X</button> Borrar tareas completadas</p>
      <div class="card carta" v-for="notas in notas" :key="notas" style="margin-left:25%">
        <img class="card-img-top" src alt />
        <div class="card-body">
          <h6 class="card-text"></h6>
          <h1 v-if="notas.completada==true" style="color:#24EC1E; text-decoration:line-through;">
            <img id="circulo" src="../assets/check-verde.png" v-on:click="completar(notas.pos)" />
            {{ notas.cuerpoNota }}
            <img id="borrar" src="cierra.png" v-on:click="borrar(notas.pos)" />
          </h1>
          <h1 v-else>
            <img id="circulo" src="../assets/circulo.png" v-on:click="completar(notas.pos)" />
            {{ notas.cuerpoNota }}
            <img id="borrar" src="../assets/cierra.png" v-on:click="borrar(notas.pos)" />
          </h1>
          <p>
            Prioridad:
            <template v-if="notas.prioridad==1">
              <button style="background-color:#16bce8; ">Low</button>
              <button v-on:click="cambiarPrioridad(2,notas.pos)">Normal</button>
              <button v-on:click="cambiarPrioridad(3,notas.pos)">Hight ^</button>
            </template>
            <template v-if="notas.prioridad==2">
              <button v-on:click="cambiarPrioridad(1,notas.pos)">Low</button>
              <button style="background-color:#3e1ee2">Normal</button>
              <button v-on:click="cambiarPrioridad('3',notas.pos)">Hight ^</button>
            </template>
            <template v-if="notas.prioridad==3">
              <button v-on:click="cambiarPrioridad(1,notas.pos)">Low</button>
              <button v-on:click="cambiarPrioridad(2,notas.pos)">Normal</button>
              <button style="background-color:red; ">Hight ^</button>
            </template>

          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
const db = firebase.database();
export default {
  data() {
    return {
      notas: [{ pos: "", cuerpoNota: "", fecha: "", completa: false }],
      cuerpoInput: "",
      selectedFile: null
    };
  },
  mounted() {
    if (localStorage.notas) {
      this.notas = JSON.parse(localStorage.getItem("notas"));
    }
  },
  watch: {
    name(newName) {
      localStorage.name = newName;
    }
  },
  methods: {
    onUpload() {
      const storageRef = firebase.storage().ref("/img/");
      const task = storageRef.put(this.selectedFile);
      task.on("state_changed", snapshot => {
        let percentage = (snapshot.bytesTransfered / snapshot.totalBytes) * 100;
        this.UploadValue = percentage;
      });
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    ID: function() {
      return Math.ceil(Math.random() * 999999999);
    },
    borrarCompletada: function () {
                for (var i = 0; i < this.notas.length; i++) {
                    for (var x = 0; x < this.notas.length; x++) {
                        if (this.notas[x].completada) {
                            this.notas.splice(x, 1);
                        }
                    }
                    for (var y = 0; y < this.notas.length; y++) {
                        this.notas[y].pos = y;
                    }
                    localStorage.setItem("notas", JSON.stringify(this.notas));
                }
            },
          borrar: function (posicion) {
                  this.notas.splice(posicion, 1);
                  for (var x = 0; x < this.notas.length; x++) {
                      this.notas[x].pos = x;
                  }
                  localStorage.setItem("notas", JSON.stringify(this.notas));
              },
              cambiarPrioridad: function (prio, pos) {
                this.notas[pos].prioridad = prio;
            },           
            completar: function (pos) {
                if (this.notas[pos].completada == false) {
                    this.notas[pos].completada = true;
                } else {
                    this.notas[pos].completada = false;
                }
            },
    
    nuevaTarea: function() {
      this.notas.push({
        pos: this.notas.length,
        tituloNota: this.nueva,
        cuerpoNota: this.cuerpoInput,
        prioridad: 2,
        fecha: new Date(),
        completada: false
        },
      ),
      localStorage.setItem("notas", JSON.stringify(this.notas));
      var query = db.ref("VueNotas/usuario/" + this.ID());
      query.update({
        pos: this.notas.length,
        cuerpoNota: this.cuerpoInput,
        fecha: new Date(),
        completada: false
      });
    },
        computed: {
            completadas: function () {
                var completadas = this.notas.filter(function (nota) {
                    return nota.completada == false;
                })
                return completadas.length;
            },

            ordenados: function () {
                var vm = this;
                var ordenar = _.orderBy(this.notas, ['prioridad'], ['desc']);
                return ordenar.filter(function (nota) {
                    return nota.tarea.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
                })
            }
        }
  }
};
</script>