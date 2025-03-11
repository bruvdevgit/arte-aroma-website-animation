import { Circle, Img, Layout, makeScene2D, Rect, Txt } from '@motion-canvas/2d';
import { createRef } from '@motion-canvas/core';
import iPhone11Mockup from '/src/images/iphone-mockup.png';
import iPhoneSafariExample from '/src/images/iphone-11-safari-example.jpeg';
import iPhoneSafariExample2 from '/src/images/iphone-11-safari-example2.jpeg';
import { IPhone11SafariMockup } from '../lib/IPhone11SafariMockup/IPhone11SafariMockup';
import { TouchGestureIndicator } from '../lib/TouchGestureIndicator';

// example of how box shadows are drawn
//
//<Rect size={[432, 154]} position={[-14, 770]} fill={'#3c3c3c'} opacity={1}
//  shadowBlur={10} shadowColor={'red'} shadowOffset={[0, 12]} />

export default makeScene2D(function*(view) {
  // Create your animations here

  const mockup = createRef<IPhone11SafariMockup>();
  const scrollable = createRef<Layout>();
  const touchIndicator = createRef<TouchGestureIndicator>();

  view.add(<>
    <Rect height={2100} width={3733} fill={'#3c3c3c'} />
    <IPhone11SafariMockup ref={mockup}>
      <Layout ref={scrollable} direction={'column'} width={960} gap={40} layout>
        <Rect height={240} fill={'#8ecae6'} />
        <Rect height={240} fill={'#219ebc'} />
        <Rect height={240} fill={'#023047'} />
        <Rect height={240} fill={'#ffb703'} />
        <Rect height={240} fill={'#fb8500'} />
        <Rect height={240} fill={'#8ecae6'} />
        <Rect height={240} fill={'#219ebc'} />
        <Rect height={240} fill={'#023047'} />
        <Rect height={240} fill={'#ffb703'} />
        <Rect height={240} fill={'#fb8500'} />
      </Layout>
    </IPhone11SafariMockup>

    <TouchGestureIndicator ref={touchIndicator} />
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

  yield* touchIndicator().tap(0.5, [700, 0]);
  yield* touchIndicator().tap(1, [700, 200]);
  yield* touchIndicator().tap(2);
  //yield* scrollable().position.y(-600, 2);
});
