import { ColorSignal, PossibleColor, SignalValue } from '@motion-canvas/core';
import {
	Img,
	Node,
	NodeProps,
	Rect,
	Txt,
	colorSignal,
	initial,
} from '@motion-canvas/2d';


import macbookFrame from './images/macbook-laptop-frame.png';
import chromeHeaderLight from './images/chrome-header-light.svg';

export interface MacbookChromeMockupProps extends NodeProps {
	statusBarColor?: SignalValue<PossibleColor>;
}

export class MacbookChromeMockup extends Node {
	@initial('white')
	@colorSignal()
	public declare readonly statusBarColor: ColorSignal<this>;

	public constructor(props?: MacbookChromeMockupProps) {
		super({
			...props,
		});


		// This is the ratio of the screen area;
		// it was derived through trial-and-error.
		//
		//  2644  :  1690
		//   |        |
		//  width    height
		//
		// width = 2644 * (height/1690)
		//
		function getWidthFromHeight(h: number) {
			const w = 2644 * (h / 1690);
			return w;
		}

		const height = 2000;

		const totalFrameHeight = 308;
		const [screenSizeX, screenSizeY] = [
			getWidthFromHeight(height - totalFrameHeight),
			height - totalFrameHeight];
		//const [screenPositionX, screenPositionY] = [4, -37];
		const [screenPositionX, screenPositionY] = [3, -55];

		const screen = <Rect fill={'white'} clip={true}
			position={[screenPositionX, screenPositionY]}
			size={[screenSizeX, screenSizeY]} />;

		screen.add(<>
			<Img src={chromeHeaderLight} width={screenSizeX - 4}
				position={[screenPositionX, -723]} />

			<Txt fontFamily={'SF Pro Display'}
				left={[-887, -758]}
				fontSize={36} fill={'#323232'}
			>UJ's favourite on campus</Txt>

			<Txt fontFamily={'SF Pro Display'}
				left={[-720, -668]}
				fontSize={42} fill={'#323232'}
			>https://theartearoma.com</Txt>
		</>);

		screen.add(props.children);

		this.children(screen)

		this.add(<>
			<Img src={macbookFrame} height={height} />
		</>);
	}

}
