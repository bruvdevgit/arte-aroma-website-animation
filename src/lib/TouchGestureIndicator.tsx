import {
	Circle,
	Node,
	NodeProps,
	Rect,
	colorSignal,
	initial,
	signal,
} from '@motion-canvas/2d';
import {
	Color,
	ColorSignal,
	PossibleColor,
	SignalValue,
	SimpleSignal,
	all,
	createRef,
	createSignal,
	delay,
	easeInCirc,
	easeInCubic,
	easeInOutCubic,
	easeInOutExpo,
	easeInOutQuint,
	easeOutCirc,
	easeOutCubic,
	easeOutQuint,
	map,
	sequence,
	tween,
} from '@motion-canvas/core';

export interface TouchGestureIndicatorProps extends NodeProps {
	isTouchDown?: SignalValue<boolean>;
	color?: SignalValue<PossibleColor>;
}

export class TouchGestureIndicator extends Node {
	@initial(false)
	@signal()
	public declare readonly isTouchDown: SimpleSignal<boolean, this>;

	@initial('#68ABDF')
	@colorSignal()
	public declare readonly color: ColorSignal<this>;

	private readonly innerCircle = createRef<Rect>();
	private readonly outerCircle = createRef<Rect>();

	public constructor(props?: TouchGestureIndicatorProps) {
		super({
			...props,
		});

		this.add(<>
			<Rect
				ref={this.innerCircle}
				stroke={'white'}
				lineWidth={10} size={250} radius={300} opacity={0} />
			<Rect
				ref={this.outerCircle}
				stroke={'white'}
				lineWidth={0} size={80} radius={300} />
		</>);
	}

	public *tap(duration: number = 0.5, place?: [number, number],) {
		if (place != null)
			this.position(place);

		this.innerCircle().save();
		yield* all(
			this.innerCircle().opacity(1, duration, easeInOutExpo),
			this.innerCircle().lineWidth(20, duration),
			this.innerCircle().size(100, duration),
		);

		this.outerCircle().opacity(1);
		this.outerCircle().lineWidth(15);
		this.outerCircle().size(100);

		yield* sequence(
			duration / 5,
			all(
				this.outerCircle().opacity(0, duration, easeInOutExpo),
				this.outerCircle().lineWidth(5, duration),
				this.outerCircle().size(400, duration),
			),
			this.innerCircle().restore(duration),
		);


	}

}
