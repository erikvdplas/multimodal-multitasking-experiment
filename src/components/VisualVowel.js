import Container from "./Container";
import Heading from "./Heading";
import { styled, ref, OBSERVABLE_TIME, REST_TIME } from '../helpers';
import _ from 'lodash';

const VOWEL_OPTIONS = ['A', 'E', 'I', 'O'];
const RESPONSE_VOWEL = VOWEL_OPTIONS[0];

export default function VisualVowel() {
  let label;

  const container = Container([
    ref(styled(Heading(_.sample(VOWEL_OPTIONS)), { fontSize: '5em' }), ref => label = ref)
  ]);

  container.classList = ['vowel-container'];

  container.refresh = () => {
    container.responded = false;
    const vowel = _.sample(VOWEL_OPTIONS);
    label.innerText = vowel;

    setTimeout(() => {
      label.innerText = '';

      setTimeout(() => {
        if (!container.paused) {
          const responseNeeded = vowel === RESPONSE_VOWEL;
          container.onCompletion((container.responded && responseNeeded) || (!container.responded && !responseNeeded));
          container.refresh();
        }
      }, REST_TIME);
    }, OBSERVABLE_TIME);
  };

  container.refresh();

  return container;
}
