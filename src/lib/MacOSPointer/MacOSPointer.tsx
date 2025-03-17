import { Img, Layout, Node, nodeName, NodeProps, } from "@motion-canvas/2d";
import { createRef, easeInOutCubic, tween, Vector2 } from "@motion-canvas/core";

import normalImage from './icons/Normal-centered.png';
import linkImage from './icons/Link-centered.png';
import personImage from './icons/Person-centered.png';
import pinImage from './icons/Pin-centered.png';
import panImage from './icons/Pan-centered.png';
import closeHandImage from './icons/Closehand-centered.png';
import precisionImage from './icons/Precision.png';
import textImage from './icons/Text.png';
import verticalResizeImage from './icons/Vertical-Resize.png';
import diagonalResize1Image from './icons/Diagonal-Resize-1.png';
import diagonalResize2Image from './icons/Diagonal-Resize-2.png';
import zoomInImage from './icons/Zoom-in-centered.png';
import zoomOutImage from './icons/Zoom-out-centered.png';
import unavailableImage from './icons/Unavailable-centered.png';
import helpImage from './icons/Help-centered.png';
import horizontalResizeImage from './icons/Horizontal-Resize.png';
import moveImage from './icons/Move.png';
import busyImage from './icons/Busy.gif';
import handwritingImage from './icons/Handwriting-centered.png';
import alternateImage from './icons/Alternate-centered.png';


import { pointIsOnNode } from "../utils";

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

interface CursorChangeRequest {
	shape: Layout, cursorType: CursorType,
}

@nodeName('MacOSPointer')
export class MacOSPointer extends Node {
	private cursorChangeRequests: CursorChangeRequest[] = [];

	private readonly image = createRef<Img>();

	//private readonly unregisterEffectFns: (() => void)[] = [];

	public constructor(props?: MacOSPointerProps) {
		super({
			...props,
		});

		this.add(<Img ref={this.image} src={normalImage} width={190} />);
	}

	public changeCursor(type: CursorType) {
		if (type == CursorType.Normal) {
			this.image().src(normalImage);
		}
		else if (type == CursorType.Link) {
			this.image().src(linkImage);
		}
		else if (type == CursorType.Person) {
			this.image().src(personImage);
		}
		else if (type == CursorType.Pin) {
			this.image().src(pinImage);
		}
		else if (type == CursorType.Pan) {
			this.image().src(panImage);
		}
		else if (type == CursorType.Closehand) {
			this.image().src(closeHandImage);
		}
		else if (type == CursorType.Precision) {
			this.image().src(precisionImage);
		}
		else if (type == CursorType.Text) {
			this.image().src(textImage);
		}
		else if (type == CursorType.VerticalResize) {
			this.image().src(verticalResizeImage);
		}
		else if (type == CursorType.DiagonalResize1) {
			this.image().src(diagonalResize1Image);
		}
		else if (type == CursorType.DiagonalResize2) {
			this.image().src(diagonalResize2Image);
		}
		else if (type == CursorType.ZoomIn) {
			this.image().src(zoomInImage);
		}
		else if (type == CursorType.ZoomOut) {
			this.image().src(zoomOutImage);
		}
		else if (type == CursorType.Unavailable) {
			this.image().src(unavailableImage);
		}
		else if (type == CursorType.Help) {
			this.image().src(helpImage);
		}
		else if (type == CursorType.HorizontalResize) {
			this.image().src(horizontalResizeImage);
		}
		else if (type == CursorType.Move) {
			this.image().src(moveImage);
		}
		else if (type == CursorType.Busy) {
			this.image().src(busyImage);
		}
		else if (type == CursorType.Handwriting) {
			this.image().src(handwritingImage);
		}
		else if (type == CursorType.Alternate) {
			this.image().src(alternateImage);
		}
		else {
			throw RangeError(`Tried changing to un-accounted-for CursorType: ${type}`);
		}
	}

	public *pointTo(absolutePosition: [number, number],
		duration: number = 1) {
		const startPosition = this.absolutePosition();
		yield* tween(duration, value => {
			const currentPosition = Vector2.lerp(
				startPosition,
				new Vector2(absolutePosition),
				easeInOutCubic(value),
			);
			this.absolutePosition(currentPosition);
			this.conformCursorToChangeRequests();
		});
	}

	public conformCursorToChangeRequests() {
		let someRequestWasTriggered = false;
		for (const { shape, cursorType } of this.cursorChangeRequests) {
			if (pointIsOnNode(this.absolutePosition(), {
				absolutePosition: shape.absolutePosition(),
				size: shape.size(),
			})) {
				if (cursorType != CursorType.Normal) {
					// Normal has the lowest priority
					// ie: always update from Normal to any other type
					this.changeCursor(cursorType);
				}
				someRequestWasTriggered = true;
			}
		}
		if (!someRequestWasTriggered) {
			this.changeCursor(CursorType.Normal);
		}
	}

	public registerChangeCursorOnHover(shape: Layout, cursorType: CursorType) {
		this.cursorChangeRequests.push({ shape, cursorType });

		//const unregisterFn = createDeferredEffect(() => {
		//	if (pointIsOnNode(this.absolutePosition(), {
		//		absolutePosition: shape.absolutePosition(),
		//		size: shape.size(),
		//	})) {
		//		this.cursorType = cursorType;
		//	}
		//});
		//
		//this.unregisterEffectFns.push(unregisterFn);
	}

	//public override dispose(): void {
	//	for (const unregisterEffectFn of this.unregisterEffectFns) {
	//		unregisterEffectFn();
	//	}
	//	super.dispose();
	//}

}

// - changes arrow to hand on hover
// - registerChangeCursorOnHover(`Shape` component, CursorType.Link)
// PointerHoverController
//


// When the cursor is moving, it immediately switches to hover.
// But, when the page is moving instead of the cursor, any
// necessary switch to hover is determined after the move.
