import React from "react";
import GridLayout from "react-grid-layout";
import { WidthProvider } from "react-grid-layout";

export default function ReactGridWrapper(props) {
  const ReactGridLayout = WidthProvider(GridLayout);
  const { layout, children, changeSizeApi, onDragHandler } = props;
//   var child = React.Children.only(children[0]);
//     console.log(child,'childchildchildchild');
    
  return (
    <ReactGridLayout
      layout={layout}
      onResize={(layout, old, newItem) => {
        changeSizeApi(newItem);
      }}
      onDragStop={(layout, old, newItem) => {
        onDragHandler(layout);
      }}
    >
      {children}
    </ReactGridLayout>
  );
}
