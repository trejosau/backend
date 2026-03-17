import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'overview.index': { paramsTuple?: []; params?: {} }
    'accounts.index': { paramsTuple?: []; params?: {} }
    'accounts.store': { paramsTuple?: []; params?: {} }
    'accounts.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'accounts.sync': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'accounts.destroy': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'service_nodes.index': { paramsTuple?: []; params?: {} }
    'service_nodes.store': { paramsTuple?: []; params?: {} }
    'service_nodes.bootstrap_railway': { paramsTuple?: []; params?: {} }
    'projects.index': { paramsTuple?: []; params?: {} }
    'projects.receive': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'checkins.index': { paramsTuple?: []; params?: {} }
    'checkins.perform': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'notifications.index': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.store': { paramsTuple?: []; params?: {} }
    'users.update_password': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.update_access': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'auth.me': { paramsTuple?: []; params?: {} }
    'overview.index': { paramsTuple?: []; params?: {} }
    'accounts.index': { paramsTuple?: []; params?: {} }
    'accounts.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'service_nodes.index': { paramsTuple?: []; params?: {} }
    'projects.index': { paramsTuple?: []; params?: {} }
    'checkins.index': { paramsTuple?: []; params?: {} }
    'notifications.index': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'auth.me': { paramsTuple?: []; params?: {} }
    'overview.index': { paramsTuple?: []; params?: {} }
    'accounts.index': { paramsTuple?: []; params?: {} }
    'accounts.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'service_nodes.index': { paramsTuple?: []; params?: {} }
    'projects.index': { paramsTuple?: []; params?: {} }
    'checkins.index': { paramsTuple?: []; params?: {} }
    'notifications.index': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'accounts.store': { paramsTuple?: []; params?: {} }
    'accounts.sync': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'service_nodes.store': { paramsTuple?: []; params?: {} }
    'service_nodes.bootstrap_railway': { paramsTuple?: []; params?: {} }
    'projects.receive': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'checkins.perform': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'users.store': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'accounts.destroy': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
  }
  PATCH: {
    'users.update_password': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.update_access': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}