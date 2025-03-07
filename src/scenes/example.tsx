import { Circle, Img, makeScene2D, Rect, Txt } from '@motion-canvas/2d';
import { createRef } from '@motion-canvas/core';
import iPhone11Mockup from '/src/images/iphone-mockup.png';
import iPhoneSafariExample from '/src/images/iphone-11-safari-example.jpeg';

export default makeScene2D(function*(view) {
  // Create your animations here

  const circle = createRef<Circle>();

  view.add(<Rect height={1080} width={1920} fill={'#3c3c3c'} />);
  view.add(<Img src={iPhoneSafariExample} height={940} />);
  view.add(<Circle ref={circle} size={320} fill={'lightseagreen'} />);
  view.add(<Img src={iPhone11Mockup} height={1000} />);


  //view.add(<Txt fontFamily={'Poppins Regular'}>ABCDEFG</Txt>);
  view.add(<Txt fontFamily={'SF Pro Text'}>ABCDEFG</Txt>);

  yield* circle().scale(2, 2).to(1, 2);
});
