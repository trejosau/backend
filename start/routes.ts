import router from '@adonisjs/core/services/router'

const OverviewController = () => import('#controllers/overview_controller')
const AccountsController = () => import('#controllers/accounts_controller')
const ServiceNodesController = () => import('#controllers/service_nodes_controller')
const ProjectsController = () => import('#controllers/projects_controller')
const CheckinsController = () => import('#controllers/checkins_controller')
const NotificationsController = () => import('#controllers/notifications_controller')

router.get('/', async () => {
  return {
    service: 'backend',
    status: 'ok',
    message: 'Orquestador HMC listo',
  }
})

router.get('/health', async () => {
  return {
    service: 'backend',
    status: 'ok',
  }
})

router
  .group(() => {
    router.get('/overview', [OverviewController, 'index'])

    router.get('/accounts', [AccountsController, 'index'])
    router.post('/accounts', [AccountsController, 'store'])
    router.get('/accounts/:slug', [AccountsController, 'show'])
    router.delete('/accounts/:slug', [AccountsController, 'destroy'])

    router.get('/service-nodes', [ServiceNodesController, 'index'])
    router.post('/service-nodes', [ServiceNodesController, 'store'])
    router.post('/service-nodes/bootstrap-railway', [ServiceNodesController, 'bootstrapRailway'])

    router.get('/projects', [ProjectsController, 'index'])
    router.post('/projects/:id/receive', [ProjectsController, 'receive'])

    router.get('/checkins', [CheckinsController, 'index'])
    router.post('/accounts/:slug/checkin', [CheckinsController, 'perform'])

    router.get('/notifications', [NotificationsController, 'index'])
  })
  .prefix('/api')
