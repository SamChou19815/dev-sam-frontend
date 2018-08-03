import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import * as firebase from 'firebase/app';
import { ignore } from './util';

@Injectable({
  providedIn: 'root'
})
export class GoogleUserService {

  constructor(private angularFireAuth: AngularFireAuth) {
  }

  /**
   * Returns the promise of a user from Firebase.
   *
   * @return {Promise<User | null>>} the promise of a user from Firebase.
   */
  private userPromise(): Promise<User | null> {
    return new Promise((resolve, reject) =>
      this.angularFireAuth.auth.onAuthStateChanged(resolve, reject)
    );
  }

  /**
   * Returns the promise of whether the user is logged in.
   *
   * @return {Promise<boolean>} the promise of whether the user is logged in.
   */
  isSignedInPromise(): Promise<boolean> {
    return this.userPromise().then(u => u != null);
  }

  /**
   * Let the user sign in.
   */
  signIn(): void {
    this.angularFireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()).then(ignore);
  }

  /**
   * Returns the promise of user's token that is guaranteed to resolve.
   *
   * @return {Promise<string>} the promise of user's token that is guaranteed to resolve.
   */
  async afterSignedIn(): Promise<string> {
    const userOpt = await this.userPromise();
    if (userOpt == null) {
      try {
        await this.angularFireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
      } catch (e) {
      }
      return this.afterSignedIn();
    }
    return userOpt.getIdToken(false);
  }

}
