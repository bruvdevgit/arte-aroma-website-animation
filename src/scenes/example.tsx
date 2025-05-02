import { makeScene2D, Rect } from '@motion-canvas/2d';
import { createRef, Reference, waitFor } from '@motion-canvas/core';
import { TouchGestureIndicator } from '../lib/TouchGestureIndicator';
import { MacbookChromeMockup } from '../lib/MacbookChromeMockup/MackbookChromeMockup';
import { CursorType, MacOSPointer } from '../lib/MacOSPointer/MacOSPointer';
import { indexPageMacbook } from '../inkscapeSVGGenerated/indexPageMacbook';

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

  const mockup = createRef<MacbookChromeMockup>();

  view.add(<>
    <Rect height={2100} width={3733} fill={'#3c3c3c'} />
    <MacbookChromeMockup isDevMode={true} ref={mockup}>
    </MacbookChromeMockup>
  </>);

  const { rect2 } = indexPageMacbook(mockup());

  yield* rect2().scale(2, 2).to(1, 2);

  yield* waitFor(2);

});
