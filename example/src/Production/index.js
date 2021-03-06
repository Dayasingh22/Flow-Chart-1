import React, { useEffect, useState, Fragment } from 'react';

import ReactFlow, { addEdge, Background, Controls, MiniMap, removeElements } from 'react-flow-renderer';
import './prod.css';

import ColorSelectorNode from '../CustomNode/ColorSelectorNode';
//import CustomNode from '../CustomNode/CustomNode';

const data = 'Hello';
const imageUrl = 'https://source.unsplash.com/random';

const nodeTypes = {
  selectorNode: ColorSelectorNode,
};

const initialElements = [
  {
    id: '1',
    type: 'selectorNode',
    data: { data: data, source: imageUrl },
    style: { border: '1px solid #fff', padding: 10, background: '#D6D5E6', width: '300px', height: '150px' },
    animated: true,
    position: { x: 20, y: 20 },
  },
];

const onLoad = (reactFlowInstance) => {
  reactFlowInstance.fitView();
};

const Test = () => {
  const localData = localStorage.getItem('elements');
  const localElements = JSON.parse(localData);
  const elem = localElements == null ? initialElements : localElements;
  const [elements, setElements] = useState(elem);
  const [name, setName] = useState('');

  useEffect(() => {
    localStorage.setItem('elements', JSON.stringify(elements));
  }, [elements]);

  const addCircleNode = () => {
    setElements((e) =>
      e.concat({
        id: (e.length + 1).toString(),
        type: 'selectorNode',
        data: { data: `${name}`, source: `${imageUrl}` },
        animated: true,
        position: {
          x: Math.random() * 100,
          y: Math.random() * 100,
        },
        style: {
          background: '#D6D5E6',
          color: '#333',
          wordWrap: 'break-word',
          border: '1px solid #222138',
          width: '130px',
          height: '130px',
          borderRadius: '50%',
          padding: 10,
        },
      })
    );
  };

  const addRectangleNode = () => {
    setElements((e) =>
      e.concat({
        id: (e.length + 1).toString(),
        type: 'selectorNode',
        data: { data: `${name}`, source: `${imageUrl}` },
        animated: true,
        position: {
          x: Math.random() * 100,
          y: Math.random() * 100,
        },
        style: {
          background: '#098058',
          textAlign: 'center',
          color: '#333',
          wordWrap: 'break-word',
          width: '300px',
          height: '150px',
          border: '1px solid #222138',
          padding: 10,
        },
      })
    );
  };

  const addSquareNode = () => {
    setElements((e) =>
      e.concat({
        id: (e.length + 1).toString(),
        type: 'selectorNode',
        data: { data: `${name}`, source: `${imageUrl}` },
        animated: true,
        position: {
          x: Math.random() * 110,
          y: Math.random() * 110,
        },
        style: {
          background: '#07cfc5',
          color: '#333',
          width: '150px',
          height: '150px',
          wordWrap: 'break-word',
          border: '1px solid #222138',
          padding: 10,
        },
      })
    );
  };

  const onConnect = (params) =>
    setElements((e) => addEdge({ ...params, animated: true, style: { stroke: '#000' } }, e));
  const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));
  const [nodeName, setNodeName] = useState('');
  const [nodeBg, setNodeBg] = useState('');
  const [nodeImage, setNodeImage] = useState(imageUrl);
  const [nodeX, setNodeX] = useState('');
  const [nodeY, setNodeY] = useState('');
  const [element, setElement] = useState({});
  const [nodeHidden, setNodeHidden] = useState(false);
  const onElementClick = (event, element) => {
    setElement(element);
    console.log(element);
    setNodeName(element.data.data);
    setNodeX(element.position.x);
    setNodeY(element.position.y);
    setNodeImage(element.data.source);
  };
  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === element.id) {
          el.data = {
            ...el.data,
            data: nodeName,
          };
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
    <Fragment>
      <div className="grid">
        <div className="item">
          <div className="rect">
            <h4>Add a Rectangle Node</h4>
            <input type="text" placeholder="Name of the Node" onChange={(e) => setName(e.target.value)} name="title" />
            <button type="button" onClick={addRectangleNode}>
              Add Node
            </button>
          </div>
          <div className="rect">
            <h4>Add a Square Node</h4>
            <input type="text" placeholder="Name of the Node" onChange={(e) => setName(e.target.value)} name="title" />
            <button type="button" onClick={addSquareNode}>
              Add Node
            </button>
          </div>
          <div className="rect">
            <h4>Add a Circle Node</h4>
            <input type="text" placeholder="Name of the Node" onChange={(e) => setName(e.target.value)} name="title" />
            <button type="button" onClick={addCircleNode}>
              Add Node
            </button>
          </div>
        </div>
        <div className="item large">
          <ReactFlow
            elements={elements}
            onLoad={onLoad}
            onElementClick={onElementClick}
            onElementsRemove={onElementsRemove}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            connectionLineStyle={{ stroke: '#ddd', strokeWidth: 2, animated: true }}
            connectionLineType="bezier"
            snapToGrid={true}
            snapGrid={[16, 16]}
          >
            <Background color="#fff" gap={12} />
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

        <div className="item updatenode__cont item-1">
          <label>label:</label>
          <input value={nodeName} onChange={(evt) => setNodeName(evt.target.value)} />
          <label style={{ marginTop: '10px' }}>Position X: {Math.trunc(nodeX)}</label>
          <label style={{ marginTop: '10px' }}>Position Y: {Math.trunc(nodeY)}</label>
          <label className="updatenode__bglabel">background:</label>
          <input
            style={{ width: '150px' }}
            type="color"
            value={nodeBg}
            onChange={(evt) => setNodeBg(evt.target.value)}
          />
          <label className="updatenode__bglabel">Image:</label>
          <input
            style={{ width: '150px' }}
            type="file"
            // onChange={(evt) => setNodeImage(URL.createObjectURL(evt.target.files[0]))}
            onChange={onImageChange}
          />
          <img src={nodeImage} width="200" height="150" />
          <div className="checkboxwrapper">
            <label>Hide MiniMap:</label>
            <input type="checkbox" checked={nodeHidden} onChange={(evt) => setNodeHidden(evt.target.checked)} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Test;
