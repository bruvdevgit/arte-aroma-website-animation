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

export interface MacOSPointerProps extends NodeProps {
}

@nodeName('MacOSPointer')
export class MacOSPointer extends Node {
	private readonly image = createRef<Img>();

	public constructor(props?: MacOSPointerProps) {
		super({
			...props,
		});

		this.add(<Img ref={this.image} src={normalImage} width={190} />);
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

// - changes arrow to hand on hover
// - registerPointerCursorOnHover(`Shape` component, CursorType.Link)
// PointerHoverController
//


// When the cursor is moving, it immediately switches to hover.
// But, when the page is moving instead of the cursor, any
// necessary switch to hover is determined after the move.
