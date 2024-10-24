import React, { Component } from 'react';
import Router from 'next/router';

/**
 * 重定向组件
 * @param WrappedComponent 
 * @param redirectUrl 
 * @returns 
 */
const withRedirect = (WrappedComponent: React.FC, redirectUrl: string) => {
    return class extends Component {
        componentDidMount() {
            // 在组件挂载后执行重定向
            Router.push(redirectUrl);
        }
        render() {
            // 渲染原始组件
            return <WrappedComponent {...this.props} />;
        }
    };
};
export default withRedirect;