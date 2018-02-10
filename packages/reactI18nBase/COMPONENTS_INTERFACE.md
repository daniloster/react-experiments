= Components

:numbered:


== File: **

=== I18nProvider

Provider for localization properties.   
E.g.:   
```   
 //----------------------------------------------//   
 Creating LocalisedComponent   
 //----------------------------------------------//   
 import { localise, decorate } from 'daniloster-react-i18n';   
   
 const Italic = ({ children }) => <i>{children}</i>;   
   
 const localeGreeting = {   
   en: {   
     greeting: 'Hi Guest!',   
     message: decorate('You are <0>so</0> <1>Awesome</1>!'),   
   },   
   pt: {   
     greeting: 'Oi Convidado!',   
     message: decorate('<1>Você é</1> <0>tão</0> Fantástico!'),   
   },   
 };   
   
 const Greeting = localise(localeGreeting)(({ i18n }) => (   
   <div>   
     <h2>{i18n.greeting}</h2>   
     <div>{i18n.message('strong', Italic)}</div>   
   </div>   
 ));   
   
 const localeLabel = {   
   en: {   
     title: 'Creating label',   
     description: 'Description',   
     color: 'Color',   
     errorMessage: '<0>Error</0>: label has not been created successfully.',   
     successMessage: '<0>Success</0>: label has been created successfully!',   
     button: 'Save',   
   },   
   pt: {   
     title: 'Criando label',   
     description: 'Descrição',   
     color: 'Cor',   
     errorMessage: '<0>Erro</0>: label não foi criado com <1>sucesso</1>.',   
     successMessage: '<0>Sucesso</0>: label foi criado com <1>sucesso</1>!',   
     button: 'Gravar',   
   },   
 };   
   
 const LabelForm = localise(localeGreeting)(({ i18n, isError, isSuccess }) => (   
   <div>   
     <h2>{i18n.title}</h2>   
     <form>   
       <div>{i18n.description}</div>   
       <input type="text" {...yourProps} />   
       <div>{i18n.color}</div>   
       <input type="text" {...yourProps} />   
   
       {isError && (   
         <div>   
           {i18n.errorMessage(Italic, 'b')} // giving another perspective   
         </div>   
       )}   
       {isSuccess && (   
         <div>   
           {i18n.successMessage(Italic, 'b')} // giving another perspective   
         </div>   
       )}   
       <button type="submit">{i18n.button}</button>   
   
     </form>   
   </div>   
 ));   
   
   
   
 //----------------------------------------------//   
 Initialising the app   
 //----------------------------------------------//   
 import { I18nProvider } from 'daniloster-react-i18n';   
   
 // If you have the redux store provider wrapping and want to   
 // feed information from its state to the provider component,   
 // it is possible. Only need to create a mapStateToProps and   
 // an action to change the lang through reducer.   
   
 <Provider store={store}> // optional   
   <I18nProvider defaultLang="en" locales={['en', 'pt']}>   
     <Greeting /> // it will get the correct i18n object   
     <LabelForm isError />   
     <LabelForm isSuccess />   
   </I18nProvider>   
   // The elements below will always display in portuguese, unless   
   // you have internal components change the lang by action or   
   // by the setI18n function provided by I18nProvider.   
   <I18nProvider defaultLang="pt">   
     <Greeting /> // it will get the correct i18n object   
     <LabelForm isError />   
     <LabelForm isSuccess />   
   </I18nProvider>   
 </Provider>   
```   



[options="header"]
|===
|Property | Type | Required | Default value | Description
|children|node|yes||React node tree that expects the I18nProvider data.
|defaultLang|string|yes||Default language when locale does not have current translation.
|lang|string|no|null|Current language.
|locales|arrayOf|yes||List of localization provided. e.g. [&#x27;en&#x27;, &#x27;pt&#x27;].
|onChangeI18n|func|yes|&lt;See the source code&gt;|Action to change the current language externally.

|===



== File: **

=== 






== File: **

=== 






== File: **

=== 






== File: **

=== 





