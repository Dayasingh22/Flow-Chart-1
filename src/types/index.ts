import { CSSProperties, MouseEvent as ReactMouseEvent } from 'react';

export type ElementId = string;

export type FlowElement<T = any> = Node<T> | Edge<T>;

export type Elements<T = any> = Array<FlowElement<T>>;

export type Transform = [number, number, number];

export enum Position {
  Left = 'left',
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
}

export interface XYPosition {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface Rect extends Dimensions, XYPosition {}

export interface Box extends XYPosition {
  x2: number;
  y2: number;
}

export type SnapGrid = [number, number];

export interface Node<T = any> {
  id: ElementId;
  position: XYPosition;
  type?: string;
  __rf?: any;
  data?: T;
  style?: CSSProperties;
  className?: string;
  targetPosition?: Position;
  sourcePosition?: Position;
  isHidden?: boolean;
  draggable?: boolean;
  selectable?: boolean;
  connectable?: boolean;
}

export enum ArrowHeadType {
  Arrow = 'arrow',
  ArrowClosed = 'arrowclosed',
}

export interface Edge<T = any> {
  id: ElementId;
  type?: string;
  source: ElementId;
  target: ElementId;
  sourceHandle?: ElementId | null;
  targetHandle?: ElementId | null;
  label?: string;
  labelStyle?: CSSProperties;
  labelShowBg?: boolean;
  labelBgStyle?: CSSProperties;
  labelBgPadding?: [number, number];
  labelBgBorderRadius?: number;
  style?: CSSProperties;
  animated?: boolean;
  arrowHeadType?: ArrowHeadType;
  isHidden?: boolean;
  data?: T;
  className?: string;
}

export enum BackgroundVariant {
  Lines = 'lines',
  Dots = 'dots',
}

export type HandleType = 'source' | 'target';

export type NodeTypesType = { [key: string]: React.ReactNode };

export type EdgeTypesType = NodeTypesType;

export interface SelectionRect extends Rect {
  startX: number;
  startY: number;
  draw: boolean;
}

export interface WrapEdgeProps<T = any> {
  id: ElementId;
  className?: string;
  type: string;
  data?: T;
  onClick?: (event: React.MouseEvent, edge: Edge) => void;
  selected: boolean;
  animated?: boolean;
  label?: string;
  labelStyle?: CSSProperties;
  labelShowBg?: boolean;
  labelBgStyle?: CSSProperties;
  labelBgPadding?: [number, number];
  labelBgBorderRadius?: number;
  style?: CSSProperties;
  arrowHeadType?: ArrowHeadType;
  source: ElementId;
  target: ElementId;
  sourceHandleId: ElementId | null;
  targetHandleId: ElementId | null;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: Position;
  targetPosition: Position;
  elementsSelectable?: boolean;
  markerEndId?: string;
  isHidden?: boolean;
  handleEdgeUpdate: boolean;
  onConnectEdge: OnConnectFunc;
}

export interface EdgeProps<T = any> {
  id: ElementId;
  source: ElementId;
  target: ElementId;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  selected?: boolean;
  animated?: boolean;
  sourcePosition: Position;
  targetPosition: Position;
  label?: string;
  labelStyle?: CSSProperties;
  labelShowBg?: boolean;
  labelBgStyle?: CSSProperties;
  labelBgPadding?: [number, number];
  labelBgBorderRadius?: number;
  style?: CSSProperties;
  arrowHeadType?: ArrowHeadType;
  markerEndId?: string;
  data?: T;
  sourceHandleId?: ElementId | null;
  targetHandleId?: ElementId | null;
}
export interface EdgeSmoothStepProps<T = any> extends EdgeProps<T> {
  borderRadius?: number;
}

export interface EdgeTextProps {
  x: number;
  y: number;
  label?: string;
  labelStyle?: CSSProperties;
  labelShowBg?: boolean;
  labelBgStyle?: CSSProperties;
  labelBgPadding?: [number, number];
  labelBgBorderRadius?: number;
}

export interface NodeProps<T = any> {
  id: ElementId;
  type: string;
  data: T;
  selected: boolean;
  isConnectable: boolean;
  xPos?: number;
  yPos?: number;
  targetPosition?: Position;
  sourcePosition?: Position;
  isDragging?: boolean;
}

export interface NodeComponentProps<T = any> {
  id: ElementId;
  type: string;
  data: T;
  selected?: boolean;
  isConnectable: boolean;
  transform?: Transform;
  xPos?: number;
  yPos?: number;
  targetPosition?: Position;
  sourcePosition?: Position;
  onClick?: (node: Node) => void;
  onMouseEnter?: (node: Node) => void;
  onMouseMove?: (node: Node) => void;
  onMouseLeave?: (node: Node) => void;
  onContextMenu?: (node: Node) => void;
  onNodeDragStart?: (node: Node) => void;
  onNodeDrag?: (node: Node) => void;
  onNodeDragStop?: (node: Node) => void;
  style?: CSSProperties;
  isDragging?: boolean;
}

export interface WrapNodeProps<T = any> {
  id: ElementId;
  type: string;
  data: T;
  selected: boolean;
  scale: number;
  xPos: number;
  yPos: number;
  isSelectable: boolean;
  isDraggable: boolean;
  isConnectable: boolean;
  selectNodesOnDrag: boolean;
  onClick?: (event: ReactMouseEvent, node: Node) => void;
  onMouseEnter?: (event: ReactMouseEvent, node: Node) => void;
  onMouseMove?: (event: ReactMouseEvent, node: Node) => void;
  onMouseLeave?: (event: ReactMouseEvent, node: Node) => void;
  onContextMenu?: (event: ReactMouseEvent, node: Node) => void;
  onNodeDragStart?: (event: ReactMouseEvent, node: Node) => void;
  onNodeDrag?: (event: ReactMouseEvent, node: Node) => void;
  onNodeDragStop?: (event: ReactMouseEvent, node: Node) => void;
  style?: CSSProperties;
  className?: string;
  sourcePosition?: Position;
  targetPosition?: Position;
  isHidden?: boolean;
  isInitialized?: boolean;
  snapToGrid?: boolean;
  snapGrid?: SnapGrid;
  isDragging?: boolean;
  resizeObserver: ResizeObserver | null;
}

export type FitViewParams = {
  padding?: number;
  includeHiddenNodes?: boolean;
};

export type FlowExportObject<T = any> = {
  elements: Elements<T>;
  position: [number, number];
  zoom: number;
};

export type FitViewFunc = (fitViewOptions?: FitViewParams) => void;
export type ProjectFunc = (position: XYPosition) => XYPosition;
export type ToObjectFunc<T = any> = () => FlowExportObject<T>;

export type OnLoadParams<T = any> = {
  zoomIn: () => void;
  zoomOut: () => void;
  zoomTo: (zoomLevel: number) => void;
  fitView: FitViewFunc;
  project: ProjectFunc;
  getElements: () => Elements<T>;
  setTransform: (transform: FlowTransform) => void;
  toObject: ToObjectFunc<T>;
};

export type OnLoadFunc<T = any> = (params: OnLoadParams<T>) => void;

export interface Connection {
  source: ElementId | null;
  target: ElementId | null;
  sourceHandle: ElementId | null;
  targetHandle: ElementId | null;
}

export enum ConnectionMode {
  Strict = 'strict',
  Loose = 'loose',
}

export enum ConnectionLineType {
  Bezier = 'default',
  Straight = 'straight',
  Step = 'step',
  SmoothStep = 'smoothstep',
}

export type ConnectionLineComponentProps = {
  sourceX: number;
  sourceY: number;
  sourcePosition?: Position;
  targetX: number;
  targetY: number;
  targetPosition?: Position;
  connectionLineStyle?: CSSProperties;
  connectionLineType: ConnectionLineType;
};

export type ConnectionLineComponent = React.ComponentType<ConnectionLineComponentProps>;

export type OnConnectFunc = (connection: Connection) => void;
export type OnConnectStartParams = {
  nodeId: ElementId | null;
  handleId: ElementId | null;
  handleType: HandleType | null;
};
export type OnConnectStartFunc = (event: ReactMouseEvent, params: OnConnectStartParams) => void;
export type OnConnectStopFunc = (event: MouseEvent) => void;
export type OnConnectEndFunc = (event: MouseEvent) => void;

export type SetConnectionId = {
  connectionNodeId: ElementId | null;
  connectionHandleId: ElementId | null;
  connectionHandleType: HandleType | null;
};

export interface HandleElement extends XYPosition, Dimensions {
  id?: ElementId | null;
  position: Position;
}

export interface HandleProps {
  type: HandleType;
  position: Position;
  isConnectable?: boolean;
  onConnect?: OnConnectFunc;
  isValidConnection?: (connection: Connection) => boolean;
  id?: ElementId;
}

export type NodePosUpdate = {
  id: ElementId;
  pos: XYPosition;
};

export type NodeDiffUpdate = {
  id?: ElementId;
  diff?: XYPosition;
  isDragging?: boolean;
};

export type FlowTransform = {
  x: number;
  y: number;
  zoom: number;
};

export type TranslateExtent = [[number, number], [number, number]];
export type NodeExtent = TranslateExtent;

export type KeyCode = number | string;

export enum PanOnScrollMode {
  Free = 'free',
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

export interface ZoomPanHelperFunctions {
  zoomIn: () => void;
  zoomOut: () => void;
  zoomTo: (zoomLevel: number) => void;
  transform: (transform: FlowTransform) => void;
  fitView: FitViewFunc;
  setCenter: (x: number, y: number, zoom?: number) => void;
  fitBounds: (bounds: Rect, padding?: number) => void;
  initialized: boolean;
}

export type OnEdgeUpdateFunc<T = any> = (oldEdge: Edge<T>, newConnection: Connection) => void;
