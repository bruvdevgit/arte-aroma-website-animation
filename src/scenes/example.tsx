import { Circle, Img, Layout, makeScene2D, Rect, Txt } from '@motion-canvas/2d';
import { createRef } from '@motion-canvas/core';
import iPhone11Mockup from '/src/images/iphone-mockup.png';
import iPhoneSafariExample from '/src/images/iphone-11-safari-example.jpeg';
import iPhoneSafariExample2 from '/src/images/iphone-11-safari-example2.jpeg';
import { IPhone11SafariMockup } from '../lib/IPhone11SafariMockup/IPhone11SafariMockup';
import { MacOSChromeMockup } from '../lib/MacOSChromeMockup/MacOSChromeMockup';
import { TouchGestureIndicator } from '../lib/TouchGestureIndicator';
import MenuIcon from '/src/icons/menu-svgrepo-com.svg';
import { MacbookChromeMockup } from '../lib/MacbookChromeMockup/MackbookChromeMockup';

// example of how box shadows are drawn
//
//<Rect size={[432, 154]} position={[-14, 770]} fill={'#3c3c3c'} opacity={1}
//  shadowBlur={10} shadowColor={'red'} shadowOffset={[0, 12]} />

export default makeScene2D(function*(view) {
  // Create your animations here

  const mockup = createRef<IPhone11SafariMockup>();
  const touchIndicator = createRef<TouchGestureIndicator>();

  view.add(<>
    <Rect height={2100} width={3733} fill={'#3c3c3c'} />
    <MacbookChromeMockup ref={mockup}>
      <TouchGestureIndicator ref={touchIndicator} color={'black'} />
    </MacbookChromeMockup>
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

});
