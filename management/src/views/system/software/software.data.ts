import { getAllRoleList } from '/@/api/demo/system';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import dayjs from 'dayjs';

export const columns: BasicColumn[] = [
  {
    title: '程序名',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '程序编码',
    dataIndex: 'code',
    width: 120,
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 80,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 180,
    format(text) {
      return dayjs(text).format('YYYY-MM-DD HH:mm');
    },
  },
  {
    title: '角色',
    dataIndex: 'roles',
    width: 200,
    format(_text, record) {
      return record.roles.map((role: any) => role.name).join(',');
    },
  },
  {
    title: '归属平台',
    dataIndex: 'platforms',
    format(_text, record) {
      return record.platforms?.map((platform: any) => platform.name).join(',');
    },
    width: 200,
  },{

    title: '状态',
    dataIndex: 'status',
    width: 120,
    format:(text) => {
      return String(text) === '1'?'启用':'禁用'
    }
  },{
    title: '备注',
    dataIndex: 'desc',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '程序名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'code',
    label: '程序编码',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '用户名',
    component: 'Input',
    required: true,
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    required: true,
    ifShow: false,
  },
  {
    label: '角色',
    field: 'roles',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      labelField: 'name',
      valueField: 'id',
      mode: 'multiple',
      labelInValue: true,
    },
    required: true,
  },
  {
    field: 'nick',
    label: '昵称',
    component: 'Input',
    required: true,
  },

  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    required: true,
  },

  {
    label: '备注',
    field: 'desc',
    component: 'InputTextArea',
  },
];
