const expect = require('chai').expect

import {render, fireEvent} from '@testing-library/vue'

import App from '../../src/App.vue'
import Home from '../../src/views/Home.vue'
import About from '../../src/views/About.vue'

const routes = [
  {path: '/', component: Home},
  {path: '/about', component: About},
  {path: '*', redirect: '/about'},
]
it('full app rendering/navigating', async () => {
  // Notice how we pass a `routes` object to our render function.
  const {queryByTestId} = render(App, {routes})

  expect(queryByTestId('location-display').textContent).to.equal('/')

  await fireEvent.click(queryByTestId('about-link'))

  expect(queryByTestId('location-display').textContent).to.equal('/about')
})

it('setting initial route', () => {
  // The callback function receives three parameters: the Vue instance where
  // the component is mounted, the store instance (if any) and the router
  // object.
  const {queryByTestId} = render(App, {routes}, (vue, store, router) => {
    router.push('/about')
  })

  expect(queryByTestId('location-display').textContent).to.equal('/about')
})