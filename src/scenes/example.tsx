import { Circle, Img, makeScene2D, Rect, Txt } from '@motion-canvas/2d';
import { Color, createRef, easeInOutCubic, tween } from '@motion-canvas/core';
import iPhone11Mockup from '/src/images/iphone-mockup.png';
import iPhoneSafariExample from '/src/images/iphone-11-safari-example.jpeg';
import iPhoneSafariExample2 from '/src/images/iphone-11-safari-example2.jpeg';
import { IPhone11SafariMockup } from '../lib/IPhone11SafariMockup/IPhone11SafariMockup';

// example of how box shadows are drawn
//
//<Rect size={[432, 154]} position={[-14, 770]} fill={'#3c3c3c'} opacity={1}
//  shadowBlur={10} shadowColor={'red'} shadowOffset={[0, 12]} />

export default makeScene2D(function*(view) {
  // Create your animations here

  const circle = createRef<Circle>();
  const mockup = createRef<IPhone11SafariMockup>();

  view.add(<>
    <Rect height={2100} width={3733} fill={'#3c3c3c'} />
    <IPhone11SafariMockup ref={mockup}>
      {/*
      <Img src={iPhoneSafariExample2} height={1792} />

			<Rect height={1792} width={828} fill={'white'}>
                        </Rect>
                        */}
      <Circle ref={circle} size={320} fill={'lightseagreen'} />
    </IPhone11SafariMockup>
  </>);

  //yield*
  //  tween(1, value => {
  //    mockup().statusBarColor(
  //      Color.lerp(
  //        new Color('#e6a700'),
  //        new Color('#e13238'),
  //        easeInOutCubic(value),
  //      ),
  //    );
  //  });

  yield* circle().scale(2, 2).to(1, 2);
});
