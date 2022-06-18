<template>
  <h1>task detail</h1>

  <t-loading v-if="loading" />
  <template v-else>
    <t-modal :show="showAddPersonModal">
      <h4>select person</h4>
      <ul class="add-person-list">
        <li v-for="person in allPersonsFiltered" :key="person.id" @click="onAddPersonItemClick(person.id)">{{
        person.last + ' '
        + person.first }}
        </li>
      </ul>
      <t-button label="cancel" @clicked="showAddPersonModal = false" class="mt-1" />
    </t-modal>

    <t-button label="edit" class="mr-1" @clicked="onEditClicked" />
    <t-button v-if="task.status === 'started'" label="mark as done" @clicked="changeStatus('done')"
      :class="{'mr-1': !persons.length}" />
    <t-button v-else-if="task.status === 'done'" label="mark as started" @clicked="changeStatus('started')"
      :class="{'mr-1': !persons.length}" />
    <t-button v-if="!persons.length" label="delete task" @clicked="onDeleteClicked" />

    <ul class="detail-list">
      <li>
        <div>task name: </div>
        <div class="text-bold text-right">{{ task.task }}</div>
      </li>
      <li>
        <div>project name: </div>
        <div class="text-bold text-right">{{ task.project }}</div>
      </li>
      <li>
        <div>description</div>
        <div class="text-bold text-right">{{ task.description }}</div>
      </li>
      <li>
        <div>status: </div>
        <div class="text-bold text-right">{{ task.status }}</div>
      </li>
      <li>
        <div>priority: </div>
        <div class="text-bold text-right">{{ task.priority }}</div>
      </li>
      <li>
        <div>task date: </div>
        <div class="text-bold text-right">{{ dateToDisplay }}</div>
      </li>
    </ul>

    <t-button label="add person" @clicked="onAddPersonClicked" />

    <person-list v-if="persons.length" :persons=persons @delete-person-task="onDeletePersonTask" />
    <p v-else>There are no persons assigned to this task.</p>


  </template>
</template>

<script>
  import db from '../utils/db.js'
  import { formatDate } from '../utils/dateUtils.js'
  import TLoading from '../components/TLoading.vue'
  import TButton from '../components/TButton.vue'
  import PersonList from '../components/PersonList.vue'
  import TModal from '../components/TModal.vue'

  /* osoby přiřazené k úkolu ... persons: [
      { id: 15, personid: 2 (Alča), taskid: 12 ...},
      { id: 16, personid: 5 (Aleš), taskid: 12 ...}
  ]
  /*/

  /*
      personsIds     [2, 5]
  */

  /*
    všechny osoby ... allPersons: [
      { id: 2 (Alča) ....}
      { id: 5 (Aleš) ....}
      { id: 7 (Karel) ...}
    ]
  */

 /*
  allPersonsFiltered:
    takové objekty, jejichž vlastnost 'id' se nenachází v proměnné (poli) personsIds
 */


/*
  const ar = [5, 9, 15, 'ahoj']
  console.log(ar.indexOf(15)) // 2
  console.log(ar.indexOf('ahoj')) // 3
  console.log(ar.indexOf(10)) // -1

  poleVeKteremHledame.indexOf(prvekKteryHledame) //index prvku v poli nebo -1

  ověřit jestli je prvek v poli:
  pole.indexOf(prvek) > -1 //true pokud prvek v poli je, false pokud není

ověřit, že prvek není v poli
  pole.indexOf(prvek) < 0 // true pokud prvek v poli není , false pokud tam je


'ahoj'.indexOf['a'] // 0
*/



  export default {
    name: 'TaskDetailPage',
    data () {
      return {
        loading: true,
        task: {},
        persons: [], // taháno z tabulky personstasks { id: 99, personid: 2, taskid: 12 ..........}
        showAddPersonModal: false,
        allPersons: [] // taháno z tabulky persons { id: 2, first: 'Alča', last: 'Nováková' .....}
      }
    },
    created () {
      const prom1 = db.get('tasks/' + this.$route.params.id).then((record) => {
        this.task = record
      })
      Promise.all([prom1, this.fetchPersons()]).then(() => {
        this.loading = false
      })
    },
    computed: {
      dateToDisplay () {
        return formatDate(this.task.taskdate)
      },
      personsIds () {
        return this.persons.map(person => person.personid)
      },
      allPersonsFiltered () {
        return this.allPersons.filter(person => {
          return this.personsIds.indexOf(person.id) < 0
        })
      }
    },
    methods: {
      fetchPersons () {
        return db.get('personstasks?taskid=' + this.$route.params.id).then((data) => {
          this.persons = data
        })
      },
      onEditClicked () {
        this.$router.push('/taskformedit/' + this.$route.params.id)
      },
      changeStatus (par) {
        db.put('/tasks', {
          id: this.$route.params.id,
          status: par
        }).then(() => {
          this.$router.push('/projects/' + this.task.projectid)
        })
      },
      onDeleteClicked () {
        return db.delete('tasks', { id: this.$route.params.id }).then(() => {
          this.$router.push('/projects/' + this.task.projectid)
        })
      },
      onDeletePersonTask (id) {
        return db.delete('personstasks', { id }).then(() => {
          this.fetchPersons()
        })
      },
      onAddPersonClicked () {
        return db.get('persons').then((data) => {
          this.allPersons = data
          this.showAddPersonModal = true
        })
      },
      onAddPersonItemClick (personid) {
        return db.post('personstasks', { personid, taskid: this.$route.params.id }).then(() => {
          this.fetchPersons().then(() => {
            this.showAddPersonModal = false
          })
        })
      }
    },
  components: { TLoading, TButton, PersonList, TModal }
  }

</script>

<style lang="stylus" scoped>
@import '../styles/variables.styl'
.add-person-list
  list-style-type: none
  margin: 0
  padding: 0
  border: 1px solid $border
  & li
    padding: .5rem .75rem
    text-align: left
    cursor: pointer
    border-bottom: 1px solid $border-light
    transition: background .4s ease
    &:hover
      background: $highlight

h4
  margin-top: 0
</style>