<template>
  <div class="row-x70-30 release-container">
    <div class="col-x70">
      <div class="datos">
        <div class="datosrequeridos">
          <form @submit.prevent="handleSubmit">
          <div class="field level">
            <label class="field-label has-text-grey is-size-6">*¿Cómo vas a alquilar la casa?</label>
            <div class="field-body control has-icons-left">
             <div class="select" :class="{'is-danger': errors.first('agencia') }">
                <select  @blur="validate('agencia')" name="agencia" v-model="agencia" v-validate="'required'" >
                  <option v-for="(nombre, clave) in tipodealquiler" :value="clave" :key="clave">{{ nombre }}</option>
                </select>
                 <span class="icon is-small is-left">
                 <i class="fas fa-exclamation-triangle has-text-danger" v-if="errors.first('agencia')"></i>
                <i class="" v-else ></i>
              </span>
              </div>
            </div>
          </div>
          <div class="field level" v-if="agencia === 'A' ">
            <label class="field-label has-text-grey is-size-6" for="cuantodinero">*¿Cuánto dinero cuesta la agencia?</label>
            <div class="field-body control has-icon" >
              <input class="input" @blur="validate('agenciasi')"  name="agenciasi" :class="{'is-danger': errors.first('agenciasi') }" v-validate="'required'" type="number" v-model.number="dineroagencia" placeholder="1500€">
              <span class="icon is-small is-right">
                <i class="fas fa-exclamation-triangle has-text-danger" v-if="errors.first('agenciasi')"></i>
                <i class="fas fa-euro-sign" v-else></i>
              </span>
            </div>
          </div>
          <div class="field level">
            <label class="field-label has-text-grey is-size-6" for>*¿Cuánto pagarás de fianza?</label>
            <div class="field-body control has-icon">
              <input class="input" @blur="validate('fianza')" type="number" name="fianza" :class="{'is-danger': errors.first('fianza') }" v-validate="'required'" v-model.number="fianza" placeholder="1000€">
              <span class="icon is-small is-right">
                <i class="fas fa-exclamation-triangle has-text-danger" v-if="errors.first('fianza')"></i>
                <i class="fas fa-euro-sign" v-else></i>
              </span>
            </div>
          </div>
          <div class="field level">
            <label class="field-label has-text-grey is-size-6" for>*Precio de alquiler mensual del piso</label>
            <div class="field-body control has-icon">
              <input class="input" @blur="validate('alquiler')" type="number" v-validate="'required|numeric'" name="alquiler" :class="{'input': true,'is-danger': errors.first('alquiler') }" v-model.number="alquiler" placeholder="1500€">
              <span class="icon is-small is-left">
                 <i class="fas fa-exclamation-triangle has-text-danger" v-if="errors.first('alquiler')"></i>
                <i class="fas fa-home" v-else ></i>
              </span>
            </div>
          </div>
          <div class="field level">
            <label class="field-label has-text-grey is-size-6" for>*Mi sueldo neto al mes es de <a style="font-size:10px" target="_blank" href="https://www.vozpopuli.com/calculadoras/sueldo-neto.html">(Calcular)</a></label>
            <div class="field-body control has-icon">
              <input v-validate="'required'" @blur="validate('sueldo')" name="sueldo" :class="{'is-danger': errors.first('sueldo') }" class="input" type="number" v-model.number="sueldo" placeholder="¿Cuánto cobras?">
              <span class="icon is-small is-left">
                <i class="fas fa-exclamation-triangle has-text-danger" v-if="errors.first('sueldo')"></i>
                <i class="fas fa-euro-sign" v-else></i>
              </span>
            </div>
          </div>
          <div class="field level">
            <label class="field-label has-text-grey is-size-6" for="dineroahorradosi">¿Quieres utilizar tus ahorros?</label>
            <div class="field-body control has-icons-left">
              <label class="switch">
                <input type="checkbox" class="is-checkradio" id="dineroahorrado" name="dineroahorrado" v-model="dineroahorradosi">
                <span class="slider round"></span>
              </label>
              <label for="movilidad" class="radio"><p v-if="dineroahorradosi === false">No</p> <p v-if="dineroahorradosi === true">Sí</p></label>
            </div>
          </div>
          <div class="field level animate slideInUp" v-if="dineroahorradosi === true ">
            <label class="field-label has-text-grey is-size-6" for="cuantodinero">¿Cuánto dinero tienes ahorrado?</label>
            <div class="field-body control has-icon">
              <input class="input" @blur="validate('cuanto')" name="cuanto" v-validate="'required'" :class="{'is-danger': errors.first('cuanto') }" type="number" v-model.number="cuantodinero" placeholder="750€">
              <span class="icon is-small is-left">
                <i class="fas fa-exclamation-triangle has-text-danger" v-if="errors.first('cuanto')"></i>
                <i class="fas fa-euro-sign" v-else></i>
              </span>
            </div>
          </div>
          <div class="field level">
            <label class="field-label has-text-grey is-size-6" for>*¿Qué gastos fijos mensuales tienes?</label>
            <div class="field-body control has-icon">
              <input class="input"  @blur="validate('gastos')" name="gastos" v-validate="'required'" :class="{'is-danger': errors.first('gastos') }" type="number" v-model.number="gasto" placeholder="200€">
              <span class="icon is-small is-left">
                 <i class="fas fa-exclamation-triangle has-text-danger" v-if="errors.first('gastos')"></i>
                <i class="fas fa-euro-sign" v-else></i>
              </span>
            </div>
          </div>
          <div class="field level">
            <label class="field-label has-text-grey is-size-6" for>*¿Cuánto dinero te gustaría ahorrar al mes?</label>
            <div class="field-body control has-icon">
              <input class="input" @blur="validate('ahorrar')" type="number" v-validate="'required'" name="ahorrar"  :class="{'is-danger': errors.first('ahorrar') }" v-model.number="ahorrar" placeholder="100€">
              <span class="icon is-small is-left">
                <i class="fas fa-exclamation-triangle has-text-danger" v-if="errors.first('ahorrar')"></i>
                <i class="fas fa-euro-sign" v-else></i>
              </span>
            </div>
          </div>
          <div class="field level">
            <label class="field-label has-text-grey is-size-6">*¿Con cuantas personas aparte de ti compartes piso? <i class="fas fa-question-circle" title="Sin incluirte"></i></label>
            <!-- <span class="is-tooltip-bottom is-tooltip-success tooltip" data-tooltip="Aquí datos sobre contratos laborales"><i class="fas fa-question-circle"></i></span> -->
            <div class="field-body control has-icon incluir">
              <input type="number" @blur="validate('inquilinos.numero_personas')" name="inquilinos.numero_personas" :class="{'is-danger': errors.first('inquilinos.numero_personas') }" class="input"  id="num_personas" v-model.number="inquilinos.numero_personas" v-validate="'required'" placeholder="Sin incluirte">
              <span class="icon is-small is-left">
                <i class="fas fa-exclamation-triangle has-text-danger" v-if="errors.first('inquilinos.numero_personas')"></i>
                <i class="fas fa-users" v-else></i>
              </span>
              <div class="control">
                <span class="button is-dark añadir"  :class="{'animated pulse is-success': inquilinos.numero_personas !== ''}" @click="nuevaPersona()">Añadir</span>
              </div>
            </div>
          </div>
          <div v-for="(persona, index) in inquilinos.personas" :key="index" class="column">
            <div class="message-header">
              <p>Persona {{ index +1 }}</p>
              <div class="bar-container">
                <div class="bar"></div>
              </div>
              <a @click="quitarPersona(index)" class="delete" aria-label="delete"></a>
            </div>
            <div class="field level animate slideInUp">
              <label class="field-label has-text-grey is-size-6" for="cuantodinero">¿Cuánto dinero pagará al mes?</label>
              <div class="field-body control has-icon">
                <input class="input" @blur="validate('compañeros')" name="compañeros" v-validate="'required'" :class="{'is-danger': errors.first('compañeros') }" type="number" v-model.number="persona.cuantodinero" placeholder="750€">
                <span class="icon is-small is-left">
                  <i class="fas fa-exclamation-triangle has-text-danger" v-if="errors.first('compañeros')"></i>
                  <i class="fas fa-euro-sign" v-else></i>
                </span>
              </div>
              <br>
            </div>
          </div>
          <div class="level" id="c2a">
            <div class="field-label has-text-grey is-size-6">
              <p class="help is-7 has-text-grey">* Campo requerido</p>
              <p class="help is-7 has-text-grey">Vozpópuli declina toda responsabilidad sobre el uso de los cálculos realizados.</p>
            </div>
            <div class="level-right">
              <div class="field-body control has-icon">
                <button class="button is-large is-success is-expanded is-fullwidth" @click="runData" type="submit" :disabled="errors.first('edad')||errors.first('brutoanual')">Calcular</button>
              <!-- <button class="button is-large is-success is-expanded is-fullwidth" :disabled=" this.fianza === '' " :class="{'animated pulse is-success': this.resultadogastoahorro !== ''}" @click="runData()">Calcular</button> -->
              </div>
            </div>
        </div>
          <!-- <pre>{{$data}}</pre>  -->
        </form>
        </div>
         <br>
      </div>
    </div>
    <div class="col-x30" >
       <div class="resultado" v-show="resultado" v-if="agencia === 'A' && !isNaN(this.fianza) && dineroagencia !== '' && this.resultadogastoahorro !== ''&& this.submitted == true">
            <div class="field" >
              <span class="titulo">El primer mes pagarías</span>
               <div >
                <label class="label field level" for>
                  <p class="grande">{{Math.round((this.pagoyo * this.totalpreciomes)/this.alquiler)}}€</p>
                </label>
              </div>
              <label class="label field level" for>
                <th>Detalles</th>
                </label>
                <hr>
              <label class="label field level" for>
                <p >El total del primer mes es de </p>
                <p class="num">{{this.fianza + this.alquiler + this.dineroagencia}}€</p>
              </label>
              <hr>
              <div  v-for="(persona, index) in inquilinos.personas" :key="index">
                <label class="label field level" for>
                  <p>* La persona {{ index +1 }} paga </p>
                  <p class="num">{{((persona.cuantodinero * totalpreciomes)/alquiler).toFixed(2)}}€</p>
                </label>
              </div>
              <hr>
              <div>
                <label style="text-align:left" class="label field level" for>
                  <p>Dinero disponible el primer mes</p>
                  <p class="num">{{(this.primermes).toFixed(2)}}€</p>
                  </label>
              <hr>
              </div>
              <div >
                <label class="label field level" for>
                  <p>Dinero disponible a partir el segundo mes</p>
                  <p class="num"> {{resultadogastoahorro}}</p></label>
              </div>
              <hr v-if="inquilinos.numero_personas > 0">
              <div>
                <label class="label field level" >
               <p class="reparticion"  v-if="inquilinos.numero_personas > 0">* En función a lo que paga cada uno de alquiler, el primer mes los gastos se repartirán</p>
                </label>
              </div>
            </div>
          </div>
          <div class="resultado" v-show="resultado" v-if="agencia === 'B' && !isNaN(this.fianza) && this.resultadogastoahorro !== '' && this.submitted == true" >
            <div class="field" >
              <span class="titulo">El primer mes pagarías</span>
              <div >
                <label class="label field level" for>
                  <p class="grande">{{Math.round((this.pagoyo * this.totalpreciomessinagencia)/this.alquiler)}}€</p>
                </label>
              </div>
               <label class="label field level" for>
                <th>Detalles</th>
                </label>
                <hr>
                <label class="label field level" for>
                <p>El total del primer mes es de</p><p>{{totalpreciomessinagencia}}€</p>
                </label>
                <hr>
                <div v-for="(persona, index) in inquilinos.personas" :key="index">
                <label class="label field level" for>
                  <p>* La persona  {{ index +1 }} paga</p>
                  <p class="num">{{((persona.cuantodinero * totalpreciomessinagencia)/alquiler).toFixed(2)}}€</p>
                </label>
              </div>
              <hr>
              <div>
                <label style="text-align:left" class="label field level" for>
                  <p>Dinero disponible el primer mes</p>
                  <p class="num">{{(this.primermessin).toFixed(2)}}€</p>
                </label>
              <hr>
              </div>
              <div>
                <label class="label field level" for>
                  <p>Dinero disponible a partir del segundo mes</p>
                  <p class="num">{{resultadogastoahorro}}</p></label>
              </div>
              <hr>
               <div>
                <label class="label field level" >
               <p class="reparticion"  v-if="inquilinos.numero_personas > 0">* En función a lo que paga cada uno de alquiler, el primer mes los gastos se repartirán</p>
                </label>
              </div>
            </div>
          </div>
      <div id="ad_521792040" class="ad-holder ad-320x200 ad-dfp" >
        <div id="bbt-ad-slot-Right1" class="ad bbt-adv-container"></div><!-- #Right1 -->
      </div><!-- .ad-holder -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      submitted: false,
      totalpreciomes: '',
      totalpreciomessinagencia: '',
      fianza: '',
      dineroagencia: '',
      sueldo: '',
      gasto: '',
      ahorrar: '',
      resultadogastoahorro: '',
      resultado: '',
      alquiler: '',
      agencia: 'B',
      primermes: '',
      primermessin: '',
      pagoyo: '',
      totaldecompañeros: 0,
      dineroahorradosi: false,
      cuantodinero: '',
      inquilinos: {
        numero_personas: 0,
        personas: ''
      },
      tipodealquiler: {
        A: 'Agencia',
        B: 'Particular'
      }
    }
  },
  methods: {
    validate (param) {
      console.log(param)
      this.runData()
      this.$validator.validate(param)
    },
    runData () {
      if (this.ahorrar !== '') {
        var total = 0
        Array.from(this.inquilinos.personas).forEach(function (record) {
          total += record.cuantodinero
        })
        this.totaldecompañeros = total
        this.pagoyo = this.alquiler - this.totaldecompañeros

        /* Calculo de sueldo  menos el precio de alquiler */
        var sue = this.sueldo - this.pagoyo

        /* Calculo de gasto fijo al mes mas el dinero ahorrado */
        var res = this.gasto + this.ahorrar

        /* Calculo del restante del sueldo menos la suma de gasto y ahorro al mes */
        var menos = sue - res

        this.restanteconahorros = this.resultadogastoahorro + this.cuantodinero
        this.totalpreciomes = this.fianza + this.alquiler + this.dineroagencia
        this.totalpreciomessinagencia = this.fianza + this.alquiler
        this.resultado = sue.toLocaleString('es') + '€'
        this.resultadogastoahorro = menos + '€'

        var sd = this.sueldo + this.cuantodinero
        var pt = sd - (this.gasto + this.ahorrar)
        this.primermes = pt - ((this.pagoyo * this.totalpreciomes) / this.alquiler).toFixed(2)
        this.primermessin = pt - ((this.pagoyo * this.totalpreciomessinagencia) / this.alquiler).toFixed(2)

        console.log(pt - ((this.pagoyo * this.totalpreciomes) / this.alquiler).toFixed(2))
        console.log(this.inquilinos.personas)
      }
    },
    handleSubmit (e) {
      this.$validator.validate().then(valid => {
        if (valid) {
          console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.user))
        }
      })
      if (this.inquilinos.numero_personas > 0) {
        if (this.totaldecompañeros > 0) {
          this.submitted = true
          this.$validator.validate().then(valid => {
            if (valid) {
              console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.user))
            }
          })
        }
      } else if (this.inquilinos.numero_personas !== '') {
        this.submitted = true
        this.$validator.validate().then(valid => {
          if (valid) {
            console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.user))
          }
        })
      }
      console.log(this.resultadogastoahorro)
    },
    nuevaPersona () {
      this.inquilinos.personas = []
      for (let index = 0; index < this.inquilinos.numero_personas; index++) {
        this.inquilinos.personas.push({
          dineroahorradosi: false,
          cuantodinero: '',
          ok: false
        })
      }
    },
    guardarPersona (index, cuantodinero) {
      this.inquilinos.personas[index].cuantodinero = cuantodinero
      this.inquilinos.personas[index].ok = true

      console.log(cuantodinero)
    },
    modificarPersona (index) {
      this.inquilinos.personas[index].ok = false
    },
    quitarPersona (index) {
      if (index > -1) {
        let edad = this.inquilinos.personas[index]
        if (edad > 25 && edad >= 3) {
          this.inquilinos.hijosmenores25anos++
        }
        if (edad > 3) {
          this.inquilinos.hijosmenores3anos++
        }

        this.inquilinos.personas.splice(index, 1)
      }
    }
  },
  computed: {
    result () {
      const { contrato } = this
      if (contrato === 'A') {
        return 'muy bien tienes un trabajo temporal'
      } else if (contrato === 'B') {
        return 'muy bien indefinido'
      } else if (contrato === 'C') {
        return 'muy bien autonomo'
      } else if (contrato === 'D') {
        return 'muy bien desempleado'
      } else if (contrato === 'E') {
        return 'muy bien pensionita'
      } else {
        return 'esto es raro'
      }
    },
    resultsuma () {
      const { sueldo, tota } = this
      if (sueldo > tota) {
        return 'puedes alquilarlo'
      } else {
        return 'no puedes alquilarlo'
      }
    }
  }
}
</script>
