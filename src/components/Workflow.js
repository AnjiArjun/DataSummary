import React, { useState } from "react";

const Workflow = ({ workflow_steps }) => {
  const [expandedStep, setExpandedStep] = useState(null);

  const toggleExpand = (index) => {
    setExpandedStep(expandedStep === index ? null : index);
  };

  return (
    <div className="workflow">
      <h2>{ workflow_steps && workflow_steps.length > 0 && 'Workflow Steps'}</h2>
      {workflow_steps && workflow_steps.length > 0 && workflow_steps.map((step, index) => (
        <div key={index} className="workflow-step">
          <div className="step-header" onClick={() => toggleExpand(index)}>
            <span>{expandedStep === index ? "-" : "+"}</span>
            <strong>{step.name_title}</strong>
          </div>
          {expandedStep === index && (
            <div className="step-content">
              <p>
                <strong>ID:</strong> {step.id}
              </p>
              <p>
                <strong>Status:</strong> {step.status}
              </p>
              {step.note && (
                <p>
                  <strong>Note:</strong> {step.note}
                </p>
              )}

              {step.name === "select_dataset" && (
                <p>name: {step.params_extra.name}</p>
              )}

              {step.name === "new" && (
                <div>
                  <p>
                    <strong>Pipeline:</strong> {step.params_extra.pipeline}
                  </p>
                  <p>
                    <strong>Expression:</strong> {step.params_extra.expression}
                  </p>
                  <p>
                    <strong>Column Name:</strong>{" "}
                    {step.params_extra.column_name}
                  </p>
                </div>
              )}

              {step.name === "aggregate" && (
                <div>
                  <p>
                    <strong>Fork:</strong>{" "}
                    {step.params_extra.fork ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Aggregation Type:</strong>{" "}
                    {step.params_extra.agg_type.join(", ")}
                  </p>
                  <p>
                    <strong>Dimension Columns:</strong>{" "}
                    {step.params_extra.dim_cols.join(", ")}
                  </p>
                  <p>
                    <strong>Measure Columns:</strong>{" "}
                    {step.params_extra.meas_col
                      .map((col) => col.join(", "))
                      .join(" | ")}
                  </p>
                  <p>
                    <strong>Fork Name:</strong> {step.params_extra.fork_name}
                  </p>
                </div>
              )}

              {step.name === "clean" && (
                <div>
                  <p>
                    <strong>Columns:</strong>{" "}
                    {step.params_extra.columns.join(", ")}
                  </p>
                  <p>
                    <strong>Pipeline:</strong> {step.params_extra.pipeline}
                  </p>
                  <p>
                    <strong>Clean Type:</strong> {step.params_extra.clean_type}
                  </p>
                </div>
              )}

              {step.name === "de_dupe" && (
                <div>
                  <p>
                    <strong>Columns:</strong>{" "}
                    {step.params_extra.columns.join(", ")}
                  </p>
                  <p>
                    <strong>Pipeline:</strong> {step.params_extra.pipeline}
                  </p>
                </div>
              )}

              {step.name === "join" && (
                <div>
                  <p>
                    <strong>Type:</strong> {step.params_extra.type}
                  </p>
                  <p>
                    <strong>Left Columns:</strong>{" "}
                    {step.params_extra.left_columns.join(", ")}
                  </p>
                  <p>
                    <strong>Right Columns:</strong>{" "}
                    {step.params_extra.right_columns.join(", ")}
                  </p>
                  <p>
                    <strong>Dataset 2 Name:</strong>{" "}
                    {step.params_extra.dataset2_name}
                  </p>
                  <p>
                    <strong>Extras:</strong>{" "}
                    {JSON.stringify(step.params_extra.extras, null, 2)}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Workflow;
