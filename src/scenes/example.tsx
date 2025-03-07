import { Circle, Img, makeScene2D, Rect, Txt } from '@motion-canvas/2d';
import { createRef } from '@motion-canvas/core';
import iPhone11Mockup from '/src/images/iphone-mockup.png';
import iPhoneSafariExample from '/src/images/iphone-11-safari-example.jpeg';
import batteryIcon from '/src/icons/icons8-charged-battery-100.png';
import networkSignalIcon from '/src/icons/icons8-signal-100.png';
import wifiSignalIcon from '/src/icons/icons8-wi-fi-100.png';
import httpsLockIcon from '/src/icons/icons8-lock.svg';
import heroComposition from '/src/images/hero-composition.svg';

export default makeScene2D(function*(view) {
  // Create your animations here

  const circle = createRef<Circle>();

  view.add(<>
    <Rect height={1080} width={1920} fill={'#3c3c3c'} />

    {/*
    <Img src={iPhoneSafariExample} height={940} />
    */}

    {/* browser window */}
    <Rect height={940} width={440} fill={'#ffffff'}>
      <Txt fontFamily={'SF Pro Text'} position={[-165, -444]} fontSize={16}>4:47</Txt>
      <Img src={networkSignalIcon} width={14} position={[136, -445]} />
      <Img src={wifiSignalIcon} width={18} position={[158, -445]} />
      <Img src={batteryIcon} width={30} position={[185, -445]} />

      <Img src={httpsLockIcon} width={18} position={[-63, 362]} />

      <Img src={heroComposition} width={460} position={[20, -72]} />
    </Rect>

    {/*
    <Circle ref={circle} size={320} fill={'lightseagreen'} />
    */}

    <Rect size={[432, 154]} position={[0, 406]} fill={'#3c3c3c'} opacity={0.7} />
    <Txt fontFamily={'SF Pro Text'} position={[15, 362]} fontSize={18} fill={'white'}>theartearoma.com</Txt>
    <Img src={iPhone11Mockup} height={1000} />
  </>);

  //yield* circle().scale(2, 2).to(1, 2);
});
