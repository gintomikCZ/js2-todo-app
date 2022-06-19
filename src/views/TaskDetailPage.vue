<template>
  <h1>task detail</h1>

  <t-loading v-if="loading" />
  <template v-else>

    <t-modal :show="showDeleteModal" @close-me="showDeleteModal = false">
      <p>
        <span>Do you really want to delete task </span>
        <span class="text-bold">{{ task.task}}</span>
        <span> ?</span>
      </p>
      <t-button label="no, cancel" @clicked="showDeleteModal = false" class="mr-1" />
      <t-button label="yes, delete" @clicked="deleteTask" />
    </t-modal>


    <t-modal :show="showAddPersonModal" @close-me="showAddPersonModal = false">
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
    <t-button v-if="!persons.length" label="delete task" @clicked="showDeleteModal = true" />

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

  export default {
    name: 'TaskDetailPage',
    data () {
      return {
        loading: true,
        task: {},
        persons: [], // taháno z tabulky personstasks { id: 99, personid: 2, taskid: 12 ..........}
        showAddPersonModal: false,
        allPersons: [], // taháno z tabulky persons { id: 2, first: 'Alča', last: 'Nováková' .....}
        showDeleteModal: false
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
      deleteTask () {
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