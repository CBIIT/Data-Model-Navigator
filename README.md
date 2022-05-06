# Bento UI Building Blocks

Bento UI Building Blocks is a NPM library in an attempt to reuse the shared UI components across NCI data commons frameworks.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install Bento UI Building Blocks.

```bash
npm install bento-components
```

## Usage

```react
//Header
import { Header } from 'bento-components';

const ICDCHeader = () => <><Header /></>;
export default ICDCHeader;
```
```react
//Footer
import { Footer } from 'bento-components';
import FooterData from './footer.json'; //path to the json file Sample can be found in Stubs

const ICDCFooter = () => <><Footer data={FooterData} /></>;
export default ICDCFooter
```
```react
DataTable
For now we customized moving select cell to right
import { CustomDataTable } from 'bento-components';

const columns = ["Name", "Company", "City", "State"];

const data = [
 ["Joe James", "Test Corp", "Yonkers", "NY"],
 ["John Walsh", "Test Corp", "Hartford", "CT"],
 ["Bob Herm", "Test Corp", "Tampa", "FL"],
 ["James Houston", "Test Corp", "Dallas", "TX"],
];

const options = {
  selectCellPostion: 'right', // If not specified it defaults to left
};
<MUIDatatable columns={columns} data={data} options={options} selectCellPostion="right" />
```
## Scripts Available

```
### `npm run storybook`

Runs the app in the development mode.
Open [http://localhost:9001](http://localhost:9001) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
```
```
### `npm run storybook`

Builds the app for production to the `lib`  and  `es` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

Your app is ready to be deployed!

```
