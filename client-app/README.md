## Alex-Paiu

### Prerequisites
1. [NodeJS and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

###  Installation Guide

1. Please clone and copy the MediaPlayer repository.
2. Navigate to MediaPlayer/client-app and run script `npm install`
Due to some unsolved errors with some dependencies, additionally steps are required to run this application locally.
3. Identify the semantic-ui-css package in the newly installed node_modules folder. Search for ";;" and remove a semicolon. This is a typo on their side.
4. Search SemanticCOLORS && SemanticICONS in Semantic-UI-React -> dist -> commonjs -> generic.d.ts file. Add "| string" to both constants. Provides a fix to a feature they had in the past.
3. From the same folder run script `npm start`
4. Application is running!



