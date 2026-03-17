import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const OverviewController = () => import('#controllers/overview_controller')
const AccountsController = () => import('#controllers/accounts_controller')
const ServiceNodesController = () => import('#controllers/service_nodes_controller')
const ProjectsController = () => import('#controllers/projects_controller')
const CheckinsController = () => import('#controllers/checkins_controller')
const NotificationsController = () => import('#controllers/notifications_controller')
const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')

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
    router.post('/auth/login', [AuthController, 'login'])
    router.get('/auth/me', [AuthController, 'me'])
    router.post('/auth/logout', [AuthController, 'logout']).use(middleware.dashboardAuth())
  })
  .prefix('/api')

router
  .group(() => {
    router.get('/overview', [OverviewController, 'index'])

    router.get('/accounts', [AccountsController, 'index'])
    router.post('/accounts', [AccountsController, 'store']).use(middleware.dashboardAdmin())
    router.get('/accounts/:slug', [AccountsController, 'show'])
    router.post('/accounts/:slug/sync', [AccountsController, 'sync'])
    router.delete('/accounts/:slug', [AccountsController, 'destroy']).use(middleware.dashboardAdmin())

    router.get('/service-nodes', [ServiceNodesController, 'index'])
    router.post('/service-nodes', [ServiceNodesController, 'store']).use(middleware.dashboardAdmin())
    router
      .post('/service-nodes/bootstrap-railway', [ServiceNodesController, 'bootstrapRailway'])
      .use(middleware.dashboardAdmin())

    router.get('/projects', [ProjectsController, 'index'])
    router.post('/projects/:id/receive', [ProjectsController, 'receive'])

    router.get('/checkins', [CheckinsController, 'index'])
    router.post('/accounts/:slug/checkin', [CheckinsController, 'perform'])

    router.get('/notifications', [NotificationsController, 'index'])
    router.get('/users', [UsersController, 'index']).use(middleware.dashboardAdmin())
    router.post('/users', [UsersController, 'store']).use(middleware.dashboardAdmin())
    router.patch('/users/:id/password', [UsersController, 'updatePassword']).use(middleware.dashboardAdmin())
    router.patch('/users/:id/access', [UsersController, 'updateAccess']).use(middleware.dashboardAdmin())
  })
  .use(middleware.dashboardAuth())
  .prefix('/api')
