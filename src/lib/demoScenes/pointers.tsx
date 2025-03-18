import { makeScene2D, Rect } from '@motion-canvas/2d';
import { createRef, Reference } from '@motion-canvas/core';
import { MacbookChromeMockup } from '../MacbookChromeMockup/MackbookChromeMockup';
import { CursorType, MacOSPointer } from '../MacOSPointer/MacOSPointer';

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

  const cursorTypeExamples
    : { cursorType: CursorType, ref: Reference<Rect>, position: [number, number] }[] = [
      { cursorType: CursorType.Normal, ref: createRef<Rect>(), position: [-1108, -570] },
      { cursorType: CursorType.Link, ref: createRef<Rect>(), position: [-906, -563] },
      { cursorType: CursorType.Person, ref: createRef<Rect>(), position: [-747, -570] },
      { cursorType: CursorType.Pin, ref: createRef<Rect>(), position: [-570, -574] },
      { cursorType: CursorType.Pan, ref: createRef<Rect>(), position: [-431, -569] },
      { cursorType: CursorType.Closehand, ref: createRef<Rect>(), position: [-401, -569] },
      { cursorType: CursorType.Precision, ref: createRef<Rect>(), position: [-266, -577] },
      { cursorType: CursorType.Text, ref: createRef<Rect>(), position: [-133, -578] },
      { cursorType: CursorType.VerticalResize, ref: createRef<Rect>(), position: [-139, -464] },
      { cursorType: CursorType.DiagonalResize1, ref: createRef<Rect>(), position: [-272, -456] },
      { cursorType: CursorType.DiagonalResize2, ref: createRef<Rect>(), position: [-419, -456] },
      { cursorType: CursorType.ZoomIn, ref: createRef<Rect>(), position: [-530, -452] },
      { cursorType: CursorType.ZoomOut, ref: createRef<Rect>(), position: [-648, -452] },
      { cursorType: CursorType.Unavailable, ref: createRef<Rect>(), position: [-802, -448] },
      { cursorType: CursorType.Help, ref: createRef<Rect>(), position: [-937, -452] },
      { cursorType: CursorType.HorizontalResize, ref: createRef<Rect>(), position: [-1098, -455] },
      { cursorType: CursorType.Move, ref: createRef<Rect>(), position: [-1104, -359] },
      { cursorType: CursorType.Handwriting, ref: createRef<Rect>(), position: [-947, -358] },
      { cursorType: CursorType.Alternate, ref: createRef<Rect>(), position: [-800, -357] },

      //{ cursorType: CursorType.Working, ref: createRef<Rect>(), position: [0,0] },
      //{ cursorType: CursorType.Busy, ref: createRef<Rect>(), position: [0, 0] },
    ];

  view.add(<>
    <Rect height={2100} width={3733} fill={'#3c3c3c'} />
    <MacbookChromeMockup ref={mockup}>
      {cursorTypeExamples.map(example => (
        <Rect
          ref={example.ref}
          position={[example.position[0] - 3, example.position[1] + 55]}
          size={[30, 30]}
          fill={'red'}
        />))}

    </MacbookChromeMockup>
  </>);

  yield* mockup().clickMouseCursorAt(pos([-366, -146]));
  yield* mockup().clickMouseCursorAt(pos([-710, -269]));

  cursorTypeExamples.forEach(example => {
    mockup().registerChangePointerCursorOnHover(example.ref(), example.cursorType);
  });

  for (const example of cursorTypeExamples) {
    yield* mockup().pointMouseCursorAt(pos(example.position), 1);
  }

});
