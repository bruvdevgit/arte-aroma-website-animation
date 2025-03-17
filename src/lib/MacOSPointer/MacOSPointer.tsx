import { Img, initial, Layout, Node, nodeName, NodeProps, signal, } from "@motion-canvas/2d";
import { createDeferredEffect, createEffect, createRef, easeInOutCubic, SimpleSignal, tween, useLogger, Vector2 } from "@motion-canvas/core";

import normalImage from './icons/Normal-centered.png';
import linkImage from './icons/Link-centered.png';
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
