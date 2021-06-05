# Installation

bs21 theme uses [Webpack](https://webpack.js.org) to compile and bundle SASS and JS.

#### Step 1
Make sure you have Node and npm installed.
You can read a guide on how to install node here: https://docs.npmjs.com/getting-started/installing-node

If you prefer to use [Yarn](https://yarnpkg.com) instead of npm, install Yarn by following the guide [here](https://yarnpkg.com/docs/install).

#### Step 2
Go to the root of bs21 theme and run the following commands: `npm install` or `yarn install`.

#### Step 3
Update `proxy` in **webpack.mix.json**.

#### Step 4
Run the following command to compile Sass and watch for changes: `npm run watch` or `yarn watch`.


### breakpoints

```
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  mbp: 2560px,
  xxl: 5120px
);

# xxl

## layout

padding-top: 50px;
padding-x: 44px

site-brand: -1px;
header-content: 102px; (79px +  23px)

gutter: 12px;

## footer

content-footer: 62px
padding-top: 37px;
padding-bottom: 47px;
footer-branding-margin-left: -4px;

## node--project--teaser

margin-top: 18px
font-size: 16px;
line-height: 25px;
font-size: 14px;
```
