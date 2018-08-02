function generateBC(url, separator) {

  const oneOrMoreSlashes = /\/+/;
  parts = url.split(oneOrMoreSlashes).filter(part => part != '');

  if (parts[0].indexOf('http') > -1) { parts.shift() }
  if (parts[parts.length - 1].indexOf('index.') > -1) { parts.pop() }
  
  for (i = 0; i < parts.length; i++) {

    if (i === 0) {
      element = 'HOME';
      href = '/';
    } else {
      element = composeElement(parts[i]);
      href += parts[i] + '/';
    }

    if (i === parts.length - 1) {
      parts[i] = `<span class="active">${element}</span>`;
    } else {
      parts[i] = `<a href="${href}">${element}</a>`;
    }

  }

  return parts.join(separator);

}

function composeElement (element) {

  const wordsToExclude = ['the','of','in','from','by','with','and', 'or', 'for', 'to', 'at', 'a'];

  const endOfElement = /[?#.]/;
  element = element.split(endOfElement)[0];

  const slashOrHyphen = /[\/-]/;
  if (element.length > 30) {
    return element.split(slashOrHyphen)
                  .filter(word => !wordsToExclude.includes(word))
                  .map(word => word[0])
                  .join('')
                  .toUpperCase();
  }
  
  return element.split(slashOrHyphen)
                .join(' ')
                .toUpperCase();
}