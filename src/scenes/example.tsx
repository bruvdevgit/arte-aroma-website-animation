import { makeScene2D, Rect } from '@motion-canvas/2d';
import { createRef } from '@motion-canvas/core';
import iPhone11Mockup from '/src/images/iphone-mockup.png';
import iPhoneSafariExample from '/src/images/iphone-11-safari-example.jpeg';
import iPhoneSafariExample2 from '/src/images/iphone-11-safari-example2.jpeg';
import { IPhone11SafariMockup } from '../lib/IPhone11SafariMockup/IPhone11SafariMockup';
import { TouchGestureIndicator } from '../lib/TouchGestureIndicator';
import { MacbookChromeMockup } from '../lib/MacbookChromeMockup/MackbookChromeMockup';
import { CursorType, MacOSCursor } from '../lib/MacOSCursor/MacOSCursor';

// example of how box shadows are drawn
//
//<Rect size={[432, 154]} position={[-14, 770]} fill={'#3c3c3c'} opacity={1}
//  shadowBlur={10} shadowColor={'red'} shadowOffset={[0, 12]} />

// Fix this weird bug where the position of the
// root View2D is offset and so all use of
// absolutePosition() in the project is offset
// by the same.
//
function pos([x, y]: [number, number]
): [number, number] {
  return [x + 1866.5, y + 1050];

}

export default makeScene2D(function*(view) {
  // Create your animations here

  const mockup = createRef<IPhone11SafariMockup>();
  const touchIndicator = createRef<TouchGestureIndicator>();
  const cursor = createRef<MacOSCursor>();

  view.add(<>
    <Rect height={2100} width={3733} fill={'#3c3c3c'} />
    <MacbookChromeMockup ref={mockup}>
      <TouchGestureIndicator ref={touchIndicator} color={'black'} />
    </MacbookChromeMockup>
    <MacOSCursor ref={cursor} position={[0, 0]} />
  </>);

  yield* cursor().pointTo(pos([1077, -743]), 3);
  yield* cursor().changeType(CursorType.Link);
  yield* cursor().pointTo(pos([1186, -717]), 0.5);
});
