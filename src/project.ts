import { makeProject } from '@motion-canvas/core';

import example from './scenes/example?scene';
import testTouchGestureIndicator from './lib/demoScenes/touchGestureIndicator?scene';
import pointers from './lib/demoScenes/pointers?scene';

import './global.css';

export default makeProject({
  scenes: [
    //example,
    //testTouchGestureIndicator
    pointers
  ],
});
