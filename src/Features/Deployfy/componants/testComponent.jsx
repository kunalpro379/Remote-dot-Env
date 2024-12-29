import React from 'react';
import navItems from '../data/nav_items.json';
import ProjectComponent from './Projects/ProjectComponent';
import DomainComponent from './Domain/DomainComponent';
import UsageComponent from './Usage/UsageComponent';
import ActivityComponent from './Activity/Activity';
import SettingComponent from './Setting/SettingsComponent';
import LogsComponent from './Log/LogsComponent';
import BillingComponent from './Billing/BillingComponent';
import SupportComponent from './Support/SupportComponent';

const TestComponent = () => {
  return (
    <div>
      {navItems.nav_items.map((item) => {
        switch (item.id) {
          case 'Projects':
            return <ProjectsWrapperComponent key={item.id} id={item.id} />;
          case 'Domains':
            return <DomainsWrapperComponent key={item.id} id={item.id} />;
          case 'Usage':
            return <UsageWrapperComponent key={item.id} id={item.id} />;
          case 'Activity':
            return <ActivityWrapperComponent key={item.id} id={item.id} />;
          case 'Setting':
            return <SettingWrapperComponent key={item.id} id={item.id} />;
          case 'Logs':
            return <LogsWrapperComponent key={item.id} id={item.id} />;
          case 'Billing':
            return <BillingWrapperComponent key={item.id} id={item.id} />;
          case 'Support':
            return <SupportWrapperComponent key={item.id} id={item.id} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

const ProjectsWrapperComponent = ({ id }) => <div id={id}><ProjectComponent /></div>;
const DomainsWrapperComponent = ({ id }) => <div id={id}> <DomainComponent/></div>;
const UsageWrapperComponent = ({ id }) => <div id={id}><UsageComponent/></div>;
const ActivityWrapperComponent = ({ id }) => <div id={id}><ActivityComponent/></div>;
const SettingWrapperComponent = ({ id }) => <div id={id}><SettingComponent/></div>;
const LogsWrapperComponent = ({ id }) => <div id={id}><LogsComponent/></div>;
const BillingWrapperComponent = ({ id }) => <div id={id}><BillingComponent/></div>;
const SupportWrapperComponent = ({ id }) => <div id={id}><SupportComponent/></div>;

export default TestComponent;
