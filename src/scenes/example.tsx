import { makeScene2D, Rect } from '@motion-canvas/2d';
import { all, createRef, easeInOutCubic } from '@motion-canvas/core';
import iPhone11Mockup from '/src/images/iphone-mockup.png';
import iPhoneSafariExample from '/src/images/iphone-11-safari-example.jpeg';
import iPhoneSafariExample2 from '/src/images/iphone-11-safari-example2.jpeg';
import { IPhone11SafariMockup } from '../lib/IPhone11SafariMockup/IPhone11SafariMockup';
import { TouchGestureIndicator } from '../lib/TouchGestureIndicator';
import { MacbookChromeMockup } from '../lib/MacbookChromeMockup/MackbookChromeMockup';
import { CursorType, MacOSPointer } from '../lib/MacOSPointer/MacOSPointer';

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
  const touchIndicator = createRef<TouchGestureIndicator>();
  const cursor = createRef<MacOSPointer>();
  const buttonExample = createRef<Rect>();
  const buttonExample2 = createRef<Rect>();

  view.add(<>
    <Rect height={2100} width={3733} fill={'#3c3c3c'} />
    <MacbookChromeMockup ref={mockup}>
      <TouchGestureIndicator ref={touchIndicator} color={'black'} />
      <Rect ref={buttonExample} position={[284, -311]} size={[400, 400]} fill={'red'} />
      <Rect ref={buttonExample2} size={[30, 30]} fill={'blue'} />
    </MacbookChromeMockup>
    <MacOSPointer ref={cursor} position={[0, 0]} />
  </>);

  mockup().registerChangePointerCursorOnHover(buttonExample(), CursorType.Link);
  mockup().registerChangePointerCursorOnHover(buttonExample2(), CursorType.Link);


  yield* all(
    cursor().absolutePosition(pos([1077, -743]), 3),
    mockup().pointMouseCursorTo(pos([1077, -743]), 3),
  );
  cursor().changeCursor(CursorType.Link);
  yield;
  yield* cursor().absolutePosition(pos([1186, -717]), 0.5);
});
