import { Component, OnInit } from '@angular/core';
import {
  ProjectCardData,
  samlangCardData,
  schedulerCardData,
  tenCardData
} from '../../shared/project-card-data';

@Component({
  selector: 'app-home-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.scss']
})
export class ProjectsSectionComponent implements OnInit {

  /**
   * A list of projects to display.
   * @type {ProjectCardData[]}
   */
  readonly projects: ProjectCardData[] = [schedulerCardData, samlangCardData, tenCardData];

  constructor() { }

  ngOnInit() {
  }

}
