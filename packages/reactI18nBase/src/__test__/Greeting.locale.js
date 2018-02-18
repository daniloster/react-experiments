import { decorate } from '../localization';

export default {
  en: {
    greeting: decorate('Hi <1>{0}</1>!'),
    message: decorate('You are so <0>Awesome</0>!'),
  },
  pt: {
    greeting: decorate('Oi <1>{0}</1>!'),
    message: decorate('Você é tão <0>Fantástico(a)</0>!'),
  },
};
