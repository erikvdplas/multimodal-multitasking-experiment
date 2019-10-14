import Container from "./Container";
import Heading from "./Heading";
import { styled, OBSERVABLE_TIME, REST_TIME } from '../helpers';
import _ from 'lodash';

const VOWEL_OPTIONS = ['A', 'E', 'I', 'O'];
const synth = window.speechSynthesis;

const RESPONSE_VOWEL = VOWEL_OPTIONS[0];

export default function AuditiveVowel() {
  const container = Container([
    styled(Heading('🔈'), { fontSize: '5em' })
  ]);

  container.classList = ['vowel-container'];

  container.refresh = () => {
    container.responded = false;
    const vowel = _.sample(VOWEL_OPTIONS);
    const utterance = new SpeechSynthesisUtterance(vowel.toLowerCase());
    utterance.lang = 'nl';
    utterance.rate = 0.5;
    synth.speak(utterance);

    setTimeout(() => {
      synth.cancel();

      setTimeout(() => {
        if (!container.paused) {
          const responseNeeded = vowel === RESPONSE_VOWEL;
          container.onCompletion(responseNeeded, (container.responded && responseNeeded) || (!container.responded && !responseNeeded));
          container.refresh();
        }
      }, REST_TIME);
    }, OBSERVABLE_TIME);
  };

  container.start = () => {
    container.refresh()
  };

  return container;
}
