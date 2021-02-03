import React, { useState, Fragment } from 'react';

import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  removeElements,
} from 'react-flow-renderer';

const initialElements = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Mind Node' },
    position: { x: 0, y: 0 },
  },
];
const onLoad = (reactFlowInstance) => {
  reactFlowInstance.fitView();
};

const MindNode = () => {
  const [elements, setElements] = useState(initialElements);
  const [name, setName] = useState('');
  const [isNodeSelected, setNodeSelected] = useState(false);
  const [editNodeName, setEditNodeName] = useState('');
  const [editNodeId, setEditNodeId] = useState('');
  const [selectedNode, setSelectedNode] = useState();

  const addNode = () => {
    setElements((e) =>
      e.concat({
        id: (e.length + 1).toString(),
        data: { label: `${name}` },
        position: {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        },
      })
    );
  };

  const updateNode = () => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === editNodeId) {
          el.data = {
            ...el.data,
            label: editNodeName,
          };
        }
        return el;
      })
    );
  };

  const deleteNode = () => {
    onElementsRemove([selectedNode]);
    setNodeSelected(false);
    setEditNodeName('');
    setEditNodeId('');
  };

  const onElementsRemove = (elementsToRemove) => {
    setElements((els) => removeElements(elementsToRemove, els));
  };

  const onConnect = (params) => setElements((e) => addEdge(params, e));

  const onElementClick = (element) => {
    setNodeSelected(true);
    setEditNodeName(element.data.label);
    setEditNodeId(element.id);
    setSelectedNode(element);
  };

  return (
    <Fragment>
      <ReactFlow
        elements={elements}
        onLoad={onLoad}
        style={{ width: '100%', height: '90vh' }}
        onConnect={onConnect}
        connectionLineStyle={{ stroke: '#ddd', strokeWidth: 2 }}
        connectionLineType="bezier"
        snapToGrid={true}
        snapGrid={[16, 16]}
        onElementClick={onElementClick}
        onElementsRemove={onElementsRemove}
      >
        <Background color="#888" gap={16} />
        <MiniMap
          nodeColor={(n) => {
            if (n.type === 'input') return 'blue';

            return '#FFCC00';
          }}
        />
        <Controls />
      </ReactFlow>

      <div>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          name="title"
        />
        <button type="button" onClick={addNode}>
          Add Node
        </button>
      </div>

      {isNodeSelected ? (
        <div>
          <input
            value={editNodeName}
            type="text"
            onChange={(e) => setEditNodeName(e.target.value)}
            name="title"
          />
          <button type="button" onClick={updateNode}>
            Edit Node
          </button>
          <button type="button" onClick={deleteNode}>
            Remove Node
          </button>
        </div>
      ) : null}
    </Fragment>
  );
};

export default MindNode;
