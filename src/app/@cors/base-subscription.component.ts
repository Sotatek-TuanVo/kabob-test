import { OnDestroy, Directive } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

/**
 * @description
 * The base class of all screen component of the project
 */
@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class AbstractSubscriptionComponent implements OnDestroy {
  /** the rxjs subcriptions */
  private subscriptions: Subscription[] = [];

  rxSubscribe(
    observable: Observable<any>,
    next?: (value: any) => void,
    error?: (error: any) => void,
    complete?: () => void
  ): Subscription {
    const subscription: Subscription = observable.subscribe(
      next,
      error,
      complete
    );
    this.subscriptions.push(subscription);

    return subscription;
  }

  rxUnsubscribe(subscription: Subscription): void {
    this.subscriptions = this.subscriptions.filter(
      (sub) => sub !== subscription
    );
    subscription.unsubscribe();
  }

  rxUnsubscribeAll(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  /**
   * on destroy view
   */
  ngOnDestroy(): void {
    this.rxUnsubscribeAll();
  }
}
