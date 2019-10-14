import Container from 'components/Container';
import GridTest from 'components/GridTest';
import VisualVowel from 'components/VisualVowel';
import Heading from 'components/Heading';
import Link from 'components/Link';
import { styled, ref } from 'helpers';
import 'main.css';
import fileDownload from 'js-file-download';

const parameters = (() => {
    const url = location.search;
    const query = url.substr(1);
    const result = {};

    query.split("&").forEach(part => {
        const item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    });

    return result;
})();

const { type } = parameters;

if (type) {
    const start = new Date();

    let mainExperiment;
    const mainAnswers = [];

    let secondaryExperiment;
    const secondaryAnswers = [];

    let finishedExperiment = false;

    const main = () => {
        let secondaryComponents = [];

        if (type === 'B') {
            secondaryComponents = [
                styled(Heading('Experiment 2a'), {marginBottom: '50px', marginTop: '100px'}),
                ref(VisualVowel(), exp => secondaryExperiment = exp)
            ]
        } else if (type === 'C') {

        }

        Container([
            styled(Heading('Experiment 1'), {marginBottom: '50px'}),
            ref(GridTest(), exp => mainExperiment = exp),
            ...secondaryComponents
        ], document.body).classList = ['main']
    };

    document.addEventListener('keydown', event => {
        event.preventDefault();

        if (mainAnswers.length === 10) {
            if (!finishedExperiment) {
                finishedExperiment = true;

                if (secondaryExperiment) {
                    secondaryExperiment.paused = true;
                }

                let csv = '';
                csv += mainAnswers.length + ', ' + mainAnswers.filter(a => a).length + '\n';
                csv += secondaryAnswers.length + ', ' + secondaryAnswers.filter(a => a).length + '\n';
                csv += ((new Date()).getTime() - start.getTime()).toString() + ', ' + type;

                fileDownload(csv, 'result.csv');

                setTimeout(() => {
                    document.location = '/'
                }, 200);
            }
        } else {
            switch (event.key) {
                case "ArrowLeft":
                    mainAnswers.push(mainExperiment.isMatch);
                    mainExperiment.refresh();
                    break;
                case "ArrowRight":
                    mainAnswers.push(!mainExperiment.isMatch);
                    mainExperiment.refresh();
                    break;
                case " ":
                    secondaryExperiment.responded = true;
                    break;
            }
        }
    });

    main();

    secondaryExperiment.onCompletion = (result) => {
        secondaryAnswers.push(result);
    };
} else {
    Container([
        Heading('Choose experiment'),
        Link(document.location + '?type=A', 'Experiment A'),
        Link(document.location + '?type=B', 'Experiment B'),
        Link(document.location + '?type=C', 'Experiment C')
    ], document.body).classList = ['main']
}
