

/**
 * 自定义组件安装方法
 * @param component  自定义组件
 * @param alias      组件别名
 * @returns        自定义组件
 */
export const withInstall = (component: any, alias: string = component.name ?? 'anonymous') => {
  if (component.install) {
    console.warn(`${alias} has already installed.`);
    return component as any;
  }
  component.install = (app: any) => {
    app.component(alias, component);
  };
  return component as any;
};