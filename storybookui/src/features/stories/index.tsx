import React, { useEffect, useState } from "react";
import {
  ReadOutlined,
  CommentOutlined,
  DeleteOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  FloatButton,
  Input,
  Modal,
  Radio,
  Row,
  Tabs,
} from "antd";
import Meta from "antd/es/card/Meta";
import "./index.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addstory, deletestory, fetchstories } from "./storySlice";
import AppConsts from "../../library/appconsts";
import { StoryCreate } from "../../network/models/story";
import { ClockLoader, PacmanLoader } from "react-spinners";

import Slide, { StoryData } from "../../components/Slide";

const Index = () => {
  const dispatch = useAppDispatch();
  const stories = useAppSelector((state) => state.story.list);
  const status = useAppSelector((state) => state.story.status);

  const [story, setStory] = useState<StoryData | undefined>(undefined);
  const [storyOpen, setStoryOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(1);
  const [createLoading, setCreateLoading] = useState(false);

  const [color, setColor] = useState("");
  const [hasPet, setHasPet] = useState(1);
  const [petAge, setPetAge] = useState(1);
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [storyType, setStoryType] = useState("");
  const [language, setLanguage] = useState("");
  const [storySetting, setStorySetting] = useState("");
 
  useEffect(() => {
    dispatch(fetchstories());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      setLoading(false);
    }
  }, [status]);

  const tabItems = [
    {
      key: "1",
      label: "Pet Ownership",
      children: (
        <>
          <p>Do you have a pet?</p>
          <Radio.Group
            onChange={(e) => setHasPet(e.target.value)}
            value={hasPet}
            defaultValue={1}
          >
            <Radio value={1}>Yes</Radio>
            <Radio value={2}>No</Radio>
          </Radio.Group>
        </>
      ),
    },
    {
      key: "2",
      label: "Pet Type",
      children: (
        <>
          <p>
            {hasPet === 1
              ? "What is the breed?"
              : "What kind of pet would you like to have?"}
          </p>
          <Input
            onChange={(e) => setPetType(e.target.value)}
            placeholder="Pet Type"
          />
        </>
      ),
    },
    {
      key: "3",
      label: "Pet Name",
      children: (
        <>
          <p>What is the name of your pet?</p>
          <Input
            onChange={(e) => setPetName(e.target.value)}
            placeholder="Pet Name"
          />
        </>
      ),
    },
    {
      key: "4",
      label: "Pet Age",
      children: (
        <>
          <p>
            {hasPet === 1
              ? "How old is your pet?"
              : "How old would you like your pet to be?"}
          </p>
          <Radio.Group
            onChange={(e) => setPetAge(e.target.value)}
            value={petAge}
            defaultValue={1}
          >
            {[...Array(11)].map((_, i) => (
              <Radio key={i + 1} value={i + 1}>
                {i + 1}
              </Radio>
            ))}
          </Radio.Group>
        </>
      ),
    },
    {
      key: "5",
      label: "Story Setting",
      children: (
        <>
          <p>Where should the story take place? (e.g., space, forest)</p>
          <Input
            onChange={(e) => setStorySetting(e.target.value)}
            placeholder="Story Setting"
          />
        </>
      ),
    },
    {
      key: "6",
      label: "Story Type",
      children: (
        <>
          <p>What type of story would you like? (e.g., adventure, science fiction )</p>
          <Input
            onChange={(e) => setStoryType(e.target.value)}
            placeholder="Story Type"
          />
        </>
      ),
    },
    {
      key: "7",
      label: "Pet Color",
      children: (
        <>
          <p>What is the color of your pet?</p>
          <Input
            onChange={(e) => setColor(e.target.value)}
            placeholder="Color"
          />
        </>
      ),
    },
    {
      key: "8",
      label: "Story Language",
      children: (
        <>
          <p>What language should the story be in?</p>
          <Input
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="Language"
          />
        </>
      ),
    },
  ];

  const handleReadStory = (story: StoryData) => {
    setStory(story);
    setStoryOpen(true);
  };

  const handleDelete = (id: any) => {
    dispatch(deletestory(id));
  };

  const handleTabChangePrevious = () => setTabIndex((prev) => prev - 1);
  const handleTabChangeNext = () => setTabIndex((prev) => prev + 1);
  const handleSave = () => {
    const storyModel: StoryCreate = {
      id: 0,
      petAge,
      petName,
      petType,
      storyType,
      language,
      storySetting,
      color,
    };

    setTabIndex(1);
    setOpen(false);

    setCreateLoading(true);
    dispatch(addstory(storyModel));
  };

  useEffect(() => {
    if (status === "succeeded") {
      setCreateLoading(false);
    } 
  }, [status, createLoading]);

  return (
    <>
      {createLoading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "70vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <ClockLoader size={200} color="#36d7b7" />
          </div>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <div>Creating your story...</div>
            <div>This may take a few minutes.</div>
            <div>Please wait.</div>
          </div>
        </div>
      )}

      {!loading && !createLoading ? (
        <Row gutter={[16, 16]}>
          {stories &&
            stories.map((story, index) => (
              <Col key={index} xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={story.title}
                      src={`${AppConsts.remoteServiceBaseUrlRoute}/images/${story.imageUrl}`}
                    />
                  }
                  actions={[
                    <ReadOutlined
                      key="read"
                      onClick={() => handleReadStory(story)}
                    />,
                    <DeleteOutlined
                      key="delete"
                      onClick={( ) => handleDelete(story.id)}
                    />,
                  ]}
                >
                  <Meta title={story.title} description={story.description} />
                </Card>
              </Col>
            ))}
        </Row>
      ) : (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "70vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PacmanLoader color="#36d7b7" />
        </div>
      )}

      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ right: 94 }}
        icon={<CustomerServiceOutlined />}
      >
        <FloatButton onClick={() => setOpen(true)} icon={<CommentOutlined />} />
      </FloatButton.Group>
      <Modal
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={
          <>
            {tabIndex > 1 && (
              <Button onClick={handleTabChangePrevious}>Previous</Button>
            )}
            {tabIndex < tabItems.length ? (
              <Button onClick={handleTabChangeNext}>Next</Button>
            ) : (
              <Button onClick={handleSave}>Save</Button>
            )}
          </>
        }
      >
        <Tabs defaultActiveKey="1" items={tabItems} activeKey={`${tabIndex}`} />
      </Modal>

      <Slide
        story={story}
        open={storyOpen}
        onClose={() => setStoryOpen(false)}
      />
    </>
  );
};

export default Index;
