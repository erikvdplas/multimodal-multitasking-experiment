import Container from 'components/Container';
import GridTest from 'components/GridTest';
import VisualVowel from 'components/VisualVowel';
import AuditiveVowel from "./components/AuditiveVowel";
import Heading from 'components/Heading';
import Paragraph from "./components/Paragraph";
import Link from 'components/Link';
import { styled, ref } from 'helpers';
import 'main.css';
import fileDownload from 'js-file-download';
import Countdown from "./components/Countdown";

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
    const secondaryRequiredAnswers = [];
    const secondaryOmittedAnswers = [];

    let finishedExperiment = false;

    const main = () => {
        let secondaryComponents = [];

        const startExperiments = () => {
            mainExperiment.start();
            secondaryExperiment.start();
        };

        if (type === 'B') {
            secondaryComponents = [
                styled(Heading('Experiment 2a'), {marginBottom: '50px', marginTop: '100px'}),
                ref(VisualVowel(), exp => secondaryExperiment = exp)
            ]
        } else if (type === 'C') {
            secondaryComponents = [
                styled(Heading('Experiment 2b'), {marginBottom: '50px', marginTop: '100px'}),
                ref(AuditiveVowel(), exp => secondaryExperiment = exp)
            ]
        }

        Container([
            styled(Heading('Experiment 1'), {marginBottom: '50px'}),
            ref(GridTest(), exp => mainExperiment = exp),
            ...secondaryComponents,
            Countdown(startExperiments)
        ], document.body).classList = ['main'];
    };

    document.addEventListener('keydown', event => {
        event.preventDefault();

        if (mainAnswers.length === 50) {
            if (!finishedExperiment) {
                finishedExperiment = true;

                if (secondaryExperiment) {
                    secondaryExperiment.paused = true;
                }

                let csv = '';
                csv += mainAnswers.length + ', ' + mainAnswers.filter(a => a).length + '\n';
                csv += secondaryRequiredAnswers.length + ', ' + secondaryRequiredAnswers.filter(a => a).length + '\n';
                csv += secondaryOmittedAnswers.length + ', ' + secondaryOmittedAnswers.filter(a => a).length + '\n';
                csv += Math.round((new Date()).getTime() - start.getTime()).toString() + ', ' + type;

                fileDownload(csv, 'result.csv');

                setTimeout(() => {
                    document.location = document.location.pathname;
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

    secondaryExperiment.onCompletion = (required, result) => {
        if (required) {
            secondaryRequiredAnswers.push(result);
        } else {
            secondaryOmittedAnswers.push(result);
        }
    };
} else {
    Container([
        Heading('Choose experiment'),
        Link(document.location + '?type=A', 'Experiment A'),
        Link(document.location + '?type=B', 'Experiment B'),
        Link(document.location + '?type=C', 'Experiment C'),
        styled(Heading('Instructies', 2), { marginTop: '100px' }),
        Paragraph('Druk op de linkerpijltoets als de blokfiguren geroteerd overeenkomen.'),
        Paragraph('Druk op de rechterpijltoets als dat niet zo is.'),
        Paragraph('Druk op de spatiebalk als je een "A" ziet of hoort')
    ], document.body).classList = ['main']
}
