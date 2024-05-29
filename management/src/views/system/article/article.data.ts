import { getAllRoleList } from '/@/api/demo/system';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import dayjs from 'dayjs';

export const columns: BasicColumn[] = [
  {
    title: '文章名',
    dataIndex: 'title',
    width: 120,
  },
  {
    title: '作者',
    dataIndex: 'author',
    width: 120,
  },
  {
    title: '文章分类',
    dataIndex: 'categories',
    width: 140,
  },
  {
    title: '标签',
    dataIndex: 'tags',
    width: 80,
  },
  {
    title: '最后更新时间',
    dataIndex: 'createdAt',
    width: 180,
    format(text) {
      return dayjs(text).format('YYYY-MM-DD HH:mm');
    },
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
