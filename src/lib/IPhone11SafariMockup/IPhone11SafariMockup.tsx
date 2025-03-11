import { ColorSignal, PossibleColor, SignalValue } from '@motion-canvas/core';
import {
	Circle,
	Img,
	Layout,
	Node,
	NodeProps,
	Rect,
	Txt,
	colorSignal,
	initial,
	signal,
} from '@motion-canvas/2d';


import iPhone11Mockup from '/src/images/iphone-mockup.png';

import timeSVG from './icons/status-bar/TimeStyle.svg';
import batteryIcon from './icons/status-bar/Battery.svg';
import networkSignalIcon from './icons/status-bar/CellularConnection.svg';
import wifiSignalIcon from './icons/status-bar/Wifi.svg';

import httpsLockIcon from './icons/icons8-lock.svg';
import prevIcon from './icons/prev-icon.svg';
import nextIcon from './icons/next-icon.svg';
import shareIcon from './icons/share-icon.svg';
import bookmarkIcon from './icons/bookmark-icon.svg';
import copyIcon from './icons/copy-icon.svg';
import tabsIcon from './icons/tabs-icon.svg';

export interface IPhone11SafariMockupProps extends NodeProps {
	statusBarColor?: SignalValue<PossibleColor>;
}

export class IPhone11SafariMockup extends Node {
	@initial('white')
	@colorSignal()
	public declare readonly statusBarColor: ColorSignal<this>;

	public constructor(props?: IPhone11SafariMockupProps) {
		super({
			...props,
		});

		const newRoot = <Rect clip={true} size={[828, 1848]} />;
		const backdrop = <Rect fill={'white'} size={[828, 1848]} />;

		newRoot.children(props.children);
		newRoot.insert(backdrop);
		this.children(newRoot)

		this.add(<>
			{/*
			*/}
			<Rect fill={this.statusBarColor}
				size={[828, 96]} position={[0, -848]} />

			<Img src={timeSVG} width={120} position={[-315, -849]} />
			<Img src={networkSignalIcon} width={39} position={[257, -846]} />
			<Img src={wifiSignalIcon} width={35} position={[301, -846]} />
			<Img src={batteryIcon} width={54} position={[354, -847]} />
			{/*
			*/}

			<Img src={httpsLockIcon} width={29} position={[-122, 690]} />


			<Rect height={267} width={828} fill={'white'}
				position={[0, 762]} opacity={0.9} />
			<Rect height={90} width={80} fill={'white'} position={[-413, 689]} opacity={0.8}
				radius={25} />
			<Rect height={90} width={717} fill={'white'} position={[0, 689]} opacity={0.8}
				radius={25}
			/>

			<Txt fontFamily={'SF Pro Text'} position={[22, 688]} fontSize={34} fill={'black'}>theartearoma.com</Txt>


			{/* browser UI chin */}
			<Img src={prevIcon} width={22} position={[-356, 784]} />
			<Img src={nextIcon} width={22} position={[-176, 784]} />
			<Img src={shareIcon} width={38} position={[-4, 783]} />
			<Img src={bookmarkIcon} width={47} position={[170, 784]} />
			<Img src={copyIcon} width={44} position={[346, 784]} />
			<Img src={tabsIcon} width={33} position={[-306, 689]} />

			<Rect height={10} width={294} fill={'black'}
				opacity={0.8}
				position={[0, 875]}
				radius={25} />

			<Img src={iPhone11Mockup} height={1905} />
		</>);
	}

}
