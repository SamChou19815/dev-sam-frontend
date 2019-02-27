import { Injectable } from '@angular/core';
import { Icon } from '../shared/icon';
import { NavDataList, NavGroup, NavItem } from './nav-data';

@Injectable({
  providedIn: 'root'
})
export class NavDataService {

  /**
   * The group for scheduler.
   * @type {NavGroup}
   */
  private readonly schedulerNavGroup: NavGroup = <NavGroup>{
    name: 'Scheduler', icon: Icon.ofMaterial('event_note'),
    children: [
      {
        name: 'Projects', icon: Icon.ofMaterial('event_available'),
        link: '/scheduler/projects'
      },
      {
        name: 'Events', icon: Icon.ofMaterial('event'), link: '/scheduler/events'
      },
      {
        name: 'Friends', icon: Icon.ofMaterial('group'), link: '/friends'
      },
      {
        name: 'Auto Scheduling', icon: Icon.ofMaterial('dashboard'), link: '/scheduler/auto'
      }
    ]
  };
  /**
   * The nav data list for display.
   * @type {NavDataList}
   */
  readonly navDataList: NavDataList = new NavDataList(<NavGroup[]>[this.schedulerNavGroup]);

  constructor() {}

}
