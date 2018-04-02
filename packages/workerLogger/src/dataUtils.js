import memoize from 'fast-memoize';

const KB = 1024;

export const getMinimalData = memoize((data) => {
  const content = JSON.stringify(data);
  if (content.length > KB) {
    return { message: '[WARNING] data is too large' };
  }
  return data;
});

export const getActionMinimalData = memoize((type, data) => ({ type, ...getMinimalData(data) }));

export function serialiseFunction(func) {
  const serialised = func.toString();
  const args = serialised.substring(serialised.indexOf('(') + 1, serialised.indexOf(')'));
  const body = serialised.substring(serialised.indexOf('{') + 1, serialised.lastIndexOf('}'));
  return { args, body };
}

export const str = memoize((value) => {
  if (value && value.message && value.stack) {
    return `{"message":"${value.message}","stack":"${value.stack.replace(/(\n)/gi, '\\n')}"}`;
  }
  return JSON.stringify(value);
});
