import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { Drawer, DrawerContent } from "@progress/kendo-react-layout";
import "./DrawerRouterContainer.css";
import logo from "../assets/logo.png";
import styled from "styled-components";

/* Styled components */

const StyledDrawerRouterContainer = styled.div`
  width: 100%;
  background-color: white;
  line-height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-bottom: inset;
  border-bottom-width: 1px;
  padding: 3px 8px;
  color: #D4331F;
`;

const items = [
  { text: "Map", icon: "k-i-marker-pin", selected: true, route: "/" },
  { separator: true },
  { text: "Card", icon: "k-i-list-bulleted", route: "/dashboard" },
];

const DrawerRouterContainer = (props) => {
  const [selectedId, setSelectedId] = useState(
    items.findIndex((x) => x.selected === true)
  );

  const onSelect = (e) => {
    setSelectedId(e.itemIndex);
    props.history.push(e.itemTarget.props.route);
  };

  const setSelectedItem = (pathName) => {
    let currentPath = items.find((item) => item.route === pathName);
    if (currentPath.text) {
      return currentPath.text;
    }
  };

  const drawerProps = {
    position: "start",
    mode: "push",
    mini: true,
  };

  let selected = setSelectedItem(props.location.pathname);
  return (
    <div>
      <StyledDrawerRouterContainer>
        <img height="45" src={logo} alt="logo" />
      </StyledDrawerRouterContainer>
      <Drawer
        expanded={false}
        items={items.map((item) => ({
          ...item,
          selected: item.text === selected,
        }))}
        {...drawerProps}
        onSelect={onSelect}
      >
        <DrawerContent>{props.children}</DrawerContent>
      </Drawer>
    </div>
  );
};

export default withRouter(DrawerRouterContainer);
