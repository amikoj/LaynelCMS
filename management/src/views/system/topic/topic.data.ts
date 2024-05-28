import { getAllRoleList } from '/@/api/demo/system';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import dayjs from 'dayjs';

export const columns: BasicColumn[] = [
  {
    title: '专题名称',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    width: 220,
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
  },{

    title: '状态',
    dataIndex: 'status',
    width: 120,
    format:(text) => {
      return String(text) === '1'?'启用':'禁用'
    }
  }
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '专题名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '专题名称',
    component: 'Input',
    required: true,
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
