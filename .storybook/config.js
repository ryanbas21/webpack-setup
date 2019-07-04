import { configure } from '@storybook/react'
import './addons'
import { setConsoleOptions } from '@storybook/addon-console'

setConsoleOptions({
    panelExclude: [],
})

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.js$/)
function loadStories() {
    req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
