import * as AP from '@activity-kit/types';
import GenericForm from './GenericForm';

export default class FollowForm extends GenericForm {
  private hiddenFollowerElement: HTMLInputElement;
  private hiddenFolloweeElement: HTMLInputElement;
  private hiddenFollowersElement: HTMLInputElement;

  private boundSubmitHandler: (event: SubmitEvent) => void =
    this.handleSubmit.bind(this);

  constructor() {
    super();

    if (!this.formActionUrl) {
      throw new Error('Could not find form action.');
    }

    const hiddenFollowerElement = this.inputElements.find((inputElement) =>
      inputElement.matches('[name="follower"]'),
    );

    const hiddenFolloweeElement = this.inputElements.find((inputElement) =>
      inputElement.matches('[name="followee"]'),
    );

    const hiddenFollowersElement = this.inputElements.find((inputElement) =>
      inputElement.matches('[name="followers"]'),
    );

    if (
      !hiddenFolloweeElement ||
      !hiddenFollowerElement ||
      !hiddenFollowersElement
    ) {
      throw new Error('Could not find required elements.');
    }

    this.hiddenFolloweeElement = hiddenFolloweeElement;
    this.hiddenFollowerElement = hiddenFollowerElement;
    this.hiddenFollowersElement = hiddenFollowersElement;

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    super.initializeEventListeners();
    this.formElement.addEventListener('submit', this.boundSubmitHandler);
  }

  private handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (!this.formElement.checkValidity()) {
      return;
    }

    const { value: follower } = this.hiddenFollowerElement;
    const { value: followee } = this.hiddenFolloweeElement;
    const { value: followers } = this.hiddenFollowersElement;

    window
      .fetch(this.formActionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/activity+json',
        },
        body: JSON.stringify({
          '@context': 'https://www.w3.org/ns/activitystreams',
          type: AP.ActivityTypes.FOLLOW,
          actor: follower,
          object: followee,
          to: [followee],
          cc: [followers],
        }),
      })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error(error);
        // this.usernameElement.setCustomValidity('Password incorrect.');
      });
  }
}

customElements.define('tl-follow-form', FollowForm);
