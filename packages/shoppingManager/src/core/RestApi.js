import firebase, {
  convertToPassiveError,
} from './firebase';

export default class RestApi {

  static find = (endpoint, expression) => {
    return new Promise((resolve) => {
      const itemsRef = firebase.database().ref(endpoint);
      itemsRef.once('value', (snapshot) => {
        const values = snapshot
          ? Object.values(snapshot.val() || [])
          : [];
        resolve({ data: { items: values.filter(expression) || [] } });
      })
      .catch(convertToPassiveError(resolve));
    });
  }

  static get = (endpoint) => {
    return new Promise((resolve) => {
      const itemsRef = firebase.database().ref(endpoint);
      try {
        itemsRef.once('value', (snapshot) => {
          try {
            const values = snapshot
            ? Object.values(snapshot.val() || [])
            : [];

            resolve({ data: { items: values || []} });
          } catch (e) {
            convertToPassiveError(resolve)(e);
          }
        });
      } catch (ex) {
        convertToPassiveError(resolve)(ex);
      }
    });
  }

  static getOne = (endpoint) => {
    return new Promise((resolve) => {
      const itemsRef = firebase.database().ref(endpoint);
      itemsRef.once('value', (snapshot) => {
        try {
          const data = snapshot
            ? snapshot.val()
            : null;

          resolve({ data: { item: data } });
        } catch (e) {
          convertToPassiveError(resolve)(e);
        }
      });
    });
  }

  static remove = (endpoint) => {
    return new Promise((resolve) => {
      firebase.database().ref(endpoint)
        .remove()
        .then(response => {
          console.log('REMOVE RESPONSE:', response);
          resolve({});
        })
        .catch(convertToPassiveError(resolve));
    });
  }

  static post = (endpoint, data) => {
    return new Promise((resolve) => {
      try {
        const itemsRef = firebase.database().ref(endpoint);
        const result = itemsRef.push();
        const id = result.key;
        RestApi.set(`${endpoint}/${id}`, {
          id,
          ...data,
        }).then(response => {
          resolve({ data: { item: response.data } });
        }).catch(error => {
          convertToPassiveError(resolve)(error);
        });
      } catch (e) {
        convertToPassiveError(resolve)(e);
      }
    });
  }

  static put = (endpoint, data) => {
    return new Promise((resolve) => {
      const itemsRef = firebase.database().ref(endpoint);
      itemsRef.once('value', (snapshot) => {
        try {
          const existingData = snapshot
            ? snapshot.val()
            : null;

          if (!existingData) {
            resolve({
              error: { message: `Could not find the endpoint "${endpoint}".` },
              status: 404,
            });
            return;
          }

          const newData = {
            ...existingData,
            ...data,
          };
          itemsRef.update(newData);

          resolve({
            data: { item: newData },
          });
        } catch (e) {
          convertToPassiveError(resolve)(e);
        }
      });
    });
  }

  static set = (endpoint, data) => {
    return new Promise((resolve) => {
      const itemsRef = firebase.database().ref(endpoint);
      itemsRef.set(data)
      .then(() => resolve({ data }))
      .catch(convertToPassiveError(resolve));
    });
  }
}

