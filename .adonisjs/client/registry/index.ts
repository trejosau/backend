/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.login': {
    methods: ["POST"],
    pattern: '/api/auth/login',
    tokens: [{"old":"/api/auth/login","type":0,"val":"api","end":""},{"old":"/api/auth/login","type":0,"val":"auth","end":""},{"old":"/api/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'auth.me': {
    methods: ["GET","HEAD"],
    pattern: '/api/auth/me',
    tokens: [{"old":"/api/auth/me","type":0,"val":"api","end":""},{"old":"/api/auth/me","type":0,"val":"auth","end":""},{"old":"/api/auth/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['auth.me']['types'],
  },
  'auth.logout': {
    methods: ["POST"],
    pattern: '/api/auth/logout',
    tokens: [{"old":"/api/auth/logout","type":0,"val":"api","end":""},{"old":"/api/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.logout']['types'],
  },
  'overview.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/overview',
    tokens: [{"old":"/api/overview","type":0,"val":"api","end":""},{"old":"/api/overview","type":0,"val":"overview","end":""}],
    types: placeholder as Registry['overview.index']['types'],
  },
  'accounts.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/accounts',
    tokens: [{"old":"/api/accounts","type":0,"val":"api","end":""},{"old":"/api/accounts","type":0,"val":"accounts","end":""}],
    types: placeholder as Registry['accounts.index']['types'],
  },
  'accounts.store': {
    methods: ["POST"],
    pattern: '/api/accounts',
    tokens: [{"old":"/api/accounts","type":0,"val":"api","end":""},{"old":"/api/accounts","type":0,"val":"accounts","end":""}],
    types: placeholder as Registry['accounts.store']['types'],
  },
  'accounts.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/accounts/:slug',
    tokens: [{"old":"/api/accounts/:slug","type":0,"val":"api","end":""},{"old":"/api/accounts/:slug","type":0,"val":"accounts","end":""},{"old":"/api/accounts/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['accounts.show']['types'],
  },
  'accounts.sync': {
    methods: ["POST"],
    pattern: '/api/accounts/:slug/sync',
    tokens: [{"old":"/api/accounts/:slug/sync","type":0,"val":"api","end":""},{"old":"/api/accounts/:slug/sync","type":0,"val":"accounts","end":""},{"old":"/api/accounts/:slug/sync","type":1,"val":"slug","end":""},{"old":"/api/accounts/:slug/sync","type":0,"val":"sync","end":""}],
    types: placeholder as Registry['accounts.sync']['types'],
  },
  'accounts.destroy': {
    methods: ["DELETE"],
    pattern: '/api/accounts/:slug',
    tokens: [{"old":"/api/accounts/:slug","type":0,"val":"api","end":""},{"old":"/api/accounts/:slug","type":0,"val":"accounts","end":""},{"old":"/api/accounts/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['accounts.destroy']['types'],
  },
  'service_nodes.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/service-nodes',
    tokens: [{"old":"/api/service-nodes","type":0,"val":"api","end":""},{"old":"/api/service-nodes","type":0,"val":"service-nodes","end":""}],
    types: placeholder as Registry['service_nodes.index']['types'],
  },
  'service_nodes.store': {
    methods: ["POST"],
    pattern: '/api/service-nodes',
    tokens: [{"old":"/api/service-nodes","type":0,"val":"api","end":""},{"old":"/api/service-nodes","type":0,"val":"service-nodes","end":""}],
    types: placeholder as Registry['service_nodes.store']['types'],
  },
  'service_nodes.bootstrap_railway': {
    methods: ["POST"],
    pattern: '/api/service-nodes/bootstrap-railway',
    tokens: [{"old":"/api/service-nodes/bootstrap-railway","type":0,"val":"api","end":""},{"old":"/api/service-nodes/bootstrap-railway","type":0,"val":"service-nodes","end":""},{"old":"/api/service-nodes/bootstrap-railway","type":0,"val":"bootstrap-railway","end":""}],
    types: placeholder as Registry['service_nodes.bootstrap_railway']['types'],
  },
  'projects.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/projects',
    tokens: [{"old":"/api/projects","type":0,"val":"api","end":""},{"old":"/api/projects","type":0,"val":"projects","end":""}],
    types: placeholder as Registry['projects.index']['types'],
  },
  'projects.receive': {
    methods: ["POST"],
    pattern: '/api/projects/:id/receive',
    tokens: [{"old":"/api/projects/:id/receive","type":0,"val":"api","end":""},{"old":"/api/projects/:id/receive","type":0,"val":"projects","end":""},{"old":"/api/projects/:id/receive","type":1,"val":"id","end":""},{"old":"/api/projects/:id/receive","type":0,"val":"receive","end":""}],
    types: placeholder as Registry['projects.receive']['types'],
  },
  'checkins.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/checkins',
    tokens: [{"old":"/api/checkins","type":0,"val":"api","end":""},{"old":"/api/checkins","type":0,"val":"checkins","end":""}],
    types: placeholder as Registry['checkins.index']['types'],
  },
  'checkins.perform': {
    methods: ["POST"],
    pattern: '/api/accounts/:slug/checkin',
    tokens: [{"old":"/api/accounts/:slug/checkin","type":0,"val":"api","end":""},{"old":"/api/accounts/:slug/checkin","type":0,"val":"accounts","end":""},{"old":"/api/accounts/:slug/checkin","type":1,"val":"slug","end":""},{"old":"/api/accounts/:slug/checkin","type":0,"val":"checkin","end":""}],
    types: placeholder as Registry['checkins.perform']['types'],
  },
  'notifications.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/notifications',
    tokens: [{"old":"/api/notifications","type":0,"val":"api","end":""},{"old":"/api/notifications","type":0,"val":"notifications","end":""}],
    types: placeholder as Registry['notifications.index']['types'],
  },
  'users.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/users',
    tokens: [{"old":"/api/users","type":0,"val":"api","end":""},{"old":"/api/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['users.index']['types'],
  },
  'users.store': {
    methods: ["POST"],
    pattern: '/api/users',
    tokens: [{"old":"/api/users","type":0,"val":"api","end":""},{"old":"/api/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['users.store']['types'],
  },
  'users.update_password': {
    methods: ["PATCH"],
    pattern: '/api/users/:id/password',
    tokens: [{"old":"/api/users/:id/password","type":0,"val":"api","end":""},{"old":"/api/users/:id/password","type":0,"val":"users","end":""},{"old":"/api/users/:id/password","type":1,"val":"id","end":""},{"old":"/api/users/:id/password","type":0,"val":"password","end":""}],
    types: placeholder as Registry['users.update_password']['types'],
  },
  'users.update_access': {
    methods: ["PATCH"],
    pattern: '/api/users/:id/access',
    tokens: [{"old":"/api/users/:id/access","type":0,"val":"api","end":""},{"old":"/api/users/:id/access","type":0,"val":"users","end":""},{"old":"/api/users/:id/access","type":1,"val":"id","end":""},{"old":"/api/users/:id/access","type":0,"val":"access","end":""}],
    types: placeholder as Registry['users.update_access']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
