import {
	Node,
	NodeProps,
	Rect,
	colorSignal,
	initial,
	signal,
} from '@motion-canvas/2d';
import {
	ColorSignal,
	PossibleColor,
	RAD2DEG,
	SignalValue,
	SimpleSignal,
	ThreadGenerator,
	all,
	createRef,
	easeInOutExpo,
	map,
	sequence,
	tween,
} from '@motion-canvas/core';
import { calculateRotationFromSouthIs0Rad, mapValueToSubrange } from './utils';

export interface TouchGestureIndicatorProps extends NodeProps {
	color?: SignalValue<PossibleColor>;
	isDevMode?: boolean;
}

export class TouchGestureIndicator extends Node {
	@initial('white')
	@colorSignal()
	public declare readonly color: ColorSignal<this>;

	private readonly innerCircle = createRef<Rect>();
	private readonly outerCircle = createRef<Rect>();

	private readonly dragStartAnchor = createRef<Rect>();
	private readonly dragEndAnchor = createRef<Rect>();

	public constructor(props?: TouchGestureIndicatorProps) {
		super({
			...props,
		});
		const isDevmode = props?.isDevMode != null ? props.isDevMode : false;

		this.add(<>
			<Rect
				ref={this.dragStartAnchor}
				stroke={'red'}
				lineWidth={20} size={100} radius={300} opacity={isDevmode ? 1 : 0} />
			<Rect
				ref={this.dragEndAnchor}
				stroke={'blue'}
				lineWidth={20} size={100} radius={300} opacity={isDevmode ? 1 : 0} />
			<Rect
				ref={this.innerCircle}
				stroke={this.color}
				lineWidth={10} size={250} radius={300} opacity={0} />
			<Rect
				ref={this.outerCircle}
				stroke={this.color}
				lineWidth={0} size={80} radius={300} />
		</>);
	}

	public *tap(duration: number = 0.5, place?: [number, number],) {
		if (place != null)
			this.position(place);

		yield* this.touchDownDoSomethingAndThenLetGo(duration);
	}

	private *touchDownDoSomethingAndThenLetGo(equalDownAndUpDuration: number, onDown?: ThreadGenerator) {
		this.dragStartAnchor().position([0, 0]);
		this.dragEndAnchor().position([0, 0]);
		this.innerCircle().position([0, 0]);
		this.outerCircle().position([0, 0]);

		yield* all(
			this.innerCircle().opacity(1, equalDownAndUpDuration, easeInOutExpo),
			this.innerCircle().lineWidth(20, equalDownAndUpDuration),
			this.innerCircle().size(100, equalDownAndUpDuration),
		);

		if (onDown)
			yield* onDown;

		this.outerCircle().save();
		this.outerCircle().opacity(1);
		this.outerCircle().lineWidth(15);
		this.outerCircle().size(100);

		yield* sequence(
			equalDownAndUpDuration / 5,
			all(
				this.outerCircle().opacity(0, equalDownAndUpDuration, easeInOutExpo),
				this.outerCircle().lineWidth(5, equalDownAndUpDuration),
				this.outerCircle().size(400, equalDownAndUpDuration),
			),
			all(
				this.innerCircle().opacity(0, equalDownAndUpDuration, easeInOutExpo),
				this.innerCircle().lineWidth(10, equalDownAndUpDuration),
				this.innerCircle().size(250, equalDownAndUpDuration),
			),
		);
	}


	public *drag(args: DragFnArgs) {
		let {
			fromPosition: from,
			toPosition: to,
			totalAnimDuration: duration = 0.5,
		} = args;

		if (from == null) {
			const [x, y] = this.position();
			from = [x, y];
		}
		else {
			this.position([from[0], from[1]]);
		}

		const [xMove, yMove] = [to[0] - from[0], to[1] - from[1]];
		const rotationAngleDeg = calculateRotationFromSouthIs0Rad(xMove, yMove) * RAD2DEG;

		this.rotation(-rotationAngleDeg);
		const sohcahtoaHypotenuse = Math.sqrt(Math.pow(xMove, 2)
			+ Math.pow(yMove, 2));

		const durationForEachStage = duration / 3;

		yield* this.touchDownDoSomethingAndThenLetGo(durationForEachStage,
			tween(durationForEachStage, value => {
				// TODO: replace 10 with half of lineWidth
				this.innerCircle().top(this.dragStartAnchor().top().add([0, 10]));

				this.dragEndAnchor().position.y(map(
					0,
					sohcahtoaHypotenuse,
					mapValueToSubrange(value, [0, 0.6]),
				));
				this.dragStartAnchor().position.y(map(
					0,
					sohcahtoaHypotenuse,
					mapValueToSubrange(value, [0.4, 1]),
				));

				this.innerCircle().size.y(
					//TODO: use this.diameter() instead of this.dragEndAnchor().size.y()
					this.dragEndAnchor().position.y() + this.dragEndAnchor().size.y()
					- this.dragStartAnchor().position.y()
				);

				if (value == 1)
					this.outerCircle().position.y(sohcahtoaHypotenuse);
			}));
	}
}

export interface DragFnArgs {
	fromPosition?: [number, number];
	toPosition: [number, number];
	totalAnimDuration?: number;
}
