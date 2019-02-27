/**
 * [ProjectCardExternalResource] defines the format of an external resource.
 */
export interface ProjectCardExternalResource {
  /**
   * Prompt to display.
   */
  readonly prompt: string;
  /**
   * Link of the resource.
   */
  readonly link: string;
}

/**
 * [ProjectCardData] defines all the necessary data to display a project in card.
 */
export interface ProjectCardData {
  /**
   * Required name of the project.
   */
  readonly name: string;
  /**
   * Required square logo link of the project.
   */
  readonly logo: string;
  /**
   * Required introduction to the project.
   */
  readonly intro: string;
  /**
   * The optional router link.
   */
  readonly routerLink?: string;
  /**
   * The optional external resource object.
   */
  readonly externalResource?: ProjectCardExternalResource;
}

/**
 * Card data for scheduler.
 * @type {ProjectCardData}
 */
export const schedulerCardData = <ProjectCardData>{
  name: 'Scheduler', logo: '/assets/app-icons/scheduler.png', routerLink: '/scheduler',
  intro: 'Manager and auto-scheduler for your projects and events.'
};

/**
 * Card data for SAMLANG.
 * @type {ProjectCardData}
 */
export const samlangCardData = <ProjectCardData>{
  name: 'SAMLANG', logo: 'https://samlang.developersam.com/img/samlang.svg',
  externalResource: { prompt: 'Official Site', link: 'https://samlang.developersam.com' },
  intro: 'Statically-typed functional programming language with full type inference.'
};

/**
 * Card data for TEN.
 * @type {ProjectCardData}
 */
export const tenCardData = <ProjectCardData>{
  name: 'TEN', logo: '/assets/app-icons/ten.png',
  externalResource: { prompt: 'External Link', link: 'https://ten.developersam.com' },
  intro: 'Interesting game with simple rules. Powered by an MCTS AI.'
};
