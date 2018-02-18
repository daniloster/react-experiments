import { decorate } from '../localization';

export default {
  en: {
    title: 'Creating label',
    description: 'Description',
    color: 'Color',
    errorMessage: decorate('<0>Error</0> : label has not been created successfully.'),
    successMessage: decorate('[INFO] <0>Success</0> : label has been created successfully!'),
    button: 'Save',
  },
  pt: {
    title: 'Criando label',
    description: 'Descrição',
    color: 'Cor',
    errorMessage: decorate('<0>Erro</0> : label <1>não</1> foi criado com <1>sucesso</1>.'),
    successMessage: decorate('[INFO] <0>Sucesso</0> : label foi criado com <1>sucesso</1>!'),
    button: 'Gravar',
  },
};
