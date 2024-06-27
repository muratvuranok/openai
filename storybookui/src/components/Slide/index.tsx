import { Button, Modal, Space } from "antd";
import React, { useState, useEffect } from "react";
import { FlippingPages } from "flipping-pages";
import "flipping-pages/dist/style.css";
import "./slide.css";
import AppConsts from "../../library/appconsts";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
interface Scene {
  description: string;
  imageUrl: string;
}

export interface StoryData {
  id: number;
  title: string;
  imageUrl: string;
  scenes: Scene[];
}

interface SlideProps {
  story: StoryData | undefined;
  open: boolean;
  onClose: () => void;
}

const Slide: React.FC<SlideProps> = ({ story, open, onClose }) => {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setSelected(0); // Reset to the first page whenever a new story is opened
  }, [story]);

  if (!story) {
    return null;
  }

  const back = () => {
    setSelected((selected) => Math.max(selected - 1, 0));
  };

  const next = () => {
    setSelected((selected) => Math.min(selected + 1, story.scenes.length - 1));
  };

  return (
    <Modal
      title=""
      centered
      open={open}
      onOk={onClose}
      onCancel={onClose}
      width="60%"
      footer={null}
    >
      <div style={{ height: 500 }}>
        <div className="pages">
          <FlippingPages
            direction="right-to-left"
            onSwipeEnd={setSelected}
            selected={selected}
          >
            {story.scenes.map((scene, index) => (
              <div key={index} className="page container">
                <div className="image-container">
                  <img
                    src={`${AppConsts.remoteServiceBaseUrlRoute}/images/${scene.imageUrl}`}
                    alt={story.title}
                  />
                </div>
                <div className="story-container">
                  <h2>{story.title}</h2>
                  <p>{scene.description}</p>
                </div>
              </div>
            ))}
          </FlippingPages>
        </div>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Space>
            <Button onClick={back} type="primary" icon={<LeftOutlined />}>
              Previus
            </Button>

            <Button onClick={next} icon={<RightOutlined />}>
              Next
            </Button>
          </Space>
        </div>
      </div>
    </Modal>
  );
};

export default Slide;
