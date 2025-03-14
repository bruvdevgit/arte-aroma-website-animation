import { makeScene2D, Rect } from '@motion-canvas/2d';
import { createRef } from '@motion-canvas/core';
import { IPhone11SafariMockup } from '../IPhone11SafariMockup/IPhone11SafariMockup';
import { TouchGestureIndicator } from '../TouchGestureIndicator';

export default makeScene2D(function*(view) {
  // Create your animations here

  const mockup = createRef<IPhone11SafariMockup>();
  const touchIndicator = createRef<TouchGestureIndicator>();

  view.add(<>
    <Rect height={2100} width={3733} fill={'#3c3c3c'} />
    <IPhone11SafariMockup ref={mockup}>
      <TouchGestureIndicator ref={touchIndicator} color={'black'} />
    </IPhone11SafariMockup>
  </>);


  yield* touchIndicator().tap(0.5, [0, 0]);
  // swipe down
  yield* touchIndicator().color('#f94144', 0);
  yield* touchIndicator().drag({
    toPosition: [0, 400],
    totalAnimDuration: 3,
  });

  // swipe down-right-wardly
  yield* touchIndicator().color('#f3722c', 0);
  yield* touchIndicator().drag({
    toPosition: [900, 400],
    totalAnimDuration: 3,
    fromPosition: [0, 0],
  });

  // swipe right-wardly
  yield* touchIndicator().color('#f8961e', 0);
  yield* touchIndicator().drag({
    toPosition: [400, 0],
    totalAnimDuration: 3,
    fromPosition: [0, 0],
  });

  // swipe up-right-wardly
  yield* touchIndicator().color('#f9844a', 0);
  yield* touchIndicator().drag({
    toPosition: [600, -400],
    totalAnimDuration: 3,
    fromPosition: [0, 0],
  });

  // swipe up
  yield* touchIndicator().color('#90be6d', 0);
  yield* touchIndicator().drag({
    toPosition: [0, -400],
    totalAnimDuration: 3,
    fromPosition: [0, 0],
  });

  // swipe up-left-wardly
  yield* touchIndicator().color('#f9c74f', 0);
  yield* touchIndicator().drag({
    toPosition: [-400, -600],
    totalAnimDuration: 3,
    fromPosition: [0, 0],
  });

  // swipe left-wardly
  yield* touchIndicator().color('#43aa8b', 0);
  yield* touchIndicator().drag({
    toPosition: [-400, 0],
    totalAnimDuration: 3,
    fromPosition: [0, 0],
  });

  // swipe down-left-wardly
  yield* touchIndicator().color('#4d908e', 0);
  yield* touchIndicator().drag({
    toPosition: [-400, 600],
    totalAnimDuration: 3,
    fromPosition: [0, 0],
  });
});
