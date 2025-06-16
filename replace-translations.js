const fs = require('fs');Add commentMore actions
const path = require('path');

function processJsonFiles(directory, search, replacement) {
  fs.readdirSync(directory).forEach(file => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processJsonFiles(filePath, search, replacement);
    } else if (path.extname(filePath) === '.json') {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if(processJson(data, search, replacement)) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      }
    }
  });
}

function processJson(obj, search, replacement) {
  const r = new RegExp(`([^a-zA-Z]+|^)${search}([^a-zA-Z]+|$)`, 'g');
  
  let edited = false;

  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      edited = edited || processJson(obj[key], search, replacement);
    } else if (typeof obj[key] === 'string' && obj[key].indexOf(search) > -1) {
      obj[key] = obj[key].replaceAll(r, `$1${replacement}$2`);
      edited = true;
    }
  }

  return edited;
}


processJsonFiles('./app/javascript/dashboard/i18n/locale/', 'چت ووت', 'تیکوچت');
processJsonFiles('./app/javascript/widget/i18n/locale/', 'چت ووت', 'تیکوچت');
processJsonFiles('./app/javascript/dashboard/i18n/locale/', 'Chatwoot', 'TikoChat');
processJsonFiles('./app/javascript/widget/i18n/locale/', 'Chatwoot', 'TikoChat');
