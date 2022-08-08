import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { ElementType, RIGHT_PANEL_TYPE, leftType } from "../../types";
import { MidItemsContainer, MidPanelWrapper } from "./style";

type DrawPanelProps = {
  data: Array<ElementType>;
  setData: Function;
  setRightPanelType: Function;
  setRightRanelElementId: Function;
};

type DivComponentDropedProps = {
  item: ElementType;
  setRightPanelType: Function;
  setRightRanelElementId: Function;
};
function TextComponentDroped({
  item,
  setRightPanelType,
  setRightRanelElementId,
}: DivComponentDropedProps) {
  const [, drag] = useDrag(() => ({
    type: leftType.DIV_DROPPED,
    item: { id: item.id },
  }));
  return (
    <div
      onClick={() => {
        console.log(`clicked: item ${item.id}`);
        setRightPanelType(RIGHT_PANEL_TYPE.TEXT);
        setRightRanelElementId(item.id);
      }}
      style={{
        color: item.props.style.color,
        fontSize: item.props.style.size,
        width: item.props.style.width,
        height: item.props.style.height,
        left: item.props.style.left,
        top: item.props.style.top,
        position: "absolute",
        backgroundColor: "#fdeff2",
        overflow: "hidden",
      }}
      ref={drag}
    >
      {item.props.data}
    </div>
  );
}

export default function MidPanel({
  data,
  setRightPanelType,
  setRightRanelElementId,
  setData,
}: DrawPanelProps) {
  const findCurrentElement = (id: string) => {
    return data.find((item: ElementType) => item.id === id);
  };

  const changeElementData = (id: string, key: string, newData: any) => {
    console.log("newData", newData);

    const element = findCurrentElement(id);
    if (element) {
      (element[key as keyof typeof element] as any) = newData;
      setData([...data]);
    }
  };

  const containerRef = React.useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(() => ({
    // accept: [COMPONENT_TYPE.TEXT, COMPONENT_TYPE.TEXT_DROPED], // drop接受的type
    accept: Object.values(leftType),
    drop: (_, monitor) => {
      const { x, y } = monitor.getSourceClientOffset()!; // 相对屏幕左上角的位置
      // 计算相对容器左上角的位置
      var [currentX, currentY] = [x - containerRef.current!.offsetLeft, y];
      if (window.scrollY < 50) {
        currentY = y - (50 - window.scrollY);
      }
      switch (monitor.getItemType()) {
        case leftType.DIV:
          setData([
            ...data,
            {
              id: `text-${Date.now()}`,
              type: "text",
              data: "2win19virus",
              color: "#000000",
              size: "12px",
              width: "10rem",
              height: "2rem",
              left: `${currentX}px`,
              top: `${currentY}px`,
            },
          ]);
          return;
        case leftType.DIV_DROPPED:
          console.log(monitor.getItem());
          changeElementData(
            (monitor.getItem() as { id: string }).id,
            "left",
            `${currentX}px`
          );
          changeElementData(
            (monitor.getItem() as { id: string }).id,
            "top",
            `${currentY}px`
          );
          return;
      }
    },
  }));

  const generateContent = () => {
    const ret = [];
    for (const item of data) {
      switch (item.type) {
        case "text":
          ret.push(
            <TextComponentDroped
              key={item.id}
              item={item}
              setRightPanelType={setRightPanelType}
              setRightRanelElementId={setRightRanelElementId}
            />
          );
          break;
      }
    }
    return ret;
  };

  return (
    <MidPanelWrapper ref={containerRef}>
      <MidItemsContainer ref={drop}>{generateContent()}</MidItemsContainer>
    </MidPanelWrapper>
  );
}
