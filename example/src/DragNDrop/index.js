import React, { useState, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  Background,
  MiniMap,
} from 'react-flow-renderer';
import ColorSelectorNode from '../CustomNode/ColorSelectorNode';

import Sidebar from './Sidebar';
const nodeTypes = {
  selectorNode: ColorSelectorNode,
};

import './dnd.css';

const initialElements = [{ id: '1', type: 'input', data: { label: 'input node' }, position: { x: 250, y: 5 } }];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const onConnect = (params) =>
    setElements((els) => addEdge({ ...params, animated: true, style: { stroke: '#000' } }, els));
  const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));

  const onLoad = (_reactFlowInstance) => setReactFlowInstance(_reactFlowInstance);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event) => {
    event.preventDefault();

    const type = event.dataTransfer.getData('application/reactflow');
    const imageUrl = 'https://source.unsplash.com/random';
    const position = reactFlowInstance.project({ x: event.clientX, y: event.clientY - 40 });
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `node`, source: `${imageUrl}` },
      style: { padding: 10 },
    };

    setElements((es) => es.concat(newNode));
  };
  const [nodeName, setNodeName] = useState('');
  const [nodeBg, setNodeBg] = useState('');
  const [nodeImage, setNodeImage] = useState('');
  const [nodeX, setNodeX] = useState('');
  const [nodeY, setNodeY] = useState('');
  const [element, setElement] = useState({});
  const [nodeHidden, setNodeHidden] = useState(false);
  const [hide, SetHide] = useState(false);

  const onElementClick = (event, element) => {
    setElement(element);
    console.log(element);
    setNodeName(element.data.label);
    setNodeX(element.position.x);
    setNodeY(element.position.y);
    setNodeImage(element.data.source);
    console.log(element.type);
    if (element.type === 'selectorNode') {
      SetHide(true);
    } else if (element.type === 'input' || element.type === 'default' || element.type === 'output') {
      SetHide(false);
    }
  };

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === element.id) {
          if (el.type === 'input' || el.type === 'default' || el.type === 'output') {
            el.data = {
              ...el.data,
              label: nodeName,
            };
          } else if (el.type === 'selectorNode') {
            el.data = {
              ...el.data,
              label: nodeName,
            };
          }
        }

        return el;
      })
    );
  }, [nodeName, setElements]);

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === element.id) {
          el.style = { ...el.style, backgroundColor: nodeBg };
        }

        return el;
      })
    );
  }, [nodeBg, setElements]);

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === element.id) {
          el.position = {
            ...el.position,
            x: nodeX,
          };
        }

        return el;
      })
    );
  }, [nodeX, setElements]);

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === element.id) {
          el.position = {
            ...el.position,
            y: nodeY,
          };
        }

        return el;
      })
    );
  }, [nodeY, setElements]);

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === element.id) {
          el.data = {
            ...el.data,
            source: nodeImage,
          };
        }

        return el;
      })
    );
  }, [nodeImage, setElements]);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setNodeImage(e.target.result);
        console.log(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Sidebar />
        <div className="reactflow-wrapper">
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            onElementClick={onElementClick}
            onElementsRemove={onElementsRemove}
            nodeTypes={nodeTypes}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <Background color="#000" gap={12} />
            {nodeHidden ? (
              ''
            ) : (
              <MiniMap
                nodeColor={(n) => {
                  if (n.type === 'input') return 'blue';

                  return '#FFCC00';
                }}
              />
            )}
            <Controls />
          </ReactFlow>
        </div>
        <aside>
          <div className="description">You can drag these nodes to the pane on the right.</div>
          <label>label:</label>
          <input value={nodeName} onChange={(evt) => setNodeName(evt.target.value)} />
          <label style={{ marginTop: '10px' }}>Position X: {Math.trunc(nodeX)}</label> <br />
          <label style={{ marginTop: '10px' }}>Position Y: {Math.trunc(nodeY)}</label> <br />
          <label className="updatenode__bglabel">background:</label>
          <input
            style={{ width: '150px' }}
            type="color"
            value={nodeBg}
            onChange={(evt) => setNodeBg(evt.target.value)}
          />{' '}
          <br />
          {hide ? (
            <div>
              <label className="updatenode__bglabel">Image:</label> <br />
              <input style={{ width: '150px' }} type="file" onChange={onImageChange} /> <br />
              <img src={nodeImage} width="200" height="150" /> <br />
            </div>
          ) : (
            ''
          )}
          <div className="checkboxwrapper">
            <label>Hide MiniMap:</label>
            <input type="checkbox" checked={nodeHidden} onChange={(evt) => setNodeHidden(evt.target.checked)} />
          </div>
        </aside>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
