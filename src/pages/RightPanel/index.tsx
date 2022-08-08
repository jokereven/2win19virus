import { ElementType, RIGHT_PANEL_TYPE } from "../../types";
import "./style.css";

type RightPanelProps = {
  type: RIGHT_PANEL_TYPE;
  data: Array<ElementType>;
  elementId: string;
  setDrawPanelData: Function;
};

export default function RightPanel({
  type,
  data,
  elementId,
  setDrawPanelData,
}: RightPanelProps) {
  const findCurrentElement = (id: string) => {
    return data.find((item: ElementType) => item.id === id);
  };

  const changeElementData = (id: string, key: string, newData: any) => {
    const element = findCurrentElement(id);
    if (element) {
      (element[key as keyof typeof element] as any) = newData;
      setDrawPanelData([...data]);
    }
  };

  const generateRightPanel = () => {
    if (type === RIGHT_PANEL_TYPE.NONE) {
      return <div>Edit</div>;
    }
    switch (type) {
      case RIGHT_PANEL_TYPE.TEXT:
        const elementData = findCurrentElement(elementId);
        if (!elementData) {
          return <div>Edit</div>;
        }
        const inputDomObject: Array<HTMLInputElement> = [];

        return (
          <div key={elementId}>
            <div>text</div>
            <br />
            <div className="flex-row-space-between text-config-item">
              <div>value:</div>
              <input
                defaultValue={elementData.data}
                ref={(element) => {
                  inputDomObject[0] = element!;
                }}
                type="text"
              ></input>
            </div>
            <div className="flex-row-space-between text-config-item">
              <div>color:</div>
              <input
                defaultValue={elementData.props.style.color}
                ref={(element) => {
                  inputDomObject[1] = element!;
                }}
                type="text"
              ></input>
            </div>
            <div className="flex-row-space-between text-config-item">
              <div>size:</div>
              <input
                defaultValue={elementData.props.style.size}
                ref={(element) => {
                  inputDomObject[2] = element!;
                }}
                type="text"
              ></input>
            </div>
            <div className="flex-row-space-between text-config-item">
              <div>width:</div>
              <input
                defaultValue={elementData.props.style.width}
                ref={(element) => {
                  inputDomObject[3] = element!;
                }}
                type="text"
              ></input>
            </div>
            <div className="flex-row-space-between text-config-item">
              <div>height:</div>
              <input
                defaultValue={elementData.props.style.height}
                ref={(element) => {
                  inputDomObject[4] = element!;
                }}
                type="text"
              ></input>
            </div>
            <div className="flex-row-space-between text-config-item">
              <div>top:</div>
              <input
                defaultValue={elementData.props.style.top}
                ref={(element) => {
                  inputDomObject[5] = element!;
                }}
                type="text"
              ></input>
            </div>
            <div className="flex-row-space-between text-config-item">
              <div>left:</div>
              <input
                defaultValue={elementData.props.style.left}
                ref={(element) => {
                  inputDomObject[6] = element!;
                }}
                type="text"
              ></input>
            </div>
            <br />
            <button
              onClick={() => {
                changeElementData(elementId, "data", inputDomObject[0].value);
                changeElementData(elementId, "color", inputDomObject[1].value);
                changeElementData(elementId, "size", inputDomObject[2].value);
                changeElementData(elementId, "width", inputDomObject[3].value);
                changeElementData(elementId, "height", inputDomObject[4].value);
                changeElementData(elementId, "top", inputDomObject[5].value);
                changeElementData(elementId, "left", inputDomObject[6].value);
              }}
            >
              确定
            </button>
          </div>
        );
    }
  };

  return (
    <div className="rightPanel">
      <div className="rightFormContainer">{generateRightPanel()}</div>
    </div>
  );
}
