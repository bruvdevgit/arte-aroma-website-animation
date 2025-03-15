import { Img, Node, nodeName, NodeProps } from "@motion-canvas/2d";
import { createRef } from "@motion-canvas/core";

import normalImage from './icons/Normal-centered.png';
import linkImage from './icons/Link-centered.png';

export enum CursorType {
	Alternate,
	Busy,
	Closehand,
	DiagonalResize1,
	DiagonalResize2,
	Handwriting,
	Help,
	HorizontalResize,
	Link,
	Move,
	Normal,
	Pan,
	Person,
	Pin,
	Precision,
	Text,
	Unavailable,
	VerticalResize,
	Working,
	ZoomIn,
	ZoomOut,
}

export interface MacOSCursorProps extends NodeProps {
}

@nodeName('MacOSCursor')
export class MacOSCursor extends Node {
	private readonly image = createRef<Img>();

	public constructor(props?: MacOSCursorProps) {
		super({
			...props,
		});

		this.add(<Img ref={this.image} src={normalImage} width={190} />);
	}

	public *pointTo(
		absolutePosition: [number, number],
		duration: number = 1) {
		yield* this.absolutePosition(absolutePosition, duration);
	}

	public *changeType(type: CursorType) {
		if (type == CursorType.Normal) {
			this.image().src(normalImage);
		}
		else if (type == CursorType.Link) {
			this.image().src(linkImage);
		}
		else {
			throw RangeError(`Tried changing to un-accounted-for CursorType: ${type}`);
		}
	}

}
