Loggr
===

An open-source time logging app for people like me.

**Note:** This is a work in progress, and not ready for public use just yet!

Technologies
---
This project leverages the following technologies:
- React.js (UI library) (https://facebook.github.io/react/)
- Redux (state container) (http://rackt.github.io/redux/)
- ES2015 (new JavaScript spec) (https://babeljs.io/docs/learn-es2015/)
- React Router (routing) (https://github.com/rackt/react-router)
- Lodash (utility library) (https://lodash.com/)
- Webpack (module bundler) (https://webpack.github.io/)
- Babel (ES2015/JSX transpiler) (https://babeljs.io/)
- Mocha (tests) (https://mochajs.org/)
- Chai (assertions for tests) (http://chaijs.com/)
- Git hooks (run tests pre-commit) (https://www.atlassian.com/git/tutorials/git-hooks/)
- ESLint (code quality) (http://eslint.org/)

This guide may also be helpful: https://github.com/petehunt/react-howto

Development Server
---
To get started developing, you'll first need to grab the project files and install dependencies:

    # clone the repository
    git clone https://github.com/Terralever/myFSN-Mobile-Web-UI.git

    # install the dependencies
    npm install -g webpack webpack-dev-server
    npm install

Next, you'll need to initialize the git hooks:

    # set up git hooks
    bin/init-git-hooks

Now you're ready to start the local dev server:

    # start the development server
    npm start

If everything went well, you should be able to view the project in your browser at http://localhost:3000/

Code Quality
---
This project is set up with a linter (ESLint) to enforce code quality before a commit is allowed. **Note:** The Git hooks must be enabled for the pre-commit checks to occur. To enable the Git hooks:

    # from project root...
    bin/init-git-hooks

Our project is using an ESLint configuration with rules from Google's JavaScript Style Guide (https://google.github.io/styleguide/javascriptguide.xml), and there are additional rules that are specific to JSX (React) code.

To detect linter warnings and errors statically (while you're working), you can download a package specific to your editor that will read the linter rules from ./.eslintrc.json and enforce them as you type:

- Atom: https://atom.io/packages/linter-eslint
- Sublime Text: https://github.com/roadhump/SublimeLinter-eslint
- Visual Studio Code: Included in default installation (https://code.visualstudio.com/Docs/languages/javascript)

Tests
---
Currently, we're testing action creators, the core library, and reducers. Action creators are functions
that generate actions, which are objects that describe an event that has taken
place. Reducers follow the form (state, action) => state. Given the current state
and an action, reducers return a new state.

Tests are run automatically by the pre-commit Git hook. If you want to run the tests manually:

    # run tests once
    npm run test

    # run tests at every code change
    npm run test:watch

Build task
---

To run the build task:

    # build the production project files
    npm run build

See *./package.json* to view the npm scripts.

Styles
---
- Sass styles are located in **./src/_assets/styles**
- Styles are compiled and watched for changes when you start the webpack dev server
