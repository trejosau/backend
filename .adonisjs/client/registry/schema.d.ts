/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.login': {
    methods: ["POST"]
    pattern: '/api/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/dashboard_auth').dashboardLoginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/dashboard_auth').dashboardLoginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['login']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['login']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.me': {
    methods: ["GET","HEAD"]
    pattern: '/api/auth/me'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['me']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['me']>>>
    }
  }
  'auth.logout': {
    methods: ["POST"]
    pattern: '/api/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['logout']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['logout']>>>
    }
  }
  'overview.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/overview'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/overview_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/overview_controller').default['index']>>>
    }
  }
  'accounts.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/accounts'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/accounts_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/accounts_controller').default['index']>>>
    }
  }
  'accounts.store': {
    methods: ["POST"]
    pattern: '/api/accounts'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/add_account').addAccountValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/add_account').addAccountValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/accounts_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/accounts_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'accounts.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/accounts/:slug'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/accounts_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/accounts_controller').default['show']>>>
    }
  }
  'accounts.sync': {
    methods: ["POST"]
    pattern: '/api/accounts/:slug/sync'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/accounts_controller').default['sync']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/accounts_controller').default['sync']>>>
    }
  }
  'accounts.destroy': {
    methods: ["DELETE"]
    pattern: '/api/accounts/:slug'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/accounts_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/accounts_controller').default['destroy']>>>
    }
  }
  'service_nodes.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/service-nodes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/service_nodes_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/service_nodes_controller').default['index']>>>
    }
  }
  'service_nodes.store': {
    methods: ["POST"]
    pattern: '/api/service-nodes'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/service_node').upsertServiceNodeValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/service_node').upsertServiceNodeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/service_nodes_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/service_nodes_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'service_nodes.bootstrap_railway': {
    methods: ["POST"]
    pattern: '/api/service-nodes/bootstrap-railway'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/service_node').bootstrapRailwayNodesValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/service_node').bootstrapRailwayNodesValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/service_nodes_controller').default['bootstrapRailway']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/service_nodes_controller').default['bootstrapRailway']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'projects.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/projects'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/projects_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/projects_controller').default['index']>>>
    }
  }
  'projects.receive': {
    methods: ["POST"]
    pattern: '/api/projects/:id/receive'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/projects_controller').default['receive']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/projects_controller').default['receive']>>>
    }
  }
  'checkins.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/checkins'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/checkins_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/checkins_controller').default['index']>>>
    }
  }
  'checkins.perform': {
    methods: ["POST"]
    pattern: '/api/accounts/:slug/checkin'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/checkins_controller').default['perform']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/checkins_controller').default['perform']>>>
    }
  }
  'notifications.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/notifications'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/notifications_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/notifications_controller').default['index']>>>
    }
  }
  'users.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/users'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['index']>>>
    }
  }
  'users.store': {
    methods: ["POST"]
    pattern: '/api/users'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/dashboard_user').createDashboardUserValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/dashboard_user').createDashboardUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'users.update_password': {
    methods: ["PATCH"]
    pattern: '/api/users/:id/password'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/dashboard_user').updateDashboardPasswordValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/dashboard_user').updateDashboardPasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['updatePassword']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['updatePassword']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'users.update_access': {
    methods: ["PATCH"]
    pattern: '/api/users/:id/access'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/dashboard_user').updateDashboardAccessValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/dashboard_user').updateDashboardAccessValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['updateAccess']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['updateAccess']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
}
