import createAccountReduxSection from './createAccountReduxSection';

const {
  mapDispatchToProps,
  reducers,
} = createAccountReduxSection('auth');

export { mapDispatchToProps };
export { reducers };

export default reducers;
