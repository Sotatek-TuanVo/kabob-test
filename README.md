# KabobTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.2.

1. Init project

```
npm install -g @angular/cli
ng new kabob test
```

2. Install Eslint, Prettier, Lint staged and commitlint

```
npx husky-init
npm install
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
npm install @commitlint/config-conventional @commitlint/cli --dev
npm install lint-staged --save-dev
```
Check file config: commitlint.config.js, .lintstagedrc, .husky/*

3. Install Package

3.1 Install bootstrap

```
npm install bootstrap
npm install ngx-bootstrap --save
```

4. To run project

```
npm install
npm run start
```
Then open browser: http://localhost:4200/

5. To run project with docker

5.1 Copy .evn.example to .env

5.2 Run step 
```
make docker-build
make start
```
Then open browser: http://localhost:3000/