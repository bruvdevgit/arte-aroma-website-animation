import { Circle, Img, makeScene2D, Rect, Txt } from '@motion-canvas/2d';
import { createRef } from '@motion-canvas/core';
import iPhone11Mockup from '/src/images/iphone-mockup.png';
import iPhoneSafariExample from '/src/images/iphone-11-safari-example.jpeg';
import batteryIcon from '/src/icons/icons8-charged-battery-100.png';
import networkSignalIcon from '/src/icons/icons8-signal-100.png';
import wifiSignalIcon from '/src/icons/icons8-wi-fi-100.png';
import httpsLockIcon from '/src/icons/icons8-lock.svg';
import heroComposition from '/src/images/hero-composition.svg';
import prevIcon from '/src/icons/prev-icon.svg';
import nextIcon from '/src/icons/next-icon.svg';
import shareIcon from '/src/icons/share-icon.svg';
import bookmarkIcon from '/src/icons/bookmark-icon.svg';
import copyIcon from '/src/icons/copy-icon.svg';
import tabsIcon from '/src/icons/tabs-icon.svg';

// example of how box shadows are drawn
//
//<Rect size={[432, 154]} position={[-14, 770]} fill={'#3c3c3c'} opacity={1}
//  shadowBlur={10} shadowColor={'red'} shadowOffset={[0, 12]} />

export default makeScene2D(function*(view) {
  // Create your animations here

  const circle = createRef<Circle>();

  view.add(<>
    <Rect height={2100} width={3733} fill={'#3c3c3c'} />

    {/*
    <Img src={iPhoneSafariExample} height={1792} />
    */}

    {/* browser window */}
    <Rect height={1792} width={828} fill={'#ffffff'}>
      {/*
    <Rect height={1792} width={828}>
    */}
      <Txt fontFamily={'SF Pro Text'} position={[-316, -848]} fontSize={34}>4:47</Txt>
      <Img src={networkSignalIcon} width={28} position={[258, -848]} />
      <Img src={wifiSignalIcon} width={30} position={[302, -846]} />
      <Img src={batteryIcon} width={60} position={[353, -849]} />

      <Img src={httpsLockIcon} width={29} position={[-122, 690]} />

      <Img src={heroComposition} width={460} position={[20, -72]} />
    </Rect>

    <Circle ref={circle} size={320} fill={'lightseagreen'} />


    <Rect height={267} width={828} fill={'#3c3c3c'}
      position={[0, 762]} opacity={0.8} />
    <Rect height={90} width={80} fill={'#3c3c3c'} position={[-413, 689]} opacity={0.3}
      radius={25} />
    <Rect height={90} width={717} fill={'#3c3c3c'} position={[0, 689]} opacity={0.3}
      radius={25}
    />
    {/*
    */}


    <Rect height={10} width={294} fill={'white'}
      position={[0, 875]}
      radius={25} />
    {/*
    */}

    {/* browser UI chin */}
    <Img src={prevIcon} width={22} position={[-356, 784]} />
    <Img src={nextIcon} width={22} position={[-176, 784]} />
    <Img src={shareIcon} width={38} position={[-4, 783]} />
    <Img src={bookmarkIcon} width={47} position={[170, 784]} />
    <Img src={copyIcon} width={44} position={[346, 784]} />
    <Img src={tabsIcon} width={33} position={[-306, 689]} />


    <Txt fontFamily={'SF Pro Text'} position={[22, 688]} fontSize={34} fill={'white'}>theartearoma.com</Txt>
    <Img src={iPhone11Mockup} height={1905} />
  </>);

  yield* circle().scale(2, 2).to(1, 2);
});
