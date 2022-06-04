import { createRouter, createWebHistory } from 'vue-router'

import WelcomePage from '../views/WelcomePage.vue'
import ProjectsPage from '../views/ProjectsPage.vue'
import PersonsPage from '../views/PersonsPage.vue'
import ProjectDetailPage from '../views/ProjectDetailPage.vue'
import PersonDetailPage from '../views/PersonDetailPage.vue'
import ProjectFormPage from '../views/ProjectFormPage.vue'
import PersonFormPage from '../views/PersonFormPage.vue'


const routes = [

  { path: '/', name: 'home', component: WelcomePage },
  { path: '/projects', name: 'projects', component: ProjectsPage },
  { path: '/persons', name: 'persons', component: PersonsPage },
  { path: '/projects/:id', name: 'projectDetail', component: ProjectDetailPage },
  { path: '/persons/:id', name: 'personDetail', component: PersonDetailPage },

  { path: '/projectform/:id', name: 'projectFormEdit', component: ProjectFormPage },
  { path: '/projectform', name: 'projectFormAdd', component: ProjectFormPage },

  { path: '/personform/:id', name: 'personFormEdit', component: PersonFormPage },
  { path: '/personform', name: 'personFormAdd', component: PersonFormPage }

  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
