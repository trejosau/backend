/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    login: typeof routes['auth.login']
    me: typeof routes['auth.me']
    logout: typeof routes['auth.logout']
  }
  overview: {
    index: typeof routes['overview.index']
  }
  accounts: {
    index: typeof routes['accounts.index']
    store: typeof routes['accounts.store']
    show: typeof routes['accounts.show']
    sync: typeof routes['accounts.sync']
    destroy: typeof routes['accounts.destroy']
  }
  serviceNodes: {
    index: typeof routes['service_nodes.index']
    store: typeof routes['service_nodes.store']
    bootstrapRailway: typeof routes['service_nodes.bootstrap_railway']
  }
  projects: {
    index: typeof routes['projects.index']
    receive: typeof routes['projects.receive']
  }
  checkins: {
    index: typeof routes['checkins.index']
    perform: typeof routes['checkins.perform']
  }
  notifications: {
    index: typeof routes['notifications.index']
  }
  users: {
    index: typeof routes['users.index']
    store: typeof routes['users.store']
    updatePassword: typeof routes['users.update_password']
    updateAccess: typeof routes['users.update_access']
  }
}
