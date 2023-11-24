import { React, useState } from "react";
import { ReactDOM } from "react";

function HighlightComponent({ task }) {
  return (
    <div style={styles.container}>
      <p>{task.title}</p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "50px",
    width: "45%",
    borderRadius: "10px",
    boxShadow: "rgba(6,57,112, 0.42) 0px 2px 6px -2px",
    marginBottom: "20px",
    padding: "10px",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    backgroundColor: "#19323C",
    color: "#F3F7F0",
  },
};

export default HighlightComponent;
