import {
  AccountParams,
  DeptListItem,
  MenuParams,
  RoleParams,
  RolePageParams,
  MenuListGetResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  AccountList = '/user/page',
  IsAccountExist = '/system/accountExist',
  DeptList = '/system/getDeptList',
  setRoleStatus = '/system/setRoleStatus',
  MenuList = '/menu/page',
  RolePageList = '/role/page',
  GetAllRoleList = '/role/list',
  addAccount = '/user',
  menu = '/menu'
}

export const getAccountList = (params: AccountParams) =>
  defHttp.post<AccountListGetResultModel>({ url: Api.AccountList, params });

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.post<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

export const isAccountExist = (account: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });

export const addAccount = (model: any) => defHttp.put({ url: Api.addAccount, data: model });

export const updateAccount = (model: any) => defHttp.post({ url: Api.addAccount, data: model });

export const delAccount = (id: any) => defHttp.delete({ url: Api.addAccount, data: { id } });


export const addMenu = (model: any) => defHttp.put({ url: Api.menu, data: model });


export const updateMenu = (model: any) => defHttp.post({ url: Api.menu, data: model });

export const delMenu = (id: any) => defHttp.delete({ url: Api.menu, data: { id } });
