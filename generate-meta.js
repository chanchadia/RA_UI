    const fs = require('fs');
    const path = require('path');
    const pkg = require('./package.json');

    const data = {
        version: pkg.version
    };

    const outputPath = path.resolve(__dirname, 'public', 'meta.json');

    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));