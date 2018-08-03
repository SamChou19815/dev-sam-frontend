import { Component, OnInit } from '@angular/core';
import { FriendsDataService } from '../../friends/friends-data.service';
import { GoogleUser } from '../../shared/google-user';
import { LoadingOverlayService } from '../../shared/overlay/loading-overlay.service';
import { shortDelay } from '../../shared/util';
import { SchedulerDataService } from '../scheduler-data.service';
import { SchedulerTaggedInterval } from '../scheduler-tagged-interval';
import { ProjectCardData, schedulerCardData } from '../../shared/project-card-data';
import { GoogleUserService } from '../../shared/google-user.service';

@Component({
  selector: 'app-scheduler-auto-scheduling',
  templateUrl: './auto-scheduling.component.html',
  styleUrls: ['./auto-scheduling.component.css']
})
export class AutoSchedulingComponent implements OnInit {

  /**
   * The intro for Scheduler.
   * @type {ProjectCardData}
   */
  readonly schedulerIntro: ProjectCardData = schedulerCardData;
  /**
   * Whether the user has logged in.
   * @type {boolean}
   */
  isUserLoggedIn = false;
  /**
   * The selected friend.
   */
  selectedFriend: GoogleUser | undefined;
  /**
   * A list of all tagged intervals for user and his friend.
   * @type {SchedulerTaggedInterval[]}
   */
  taggedIntervalsWithFriends: SchedulerTaggedInterval[] = [];

  constructor(private schedulerDataService: SchedulerDataService,
              private friendsDataService: FriendsDataService,
              private googleUserService: GoogleUserService,
              private loadingService: LoadingOverlayService) {
  }

  ngOnInit() {
    shortDelay(async () => {
      const ref = this.loadingService.open();
      this.isUserLoggedIn = await this.googleUserService.isSignedInPromise();
      if (!this.isUserLoggedIn) {
        ref.close();
        return;
      }
      await Promise.all([
        this.schedulerDataService.initializePersonalAutoSchedule(),
        this.friendsDataService.initializedFriendsApp()
      ]);
      ref.close();
    });
  }

  /**
   * Returns a list of personal auto schedule.
   *
   * @returns {SchedulerTaggedInterval[]} a list of personal auto schedule
   */
  get personalAutoSchedule(): SchedulerTaggedInterval[] {
    return this.schedulerDataService.personalAutoSchedule;
  }

  /**
   * Returns a list of friends to choose.
   *
   * @returns {GoogleUser[]} a list of friends to choose.
   */
  get friends(): GoogleUser[] {
    return this.friendsDataService.data.list;
  }

  /**
   * Do auto scheduling with selected friend. Must be called only when the friend selected is
   * active.
   */
  doAutoSchedulingWithFriend(): void {
    this.taggedIntervalsWithFriends = [];
    const ref = this.loadingService.open();
    const friend = this.selectedFriend;
    if (friend == null) {
      throw new Error();
    }
    this.schedulerDataService.asyncGetAutoScheduleWithFriend(friend).then(d => {
      this.taggedIntervalsWithFriends = d;
      ref.close();
    });
  }

  /**
   * Clear intervals with friends to start over.
   */
  clearIntervalsWithFriends(): void {
    this.taggedIntervalsWithFriends = [];
    this.selectedFriend = undefined;
  }

}
