import Container from "./Container";
import Heading from "./Heading";
import { ref } from '../helpers';

export default function Countdown(onFinish) {
  let label;
  const container = Container([
    ref(Heading('3'), ref => label = ref)
  ]);

  setTimeout(() => {
    label.innerText = '2';
    setTimeout(() => {
      label.innerText = '1';
      setTimeout(() => {
        container.parentNode.removeChild(container);
        onFinish();
      }, 1000);
    }, 1000);
  }, 1000);

  return container;
}
