/**
*
* Disclaimer: Source code mentioned below is(are) Intellectual Property of
* Crayon Data Holdings Limited (including its subsidiaries and affiliates).
* Crayon Data Holdings Limited reserves right to own and control it the way
* it may deem fit. You must refrain from use, access, read, modify, add or
* delete, sell or use in any other package or programme pertaining to such
* source code without explicit prior written approval of
* Crayon Data Holding Limited. Breach of the same shall attract penalty as
* applicable.
*
*/

let urlId = ''
export var apiProgressBar = ''
export var companyName = ''

export const addQuery = (queryObj, apiObj, id) => {
  console.log(queryObj, apiObj, id)
  urlId = !!id ? id : '';
  if (!queryObj) {
    return;
  }

  Object.keys(queryObj).map(key => {
    if (apiObj.query.hasOwnProperty(key)) {
      apiObj.addQuery = { key, value: queryObj[key] };
    }
    return apiObj.addQuery;
  });

};


export const generateQuery = query => {
  console.log(urlId)
  let newUrl = Object.keys(query).reduce((acc, key, index) => {
    console.log(index, query[key])
    if (query[key] === "" || query[key] === null) {
      return acc;
    } else {
      console.log(acc, 'fghj')
      return acc + `${!!acc ? "&" : !!urlId ? urlId + '?' : '?'}${key}=${query[key]}`;
    }
  }, "");

  return newUrl;
};
export const setapiProgressBar = per => {
  apiProgressBar = per
  console.log(apiProgressBar)
};



export const letterAvatar = (name, size) => {
  let w = window;
  let d = document;
  name = name || '';
  size = size || 60;

  var colours = [
    "#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50",
    "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"
  ],

    nameSplit = String(name).toUpperCase().split(' '),
    initials, charIndex, colourIndex, canvas, context, dataURI;


  if (nameSplit.length == 1) {
    initials = nameSplit[0] ? nameSplit[0].charAt(0) : '?';
  } else {
    // initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
    initials = nameSplit[0].charAt(0);
  }

  if (w.devicePixelRatio) {
    size = (size * w.devicePixelRatio);
  }

  charIndex = (initials == '?' ? 72 : initials.charCodeAt(0)) - 64;
  colourIndex = charIndex % 20;
  canvas = d.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  context = canvas.getContext("2d");
  console.log('colours[colourIndex - 1]--------->', name, colours[colourIndex - 1])
  context.fillStyle = hexToRGB(colours[colourIndex - 1]);
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.font = Math.round(canvas.width / 2) + "px Arial";
  context.textAlign = "center";
  context.fillStyle = '#fff';
  context.fillText(initials, size / 2, size / 1.5);

  dataURI = canvas.toDataURL();
  canvas = null;

  return dataURI;
}

export const hexToRGB = (hex, alpha) => {
  hex = hex || '#000'
  alpha = alpha || '0.5'
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}